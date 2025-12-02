from fastapi import status, HTTPException, APIRouter, Depends
from sqlalchemy.orm import Session
from typing import List

from ..schemas import AppointmentSchema
from ..models.Appointment import Appointment
from ..database.database import get_db

router = APIRouter(tags=["Appointments"])

@router.get("/appointments", response_model=List[AppointmentSchema.AppointmentOut], status_code=status.HTTP_200_OK)
def get_appointments(db: Session = Depends(get_db)):
    appointments = db.query(Appointment).all()
    return appointments


@router.post("/appointments", response_model=AppointmentSchema.AppointmentCreate, status_code=status.HTTP_201_CREATED)
def create_appointments(appointment: AppointmentSchema.AppointmentCreate,db: Session = Depends(get_db)):
    new_appointment = Appointment(**appointment.dict())

    db.add(new_appointment)
    db.commit()
    db.refresh(new_appointment)

    return new_appointment