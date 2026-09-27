from sqlmodel import SQLModel, Field, Column
from sqlalchemy.dialects.postgresql import ARRAY, TEXT
from typing import Optional, List
import uuid
from datetime import datetime

class EvalQuery(SQLModel, table=True):
    __tablename__ = "eval_queries"

    id: uuid.UUID = Field(default_factory=uuid.uuid4, primary_key=True)
    query_text: str
    expected_is: List[str] = Field(sa_column=Column(ARRAY(TEXT), nullable=False))
    category: Optional[str] = None
    notes: Optional[str] = None
    created_at: datetime = Field(default_factory=datetime.utcnow, nullable=False)
