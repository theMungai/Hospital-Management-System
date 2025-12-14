from fastapi import status, HTTPException, APIRouter, Depends
from sqlalchemy.orm import Session
from typing import List

from ..schemas import AppointmentSchema
from ..models import Appointment, User, Doctor
from ..database.database import get_db

router = APIRouter(tags=["Appointments"])


def get_custom_appointment(db):

    query = db.query(
        User.first_name,
        User.last_name,
        User.profile_image,
        Doctor.id,
        Doctor.specialty,
        Appointment.reason_for_visit,
        Appointment.appointment_date,
        Appointment.appointment_status
    )

    query = query.join(User, Doctor.user_id == User.id)
    query = query.outerjoin(Appointment, Doctor.id == Appointment.doctor_id)


    query = query.group_by(
        User.first_name,
        User.last_name,
        User.profile_image,
        Doctor.id,
        Doctor.specialty,
        Appointment.reason_for_visit,
        Appointment.appointment_date,
        Appointment.appointment_status
    )


    results = query.all()

    appointments_list = []

    for row in results:
        appointments_list.append({
            "id": row.id,
            "first_name": row.first_name,
            "last_name": row.last_name,
            "profile_image": row.profile_image,
            "specialty": row.specialty,
            "reason_for_visit": row.reason_for_visit,
            "appointment_date": row.appointment_date,
            "appointment_status": row.appointment_status
        })

    
    return appointments_list


@router.get("/appointments")
def get_appointments(db: Session = Depends(get_db)):
    try:
        appointments = get_custom_appointment(db)
        return appointments
    
    except Exception as error:
        print(f"Database error: {error}")
        raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail="Internal server error while appointments.")


@router.post("/appointments", response_model=AppointmentSchema.AppointmentCreate, status_code=status.HTTP_201_CREATED)
def create_appointments(appointment: AppointmentSchema.AppointmentCreate,db: Session = Depends(get_db)):
    new_appointment = Appointment(**appointment.dict())

    db.add(new_appointment)
    db.commit()
    db.refresh(new_appointment)

    return new_appointment



