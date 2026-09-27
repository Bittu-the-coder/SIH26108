from sqlmodel.ext.asyncio.session import AsyncSession
from sqlalchemy import text
from typing import List, Dict, Any
import uuid

async def get_related(standard_id: uuid.UUID, session: AsyncSession, max_depth: int = 3) -> List[Dict[str, Any]]:
    sql_query = """
    WITH RECURSIVE related AS (
      SELECT
        e.target_id AS standard_id,
        e.edge_type,
        1 AS depth
      FROM standard_edges e
      WHERE e.source_id = :standard_id

      UNION

      SELECT
        e.target_id,
        e.edge_type,
        r.depth + 1
      FROM standard_edges e
      JOIN related r ON e.source_id = r.standard_id
      WHERE r.depth < :max_depth
    )
    SELECT DISTINCT s.id, s.is_number, s.title, r.edge_type, r.depth
    FROM related r
    JOIN standards s ON s.id = r.standard_id
    ORDER BY r.depth, s.is_number;
    """
    
    result = await session.execute(
        text(sql_query),
        {"standard_id": standard_id, "max_depth": max_depth}
    )
    
    rows = result.mappings().all()
    return [dict(row) for row in rows]
