from fastapi import APIRouter, Depends, Request
from sqlmodel.ext.asyncio.session import AsyncSession
from app.database import get_session
from app.schemas.recommend import RecommendRequest, RecommendResponse, Recommendation, MetadataInfo
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

@router.post("", response_model=RecommendResponse)
async def recommend_standards(
    request: RecommendRequest,
    req: Request,
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
    if lang == 'hi':
        search_query = await translate_to_english(request.query)
        
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
        recommendations.append(Recommendation(**r))
        
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
    
    # Cache
    await set_cached(cache_key, response.model_dump(mode="json"), ttl_seconds=3600)
    
    return response
