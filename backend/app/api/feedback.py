from fastapi import APIRouter, Depends, status
from sqlmodel.ext.asyncio.session import AsyncSession
from app.database import get_session
from app.schemas.feedback import FeedbackRequest, FeedbackResponse

router = APIRouter()

@router.post("", status_code=status.HTTP_201_CREATED, response_model=FeedbackResponse)
async def submit_feedback(
    request: FeedbackRequest,
    session: AsyncSession = Depends(get_session)
):
    # Stub
    return FeedbackResponse(status="ok")
