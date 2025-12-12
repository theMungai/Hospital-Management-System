"""Add verified column to user model

Revision ID: a50c2400e496
Revises: eeb9ba163271
Create Date: 2025-12-02 14:00:00.000000

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision: str = 'a50c2400e496'
down_revision: Union[str, Sequence[str], None] = 'eeb9ba163271'
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    # THIS IS THE CRITICAL FIX: server_default=sa.text('false')
    op.add_column('users', sa.Column('verified', sa.Boolean(), nullable=False, server_default=sa.text('false')))


def downgrade() -> None:
    op.drop_column('users', 'verified')