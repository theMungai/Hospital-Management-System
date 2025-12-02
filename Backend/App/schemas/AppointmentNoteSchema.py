from pydantic import BaseModel, field_validator
from datetime import datetime
from typing import Optional


class AppointmentNoteBase(BaseModel):
    appointment_id: int
    doctor_id: int
    patient_description: str
    clinical_findings: Optional[str] = None
    assessment: str
    plan: Optional[str] = None

    @field_validator('patient_description')
    @classmethod
    def subjective_must_not_be_empty(cls, value):
        if not value or not value.strip():
            raise ValueError('Patient description field cannot be empty.')
        return value


class AppointmentNoteCreate(AppointmentNoteBase):
    pass

class AppointmentNoteOut(AppointmentNoteBase):
    id: int
    created_at: datetime
    updated_at: Optional[datetime] = None

    class Config:
        from_attributes = True