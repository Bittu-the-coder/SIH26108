from sqlmodel.ext.asyncio.session import AsyncSession
from sqlalchemy import text
from typing import List, Optional, Dict, Any

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
    LIMIT :top_k;
    """
    
    result = await session.execute(
        text(sql_query),
        {"query_embedding": str(query_embedding), "query_text": query_text, "top_k": top_k}
    )
    
    rows = result.mappings().all()
    return [dict(row) for row in rows]
