from sqlalchemy import Column, Integer, String, ForeignKey, Date
from sqlalchemy.orm import relationship

from ..database.database import Base

class Patient(Base):
    __tablename__ = "patients"

    id = Column(Integer, primary_key=True)
    user_id = Column(Integer, ForeignKey("users.id"), unique=True)
    first_name = Column(String, nullable=False)
    last_name = Column(String, nullable=False)
    email = Column(String, nullable=False)
    phone = Column(String, nullable=False)
    date_of_birth = Column(Date, nullable=False)
    gender = Column(String, nullable=False)
    marital_status = Column(String, nullable=False)
    street_address = Column(String, nullable=False)
    street_address_2 = Column(String, nullable=False)
    city = Column(String, nullable=False)
    region = Column(String, nullable=False)
    zip = Column(String, nullable=False)
    country = Column(String, nullable=False)
    blood_type = Column(String, nullable=False)
    any_medication = Column(String, nullable=False)
    additional_notes = Column(String, nullable=False)
    family_doctor_name = Column(String, nullable=False)
    emergency_first_name = Column(String, nullable=False)
    emergency_last_name = Column(String, nullable=False)
    emergency_relationship = Column(String, nullable=False)
    emergency_contact = Column(String, nullable=False)
    insurance_provider = Column(String, nullable=False)
    insurance_id = Column(String, nullable=False)
    policyholder_name = Column(String, nullable=False)
    group_number = Column(String, nullable=False)

    user = relationship("User", back_populates="patient")