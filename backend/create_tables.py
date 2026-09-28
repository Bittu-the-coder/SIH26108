import asyncio
import sys
import os

sys.path.insert(0, os.path.abspath(os.path.dirname(__file__)))
from app.database import engine
from sqlmodel import SQLModel
# Import models so they are registered with SQLModel.metadata
from app.models.standard import Standard
from app.models.edge import StandardEdge

async def create_tables():
    print("Creating database tables...")
    async with engine.begin() as conn:
        await conn.run_sync(SQLModel.metadata.create_all)
    print("Tables created successfully!")

if __name__ == "__main__":
    asyncio.run(create_tables())
