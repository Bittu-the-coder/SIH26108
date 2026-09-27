from fastapi import APIRouter, Depends
from sqlmodel.ext.asyncio.session import AsyncSession
from app.database import get_session
from typing import Any, Dict

router = APIRouter()

@router.post("/run")
async def run_evaluation(session: AsyncSession = Depends(get_session)) -> Dict[str, Any]:
    # Stub
    pass
