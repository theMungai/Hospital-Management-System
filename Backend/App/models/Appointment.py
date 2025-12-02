from sqlalchemy import Column, Integer, String, ForeignKey, TIMESTAMP, text, DateTime
from sqlalchemy.orm import relationship

from ..database.database import Base

class Appointment(Base):
    __tablename__ = "appointments"

    id = Column(Integer, primary_key=True)
    patient_id = Column(Integer, ForeignKey("patients.id"))
    doctor_id = Column(Integer, ForeignKey("doctors.id"))
    duration_minutes = Column(Integer, default=30)
    reason_for_visit = Column(String(500), nullable=False)
    appointment_date = Column(DateTime)
    appointment_type = Column(String(100), default="In-Person")
    updated_at = Column(TIMESTAMP(timezone=True), onupdate=text('now()'))
    created_at = Column(TIMESTAMP(timezone=True), server_default=text('now()'))
    appointment_status = Column(String(50), default="Scheduled")

    patient = relationship("Patient", back_populates="appointments")
    doctor = relationship("Doctor", back_populates="appointments")