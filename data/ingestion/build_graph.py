import asyncio
import json
import sys
import os
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select

sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__), '../../backend')))
from app.database import engine
from app.models.standard import Standard
from app.models.edge import StandardEdge, EdgeType

async def build_graph(json_file: str):
    with open(json_file, 'r', encoding='utf-8') as f:
        data = json.load(f)
        
    async with AsyncSession(engine) as session:
        for item in data:
            source_num = item['is_number']
            
            src_res = await session.execute(select(Standard).where(Standard.is_number == source_num))
            src_std = src_res.scalars().first()
            
            if not src_std:
                continue
                
            refs = item.get('cross_references', [])
            for ref in refs:
                target_num = ref.get('is_number')
                
                tgt_res = await session.execute(select(Standard).where(Standard.is_number == target_num))
                tgt_std = tgt_res.scalars().first()
                
                if tgt_std:
                    edge = StandardEdge(
                        source_id=src_std.id,
                        target_id=tgt_std.id,
                        edge_type=EdgeType(ref.get('type', 'normative_ref'))
                    )
                    session.add(edge)
                    
        await session.commit()
        print("Graph edges built.")

if __name__ == "__main__":
    if len(sys.argv) > 1:
        asyncio.run(build_graph(sys.argv[1]))
    else:
        print("Usage: python build_graph.py <path_to_scraped_json>")
