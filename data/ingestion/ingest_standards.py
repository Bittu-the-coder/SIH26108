import asyncio
import json
import uuid
import sys
import os
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select

# Ensure backend app is in path
sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__), '../../backend')))
from app.database import engine
from app.models.standard import Standard, StandardStatus, CertScheme
from app.services.embedder import embed_batch

async def ingest(json_file: str):
    with open(json_file, 'r', encoding='utf-8') as f:
        data = json.load(f)
        
    async with AsyncSession(engine) as session:
        for idx, item in enumerate(data):
            text_to_embed = f"{item['title']} {item.get('scope', '')} {item.get('classification', '')}"
            
            stmt = select(Standard).where(Standard.is_number == item['is_number'])
            result = await session.execute(stmt)
            existing = result.scalars().first()
            
            if not existing:
                vector = (await embed_batch([text_to_embed]))[0]
                std = Standard(
                    is_number=item['is_number'],
                    is_number_base=item['is_number'].split(":")[0],
                    title=item['title'],
                    scope=item.get('scope'),
                    classification=item.get('classification', 'Unknown'),
                    status=StandardStatus(item.get('status', 'current')),
                    embedding=vector,
                    raw_metadata=item
                )
                session.add(std)
                
        await session.commit()
        print(f"Ingested {len(data)} standards.")

if __name__ == "__main__":
    if len(sys.argv) > 1:
        asyncio.run(ingest(sys.argv[1]))
    else:
        print("Usage: python ingest_standards.py <path_to_scraped_json>")
