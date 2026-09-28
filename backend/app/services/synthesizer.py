import litellm
import json
import os
import httpx
from app.config import settings
from typing import List, Dict, Any, Tuple
import logging

logger = logging.getLogger(__name__)

async def get_active_groq_models(groq_key: str) -> List[str]:
    # 1. Custom specified model in environment
    custom_model = getattr(settings, "GROQ_MODEL", None) or os.environ.get("GROQ_MODEL")
    if custom_model:
        prefix = "" if custom_model.startswith("groq/") else "groq/"
        return [f"{prefix}{custom_model}"]
    
    # 2. Dynamic discovery from Groq API (always fetches currently active models on account)
    try:
        async with httpx.AsyncClient(timeout=4.0) as client:
            resp = await client.get(
                "https://api.groq.com/openai/v1/models",
                headers={"Authorization": f"Bearer {groq_key}"}
            )
            if resp.status_code == 200:
                data = resp.json()
                models = [
                    f"groq/{m['id']}" for m in data.get("data", [])
                    if m.get("active", True) and not any(k in m["id"] for k in ["whisper", "guard", "audio", "embed"])
                ]
                if models:
                    logger.info(f"Discovered active Groq models: {models[:4]}")
                    return models
    except Exception as e:
        logger.warning(f"Could not auto-fetch active models from Groq API: {e}")

    # 3. Known active open-weight models
    return [
        "groq/openai/gpt-oss-120b",
        "groq/openai/gpt-oss-20b",
        "groq/meta-llama/llama-4-scout-17b-16e-instruct",
        "groq/qwen/qwen3-32b",
    ]

async def synthesize(
    query: str, 
    candidates: List[Dict[str, Any]], 
    related_map: Dict[str, List[Dict[str, Any]]]
) -> Tuple[List[Dict[str, Any]], str]:
    # Construct context strictly bounded to retrieved candidates
    context = "Available Standards Context:\n"
    for cand in candidates:
        context += f"- ID: {cand['id']}, IS Number: {cand['is_number']}, Title: {cand['title']}, Scope: {cand.get('scope', '')}\n"
        is_num = cand['is_number']
        if is_num in related_map and related_map[is_num]:
            context += "  Allied Standards:\n"
            for allied in related_map[is_num]:
                context += f"    - {allied['is_number']}: {allied['title']} ({allied['edge_type']})\n"
    
    prompt = f"""
You are an expert procurement assistant for Indian Standards (BIS).
Based ONLY on the provided context below, recommend the most relevant standards for the user's query.
If no standards in the context are a reasonable match, indicate that no confident match was found.

User Query: "{query}"

{context}

Respond in JSON format with a list of recommendations matching this schema:
{{
  "recommendations": [
    {{
      "is_number": "string",
      "title": "string",
      "status": "string",
      "confidence": 0.0 to 1.0,
      "match_reason": "string",
      "certification": {{"scheme": "string", "mandatory": true, "details": "string"}},
      "supersession": "string or null",
      "allied_standards": [
         {{"is_number": "string", "title": "string", "relationship": "string", "reason": "string"}}
      ]
    }}
  ]
}}
"""
    # 1. Primary: Try Gemini 3.8 Flash
    gemini_key = settings.GEMINI_API_KEY or os.environ.get("GEMINI_API_KEY")
    if gemini_key:
        try:
            response = await litellm.acompletion(
                api_key=gemini_key,
                model="gemini/gemini-3.8-flash",
                messages=[{"role": "user", "content": prompt}],
                response_format={"type": "json_object"}
            )
            content = response.choices[0].message.content
            recs = json.loads(content).get("recommendations", [])
            if recs:
                return recs, "gemini-3.8-flash"
        except Exception as e:
            logger.warning(f"Gemini synthesis with gemini/gemini-3.8-flash failed ({e}). Falling back to Groq...")

    # 2. Fallback: Dynamic Groq models
    groq_key = settings.GROQ_API_KEY or os.environ.get("GROQ_API_KEY")
    if groq_key:
        groq_models = await get_active_groq_models(groq_key)
        for g_model in groq_models:
            try:
                response = await litellm.acompletion(
                    api_key=groq_key,
                    model=g_model,
                    messages=[{"role": "user", "content": prompt}],
                    response_format={"type": "json_object"}
                )
                content = response.choices[0].message.content
                recs = json.loads(content).get("recommendations", [])
                if recs:
                    return recs, g_model.replace("groq/", "")
            except Exception as e:
                logger.warning(f"Groq synthesis with {g_model} failed: {e}")

    logger.error("All LLM synthesis model attempts failed (or no API keys provided).")
    return [], "fallback-retrieval"
