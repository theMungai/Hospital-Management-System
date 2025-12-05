from sqlalchemy import Column, Integer, String, Boolean, TIMESTAMP, Enum, text
from sqlalchemy.orm import relationship

from ..core.enums import RoleEnum
from ..database.database import Base


class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True)
    first_name = Column(String, nullable=False)
    last_name = Column(String, nullable=False)
    email = Column(String, nullable=False, unique=True)
    phone_number = Column(String, nullable=False)
    password = Column(String, nullable=False)
    role = Column(Enum(RoleEnum), nullable=False)
    profile_image = Column(String, nullable=False)
    is_active = Column(Boolean, server_default="true", nullable=False)
    verified = Column(Boolean, default=False, nullable=False)
    updated_at = Column(TIMESTAMP(timezone=True), onupdate=text('now()'))
    created_at = Column(TIMESTAMP(timezone=True), server_default=text('now()'))

    # Relationship
    doctor = relationship("Doctor", back_populates="user")
    patient = relationship("Patient", back_populates="user")