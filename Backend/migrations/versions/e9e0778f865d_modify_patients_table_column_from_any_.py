"""modify patients table column from any_condition to Disease

Revision ID: e9e0778f865d
Revises: 7e903afb9c8a
Create Date: 2025-12-18 23:49:31.072370

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision: str = 'e9e0778f865d'
down_revision: Union[str, None] = '7e903afb9c8a'
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    # Use alter_column with the new_column_name argument
    op.alter_column('patients', 'any_medication', new_column_name='Disease')

def downgrade() -> None:
    # Reverse the change for downgrades
    op.alter_column('patients', 'Disease', new_column_name='any_medication')
