from sqlalchemy import Column, Integer, String, ForeignKey, Text, TIMESTAMP, text
from sqlalchemy.orm import relationship

from  ..database.database import Base

class AppointmentNote(Base):
    __tablename__ = "appointment_notes"

    id = Column(Integer, primary_key=True)
    appointment_id = Column(Integer, ForeignKey("appointments.id"), nullable=False)
    doctor_id = Column(Integer, ForeignKey("doctors.id"), nullable=False)
    patient_description = Column(Text, nullable=False)
    clinical_findings = Column(Text)
    assessment = Column(Text, nullable=False)
    plan = Column(Text)
    created_at = Column(TIMESTAMP(timezone=True), server_default=text('now()'), nullable=False)
    updated_at = Column(TIMESTAMP(timezone=True), server_default=text('now()'), nullable=False)

    # ORM Relationships
    appointment = relationship("Appointment", back_populates="notes")
    doctor = relationship("Doctor", back_populates="notes")


