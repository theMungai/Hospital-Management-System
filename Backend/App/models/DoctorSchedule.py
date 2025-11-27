from sqlalchemy import Column, Integer

from ..database.database import Base

class DoctorSchedule(Base):
    __tablename__ = "doctor_schedule"

    id = Column(Integer, primary_key=True)