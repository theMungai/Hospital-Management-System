from sqlalchemy import Column, Integer

from ..database.database import Base

class Doctor(Base):
    __tablename__ = "doctors"

    id = Column(Integer, primary_key=True)