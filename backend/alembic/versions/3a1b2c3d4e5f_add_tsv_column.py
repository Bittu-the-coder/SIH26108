"""add tsv column

Revision ID: 3a1b2c3d4e5f
Revises: 
Create Date: 2026-09-28 18:10:00.000000

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '3a1b2c3d4e5f'
down_revision = None
branch_labels = None
depends_on = None


def upgrade() -> None:
    # Add TSV column to standards table
    op.execute("""
        ALTER TABLE standards 
        ADD COLUMN IF NOT EXISTS tsv tsvector
        GENERATED ALWAYS AS (
            setweight(to_tsvector('english', coalesce(title, '')), 'A') ||
            setweight(to_tsvector('english', coalesce(scope, '')), 'B') ||
            setweight(to_tsvector('english', coalesce(is_number, '')), 'A')
        ) STORED;
    """)
    
    # Create GIN index for fast full-text search
    op.execute("""
        CREATE INDEX IF NOT EXISTS idx_standards_tsv ON standards USING GIN (tsv);
    """)


def downgrade() -> None:
    op.execute("DROP INDEX IF EXISTS idx_standards_tsv;")
    op.execute("ALTER TABLE standards DROP COLUMN IF EXISTS tsv;")
