from sqlmodel import SQLModel, Field, Column
from sqlalchemy.dialects.postgresql import JSONB, ARRAY, UUID, FLOAT
from sqlalchemy import Enum
from typing import Optional, List, Dict, Any
import enum
import uuid as uuid_pkg
from datetime import datetime

class FeedbackType(str, enum.Enum):
    thumbs_up = 'thumbs_up'
    thumbs_down = 'thumbs_down'
    wrong_standard = 'wrong_standard'
    missing_standard = 'missing_standard'
    outdated_info = 'outdated_info'

class QueryLog(SQLModel, table=True):
    __tablename__ = "query_logs"

    id: uuid_pkg.UUID = Field(default_factory=uuid_pkg.uuid4, primary_key=True)
    user_id: Optional[uuid_pkg.UUID] = Field(default=None, foreign_key="users.id")
    api_key_id: Optional[uuid_pkg.UUID] = Field(default=None, foreign_key="api_keys.id")
    
    query_text: str
    detected_lang: str = Field(default="en")
    translated_text: Optional[str] = None
    category_hint: Optional[str] = None
    
    retrieved_ids: Optional[List[uuid_pkg.UUID]] = Field(default=None, sa_column=Column(ARRAY(UUID(as_uuid=True))))
    retrieval_scores: Optional[List[float]] = Field(default=None, sa_column=Column(ARRAY(FLOAT)))
    
    llm_response: Dict[str, Any] = Field(sa_column=Column(JSONB), default_factory=dict)
    llm_model: Optional[str] = None
    llm_latency_ms: Optional[int] = None
    
    total_latency_ms: Optional[int] = None
    created_at: datetime = Field(default_factory=datetime.utcnow, nullable=False)

class QueryFeedback(SQLModel, table=True):
    __tablename__ = "query_feedback"

    id: uuid_pkg.UUID = Field(default_factory=uuid_pkg.uuid4, primary_key=True)
    query_log_id: uuid_pkg.UUID = Field(foreign_key="query_logs.id", ondelete="CASCADE")
    feedback: FeedbackType = Field(sa_column=Column(Enum(FeedbackType), nullable=False))
    correct_is: Optional[str] = None
    comment: Optional[str] = None
    created_at: datetime = Field(default_factory=datetime.utcnow, nullable=False)
