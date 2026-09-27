from pydantic import BaseModel
from typing import Optional
import uuid

class FeedbackRequest(BaseModel):
    query_id: uuid.UUID
    feedback: str
    correct_is: Optional[str] = None
    comment: Optional[str] = None

class FeedbackResponse(BaseModel):
    status: str = "ok"
