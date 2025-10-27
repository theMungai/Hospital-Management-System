from sqlalchemy import Column, Integer

from ..database.database import Base

class Patient(Base):
    __tablename__ = "patients"

    id = Column(Integer, primary_key=True)