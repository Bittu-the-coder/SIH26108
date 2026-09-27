from fastapi import APIRouter, Depends
from sqlmodel.ext.asyncio.session import AsyncSession
from app.database import get_session
from typing import Any, Dict

router = APIRouter()

@router.get("")
async def get_categories(session: AsyncSession = Depends(get_session)) -> Dict[str, Any]:
    # Stub
    return {"categories": []}
