from sqlalchemy import Column, Integer, String, Date, ForeignKey
from sqlalchemy.orm import relationship

from ..database.database import Base

class Doctor(Base):
    __tablename__ = "doctors"

    id = Column(Integer, primary_key=True, nullable=False)
    user_id = Column(Integer, ForeignKey("users.id"), unique=True)
    username = Column(String, unique=True, nullable=False)
    date_of_birth = Column(Date, nullable=False)
    gender = Column(String, nullable=False)
    national_id_or_passport = Column(String, nullable=False)
    street_address = Column(String, nullable=False)
    city = Column(String, nullable=False)
    country = Column(String, nullable=False)
    medical_license_number = Column(String, nullable=False)
    specialty = Column(String, nullable=False)
    years_of_experience = Column(String, nullable=False)
    current_workplace = Column(String, nullable=False)
    medical_school = Column(String, nullable=False)
    graduation_year = Column(String, nullable=False)
    level_of_education = Column(String, nullable=False)
    degree_certificate_upload = Column(String, nullable=False)
    license_certificate_upload = Column(String, nullable=False)
    additional_certifications_upload = Column(String, nullable=False)
    availability_status = Column(String(60), default="Available")

    # Relationship
    user = relationship("User", back_populates="doctor")
    appointments = relationship("Appointment", back_populates="doctor")
    notes = relationship("AppointmentNote", back_populates="doctor")
