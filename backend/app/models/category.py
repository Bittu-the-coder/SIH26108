from sqlmodel import SQLModel, Field
from typing import Optional
import uuid
from datetime import datetime, timezone

def get_utc_now():
    return datetime.now(timezone.utc)

class Category(SQLModel, table=True):
    __tablename__ = "categories"

    id: uuid.UUID = Field(default_factory=uuid.uuid4, primary_key=True)
    name: str = Field(unique=True, index=True)
    name_hi: Optional[str] = None
    description: Optional[str] = None
    parent_id: Optional[uuid.UUID] = Field(default=None, foreign_key="categories.id")
    created_at: datetime = Field(default_factory=get_utc_now, nullable=False)

class StandardCategory(SQLModel, table=True):
    __tablename__ = "standard_categories"

    standard_id: uuid.UUID = Field(foreign_key="standards.id", primary_key=True, ondelete="CASCADE")
    category_id: uuid.UUID = Field(foreign_key="categories.id", primary_key=True, ondelete="CASCADE")
