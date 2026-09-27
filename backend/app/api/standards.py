from fastapi import APIRouter, Depends, Query
from sqlmodel.ext.asyncio.session import AsyncSession
from typing import Optional
from app.database import get_session
from app.schemas.common import PaginatedResponse
from app.schemas.standard import StandardBase, StandardDetail

router = APIRouter()

@router.get("", response_model=PaginatedResponse[StandardBase])
async def search_standards(
    q: Optional[str] = None,
    category: Optional[str] = None,
    status: Optional[str] = None,
    certification: Optional[str] = None,
    page: int = Query(1, ge=1),
    per_page: int = Query(20, ge=1, le=100),
    session: AsyncSession = Depends(get_session)
):
    # Stub
    pass

@router.get("/{is_number}", response_model=StandardDetail)
async def get_standard(
    is_number: str,
    session: AsyncSession = Depends(get_session)
):
    # Stub
    pass
