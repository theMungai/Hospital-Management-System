from sqlalchemy import Column, String, Integer, ForeignKey, Text, Boolean, TIMESTAMP, text
from sqlalchemy.orm import relationship

from ..database.database import Base


class Notifications(Base):

    id = Column(Integer, primary_key=True)

    user_id = Column(Integer, ForeignKey("users.id"), nullable=False)
    title = Column(String(150), nullable=False)
    content = Column(Text, nullable=False)
    is_read = Column(Boolean, default=False, nullable=False)
    created_at = Column(TIMESTAMP(timezone=True), server_default=text('now()'))

    recipient = relationship("User", back_populates="notifications")
