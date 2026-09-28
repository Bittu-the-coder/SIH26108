from fastapi import APIRouter, Depends, Request, BackgroundTasks
from sqlmodel.ext.asyncio.session import AsyncSession
from app.database import get_session, engine
from app.schemas.recommend import RecommendRequest, RecommendResponse, Recommendation, MetadataInfo
from app.models.query_log import QueryLog
from app.services.cache import get_cached, set_cached, generate_key
from app.services.embedder import embed
from app.utils.language import detect_language
from app.services.translator import translate_to_english
from app.services.retriever import retrieve
from app.services.graph import get_related
from app.services.synthesizer import synthesize
import time
import uuid

router = APIRouter()

async def log_query_task(
    query_id: uuid.UUID,
    query_text: str,
    detected_lang: str,
    translated_text: str,
    category_hint: str,
    retrieved_ids: list,
    retrieval_scores: list,
    llm_response: dict,
    total_latency_ms: int,
):
    async with AsyncSession(engine) as session:
        log = QueryLog(
            id=query_id,
            query_text=query_text,
            detected_lang=detected_lang,
            translated_text=translated_text,
            category_hint=category_hint,
            retrieved_ids=retrieved_ids,
            retrieval_scores=retrieval_scores,
            llm_response=llm_response,
            llm_model="gemini-2.0-flash",
            total_latency_ms=total_latency_ms,
        )
        session.add(log)
        await session.commit()

@router.post("", response_model=RecommendResponse)
async def recommend_standards(
    request: RecommendRequest,
    req: Request,
    background_tasks: BackgroundTasks,
    session: AsyncSession = Depends(get_session)
):
    start_time = time.time()
    query_id = uuid.uuid4()
    
    # 1. Cache Check
    cache_key = generate_key("recommend", request.query, request.category)
    cached_response = await get_cached(cache_key)
    if cached_response:
        cached_response['query_id'] = str(query_id)
        return cached_response
        
    # 2. Language Detection & Translation
    lang = request.language or detect_language(request.query)
    search_query = request.query
    translated_text = None
    if lang == 'hi':
        search_query = await translate_to_english(request.query)
        translated_text = search_query
        
    # 3. Embed Query
    query_vector = await embed(search_query)
    
    # 4. Hybrid Retrieval
    candidates = await retrieve(search_query, query_vector, session, request.category, request.top_k)
    
    # 5. Graph Traversal
    related_map = {}
    if request.include_allied:
        for cand in candidates:
            cand_id = cand['id']
            related = await get_related(cand_id, session)
            related_map[cand['is_number']] = related
            
    # 6. LLM Synthesis
    recommendations_data = await synthesize(search_query, candidates, related_map)
    
    # 7. Formulate Response
    recommendations = []
    for r in recommendations_data:
        try:
            if isinstance(r.get("certification"), str):
                r["certification"] = {"scheme": r["certification"], "mandatory": False, "details": None}
            recommendations.append(Recommendation(**r))
        except Exception:
            pass
            
    # Fallback to retrieved candidates if LLM synthesis returned empty (e.g. no GEMINI_API_KEY)
    if not recommendations and candidates:
        for cand in candidates[:request.top_k]:
            score = cand.get("rrf_score")
            conf = round(min(score * 50.0, 0.95), 2) if score else 0.85
            recommendations.append(
                Recommendation(
                    is_number=cand["is_number"],
                    title=cand["title"],
                    status=cand.get("status", "current"),
                    confidence=conf,
                    match_reason=cand.get("scope") or "Relevant Indian Standard identified via hybrid search.",
                    source_url=cand.get("source_url"),
                    certification=None,
                    supersession=None,
                    allied_standards=[]
                )
            )
        
    latency_ms = int((time.time() - start_time) * 1000)
    
    response = RecommendResponse(
        query_id=query_id,
        detected_language=lang,
        recommendations=recommendations,
        warnings=[],
        metadata=MetadataInfo(
            retrieval_method="hybrid_bm25_vector",
            llm_model="gemini-2.0-flash",
            total_latency_ms=latency_ms
        )
    )
    
    response_dump = response.model_dump(mode="json")
    
    # Cache
    await set_cached(cache_key, response_dump, ttl_seconds=3600)
    
    retrieved_ids = [c['id'] for c in candidates]
    retrieval_scores = [c.get('rrf_score', 0.0) for c in candidates]
    
    background_tasks.add_task(
        log_query_task,
        query_id=query_id,
        query_text=request.query,
        detected_lang=lang,
        translated_text=translated_text,
        category_hint=request.category,
        retrieved_ids=retrieved_ids,
        retrieval_scores=retrieval_scores,
        llm_response={"recommendations": recommendations_data, "warnings": []},
        total_latency_ms=latency_ms
    )
    
    return response
