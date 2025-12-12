"""Merge conflicting heads

Revision ID: f144579cf508
Revises: 47225961b5c3, 535da8f7a5cd
Create Date: 2025-12-10 16:14:25.430857

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision: str = 'f144579cf508'
down_revision: Union[str, None] = ('47225961b5c3', '535da8f7a5cd')
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    pass


def downgrade() -> None:
    pass
