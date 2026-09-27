import litellm
import json
from app.config import settings
from typing import List, Dict, Any
import logging

logger = logging.getLogger(__name__)

async def synthesize(query: str, candidates: List[Dict[str, Any]], related_map: Dict[str, List[Dict[str, Any]]]) -> List[Dict[str, Any]]:
    # Construct context strictly bounded to retrieved candidates
    context = "Available Standards Context:\n"
    for cand in candidates:
        context += f"- ID: {cand['id']}, IS Number: {cand['is_number']}, Title: {cand['title']}, Scope: {cand['scope']}\n"
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
    try:
        response = await litellm.acompletion(
            api_key=settings.GEMINI_API_KEY,
            model="gemini/gemini-2.0-flash",
            messages=[{"role": "user", "content": prompt}],
            response_format={"type": "json_object"}
        )
        content = response.choices[0].message.content
        return json.loads(content).get("recommendations", [])
    except Exception as e:
        logger.error(f"LLM synthesis failed: {e}")
        return []
