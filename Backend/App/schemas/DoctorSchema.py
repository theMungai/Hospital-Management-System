from datetime import date, datetime
from pydantic import EmailStr, BaseModel

from ..schemas.UserSchema import UserCreate, UserOut


class DoctorCreate(UserCreate):
    date_of_birth: date
    gender: str
    national_id_or_passport: str
    street_address: str
    street_address_2: str
    city: str
    region: str
    zip: str
    country: str
    medical_license_number: str
    specialty: str
    years_of_experience: str
    current_workplace: str
    medical_school: str
    graduation_year: str
    level_of_education: str
    degree_certificate_upload: str
    license_certificate_upload: str
    additional_certifications_upload: str
    username: str
    recovery_email: EmailStr


class DoctorOut(BaseModel):
    id: int
    doctor_first_name: str
    doctor_last_name: str
    doctor_profile_image: str | None = None
    doctor_email: str
    doctor_phone_number: str
    doctor_date_joined: datetime
    date_of_birth: date
    gender: str
    street_address: str
    city: str
    country: str
    medical_license_number: str
    specialty: str
    availability_status: str | None = "Available"

    class Config:
        from_attributes = True
