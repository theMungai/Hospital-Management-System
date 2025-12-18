from datetime import date, datetime
from pydantic import BaseModel

from ..schemas.UserSchema import UserCreate, UserOut


class PatientCreate(UserCreate):
    date_of_birth: date
    gender: str
    marital_status: str
    street_address: str
    street_address_2: str
    city: str
    region: str
    zip: str
    country: str
    blood_type: str
    any_medication: str
    additional_notes: str
    family_doctor_name: str
    emergency_first_name: str
    emergency_last_name: str
    emergency_relationship: str
    emergency_contact: str
    insurance_provider: str
    insurance_id: str
    policyholder_name: str
    group_number: str


class PatientOut(BaseModel):
    id: int
    patient_first_name: str
    patient_last_name: str
    patient_profile_image: str | None = None
    patient_email: str
    patient_phone_number: str
    patient_date_joined: datetime
    date_of_birth: date
    gender: str
    marital_status: str
    street_address: str
    city: str
    country: str
    blood_type: str
    Disease: str

    class Config:
        from_attributes = True



