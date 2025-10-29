from datetime import date
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
    id : int
    user : UserOut
    date_of_birth: date
    city: str
    emergency_first_name: str
    emergency_last_name: str
    emergency_relationship: str
    emergency_contact: str

    class Config:
        from_attributes = True



