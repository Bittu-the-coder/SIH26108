from sqlmodel.ext.asyncio.session import AsyncSession
from sqlalchemy import text
from typing import List, Optional, Dict, Any
import httpx
from app.config import settings

async def retrieve(
    query_text: str, 
    query_embedding: List[float],
    session: AsyncSession,
    category: Optional[str] = None, 
    top_k: int = 5
) -> List[Dict[str, Any]]:
    # RRF fusion
    sql_query = """
    WITH vector_results AS (
      SELECT id, is_number, title, scope, status,
             1 - (embedding <=> :query_embedding::vector) AS vec_score,
             ROW_NUMBER() OVER (ORDER BY embedding <=> :query_embedding::vector) AS vec_rank
      FROM standards
      WHERE status = 'current'
      ORDER BY embedding <=> :query_embedding::vector
      LIMIT 20
    ),
    bm25_results AS (
      SELECT id, is_number, title, scope, status,
             ts_rank_cd(tsv, plainto_tsquery('english', :query_text)) AS bm25_score,
             ROW_NUMBER() OVER (ORDER BY ts_rank_cd(tsv, plainto_tsquery('english', :query_text)) DESC) AS bm25_rank
      FROM standards
      WHERE tsv @@ plainto_tsquery('english', :query_text)
        AND status = 'current'
      ORDER BY bm25_score DESC
      LIMIT 20
    ),
    fused AS (
      SELECT
        COALESCE(v.id, b.id) AS id,
        COALESCE(v.is_number, b.is_number) AS is_number,
        COALESCE(v.title, b.title) AS title,
        COALESCE(v.scope, b.scope) AS scope,
        COALESCE(v.status, b.status) AS status,
        COALESCE(0.6 / (60 + v.vec_rank), 0) +
        COALESCE(0.4 / (60 + b.bm25_rank), 0) AS rrf_score
      FROM vector_results v
      FULL OUTER JOIN bm25_results b ON v.id = b.id
    )
    SELECT id, is_number, title, scope, status, rrf_score
    FROM fused
    ORDER BY rrf_score DESC
    LIMIT 20;
    """
    
    result = await session.execute(
        text(sql_query),
        {"query_embedding": str(query_embedding), "query_text": query_text, "top_k": top_k}
    )
    
    
    rows = result.mappings().all()
    candidates = [dict(row) for row in rows]
    
    if not candidates:
        return []

    # 4. Rerank the top 20 candidates
    # Combine title and scope to give the reranker maximum context
    texts_to_rerank = [f"{c['title']} - {c['scope']}" for c in candidates]
    
    try:
        async with httpx.AsyncClient() as client:
            resp = await client.post(
                settings.BGE_RERANKER_URL,
                json={"query": query_text, "texts": texts_to_rerank},
                timeout=10.0
            )
            
            if resp.status_code == 200:
                rerank_results = resp.json()
                # TEI returns [{"index": i, "score": s}, ...] already sorted by score DESC
                reranked_candidates = []
                for res in rerank_results:
                    idx = res["index"]
                    candidate = candidates[idx].copy()
                    candidate["rerank_score"] = res["score"]
                    reranked_candidates.append(candidate)
                
                return reranked_candidates[:top_k]
            else:
                print(f"Reranker API failed with status {resp.status_code}")
    except Exception as e:
        print(f"Reranker API error: {e}")
        
    # 5. Fallback: If reranker container is down, return the RRF hybrid results
    return candidates[:top_k]
