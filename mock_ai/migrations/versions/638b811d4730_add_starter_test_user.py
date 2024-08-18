"""Add starter test user

Revision ID: 638b811d4730
Revises: 254e3cdd8f10
Create Date: 2024-07-27 23:38:24.481104

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '638b811d4730'
down_revision = '254e3cdd8f10'
branch_labels = None
depends_on = None


def upgrade():
   
    test_user_email = "test@example.com"
    op.execute(
        f"INSERT INTO users (email) VALUES ('{test_user_email}')"
    )


def downgrade():
  
    test_user_email = "testuser@example.com"
    op.execute(
        f"DELETE FROM users WHERE email = '{test_user_email}'"
    )
