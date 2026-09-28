import asyncio
import json
import uuid
import sys
import os
from datetime import datetime, timezone
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select

# Ensure backend app is in path
sys.path.insert(0, os.path.abspath(os.path.dirname(__file__)))
from app.database import engine
from app.models.standard import Standard, StandardStatus, CertScheme
from app.services.embedder import embed_batch

async def ingest(json_file: str):
    with open(json_file, 'r', encoding='utf-8') as f:
        data = json.load(f)
        
    print(f"Loaded {len(data)} items from {json_file}")
    
    async with AsyncSession(engine) as session:
        # Check existing standards to make ingestion idempotent
        stmt = select(Standard.is_number)
        result = await session.execute(stmt)
        existing_numbers = set(result.scalars().all())
        print(f"Found {len(existing_numbers)} existing standards in database.")
        
        items_to_insert = [item for item in data if item['is_number'] not in existing_numbers]
        print(f"Standards to insert: {len(items_to_insert)}")
        
        if not items_to_insert:
            print("All standards are already ingested!")
            return

        batch_size = 20
        total_inserted = 0

        for i in range(0, len(items_to_insert), batch_size):
            chunk = items_to_insert[i:i + batch_size]
            texts = [
                f"{item['title']} {item.get('scope', '') or ''} {item.get('classification', '') or ''}"
                for item in chunk
            ]
            
            # Embed batch with TEI (or fallback zero vector)
            vectors = await embed_batch(texts)
            now = datetime.now(timezone.utc)
            
            for item, vector in zip(chunk, vectors):
                # Map status safely
                raw_status = item.get('status', 'current')
                try:
                    status_enum = StandardStatus(raw_status)
                except ValueError:
                    status_enum = StandardStatus.current

                # Map certification safely
                raw_cert = item.get('certification', 'none')
                try:
                    cert_enum = CertScheme(raw_cert)
                except ValueError:
                    cert_enum = CertScheme.none

                std = Standard(
                    is_number=item['is_number'],
                    is_number_base=item.get('is_number_base', item['is_number'].split(":")[0]),
                    title=item['title'],
                    title_hi=item.get('title_hi'),
                    scope=item.get('scope'),
                    classification=item.get('classification', 'General'),
                    sub_group=item.get('sub_group'),
                    status=status_enum,
                    year_published=item.get('year_published'),
                    latest_amendment=item.get('latest_amendment'),
                    certification=cert_enum,
                    qco_details=item.get('qco_details'),
                    source_url=item.get('source_url'),
                    embedding=vector,
                    raw_metadata=item,
                    created_at=now,
                    updated_at=now
                )
                session.add(std)
                
            await session.commit()
            total_inserted += len(chunk)
            print(f"Progress: {total_inserted}/{len(items_to_insert)} standards ingested.")

        print(f"Successfully finished ingesting {total_inserted} standards.")

if __name__ == "__main__":
    if len(sys.argv) > 1:
        asyncio.run(ingest(sys.argv[1]))
    else:
        print("Usage: python ingest_standards.py <path_to_scraped_json>")
