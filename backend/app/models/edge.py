from sqlmodel import SQLModel, Field, Column
from sqlalchemy import Enum
from typing import Optional
import enum
import uuid
from datetime import datetime, timezone

def get_utc_now():
    return datetime.now(timezone.utc)

class EdgeType(str, enum.Enum):
    supersedes = 'supersedes'
    normative_ref = 'normative_ref'
    informative_ref = 'informative_ref'
    amendment_of = 'amendment_of'

class StandardEdge(SQLModel, table=True):
    __tablename__ = "standard_edges"

    id: uuid.UUID = Field(default_factory=uuid.uuid4, primary_key=True)
    source_id: uuid.UUID = Field(foreign_key="standards.id", ondelete="CASCADE")
    target_id: uuid.UUID = Field(foreign_key="standards.id", ondelete="CASCADE")
    
    edge_type: EdgeType = Field(
        sa_column=Column(Enum(EdgeType), nullable=False)
    )
    notes: Optional[str] = None
    created_at: datetime = Field(default_factory=get_utc_now, nullable=False)
