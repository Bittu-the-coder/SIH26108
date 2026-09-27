from fastapi import APIRouter, Depends, Query, HTTPException, status
from sqlmodel.ext.asyncio.session import AsyncSession
from sqlmodel import select, func, text
from typing import Optional
from app.database import get_session
from app.schemas.common import PaginatedResponse
from app.schemas.standard import StandardBase, StandardDetail
from app.models.standard import Standard, StandardStatus, CertScheme
from app.models.category import Category, StandardCategory
from app.models.edge import StandardEdge, EdgeType

router = APIRouter()

@router.get("", response_model=PaginatedResponse[StandardBase])
async def search_standards(
    q: Optional[str] = None,
    category: Optional[str] = None,
    status_: Optional[str] = Query(None, alias="status"),
    certification: Optional[str] = None,
    page: int = Query(1, ge=1),
    per_page: int = Query(20, ge=1, le=100),
    session: AsyncSession = Depends(get_session)
):
    query = select(Standard)
    
    if q:
        query = query.where(text("tsv @@ plainto_tsquery('english', :q)")).params(q=q)
    if status_:
        query = query.where(Standard.status == status_)
    if certification:
        query = query.where(Standard.certification == certification)
    if category:
        query = query.join(StandardCategory).join(Category).where(Category.name == category)
        
    count_query = select(func.count()).select_from(query.subquery())
    total_result = await session.execute(count_query)
    total = total_result.scalar_one()
    
    if q:
        query = query.order_by(text("ts_rank_cd(tsv, plainto_tsquery('english', :q)) DESC")).params(q=q)
    else:
        query = query.order_by(Standard.is_number)
        
    query = query.offset((page - 1) * per_page).limit(per_page)
    result = await session.execute(query)
    standards = result.scalars().all()
    
    results = []
    for s in standards:
        s_dump = s.model_dump()
        s_dump["status"] = s.status.value if isinstance(s.status, StandardStatus) else s.status
        results.append(StandardBase(**s_dump))
        
    return PaginatedResponse(
        total=total,
        page=page,
        per_page=per_page,
        results=results
    )

@router.get("/{is_number}", response_model=StandardDetail)
async def get_standard(
    is_number: str,
    session: AsyncSession = Depends(get_session)
):
    result = await session.execute(
        select(Standard)
        .where(Standard.is_number == is_number)
    )
    standard = result.scalars().first()
    if not standard:
        raise HTTPException(status_code=404, detail="Standard not found")
        
    cat_result = await session.execute(
        select(Category.name)
        .join(StandardCategory, StandardCategory.category_id == Category.id)
        .where(StandardCategory.standard_id == standard.id)
    )
    categories = cat_result.scalars().all()
    
    edges_result = await session.execute(
        select(StandardEdge, Standard.is_number)
        .join(Standard, StandardEdge.target_id == Standard.id)
        .where(StandardEdge.source_id == standard.id)
    )
    edges_out = edges_result.all()
    
    rev_edges_result = await session.execute(
        select(StandardEdge, Standard.is_number)
        .join(Standard, StandardEdge.source_id == Standard.id)
        .where(StandardEdge.target_id == standard.id)
    )
    edges_in = rev_edges_result.all()
    
    cross_references = {
        "supersedes": [target_num for e, target_num in edges_out if e.edge_type == EdgeType.supersedes],
        "superseded_by": [source_num for e, source_num in edges_in if e.edge_type == EdgeType.supersedes],
        "normative_refs": [target_num for e, target_num in edges_out if e.edge_type == EdgeType.normative_ref],
        "referenced_by": [source_num for e, source_num in edges_in if e.edge_type == EdgeType.normative_ref]
    }
    
    std_dump = standard.model_dump()
    std_dump["status"] = standard.status.value if isinstance(standard.status, StandardStatus) else standard.status
    std_dump["certification"] = standard.certification.value if isinstance(standard.certification, CertScheme) else standard.certification
    
    return StandardDetail(
        **std_dump,
        categories=list(categories),
        cross_references=cross_references
    )
