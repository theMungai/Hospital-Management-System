from fastapi import status, HTTPException, APIRouter, Depends
from sqlalchemy.orm import Session, aliased
from typing import List

from ..schemas import AppointmentSchema
from ..models import Appointment, User, Doctor, Patient
from ..database.database import get_db

router = APIRouter(tags=["Appointments"])

def get_custom_appointment(db: Session):
    
    DoctorUser = aliased(User)
    PatientUser = aliased(User)

    query = db.query(
        DoctorUser.first_name.label("doctor_first_name"),
        DoctorUser.last_name.label("doctor_last_name"),
        DoctorUser.profile_image.label("doctor_profile_image"),

        PatientUser.first_name.label("patient_first_name"),
        PatientUser.last_name.label("patient_last_name"),
        PatientUser.profile_image.label("patient_profile_image"),

        Appointment.id.label("id"),
        Doctor.specialty,
        Appointment.reason_for_visit,
        Appointment.appointment_date,
        Appointment.appointment_status,
        Appointment.duration_minutes,
        Appointment.appointment_type
    )

    query = query.outerjoin(Doctor, Appointment.doctor_id == Doctor.id)
    query = query.outerjoin(DoctorUser, Doctor.user_id == DoctorUser.id)
    query = query.outerjoin(PatientUser, Appointment.patient_id == PatientUser.id) 
    query = query.order_by(Appointment.appointment_date.desc()) 

    results = query.all()

    appointments_list = []

    for row in results:
        appointments_list.append({
            "id": row.id,

            "doctor_first_name": row.doctor_first_name,
            "doctor_last_name": row.doctor_last_name,
            "doctor_profile_image": row.doctor_profile_image,
            "specialty": row.specialty,

            "patient_first_name": row.patient_first_name,
            "patient_last_name": row.patient_last_name,
            "patient_profile_image": row.patient_profile_image,

            "reason_for_visit": row.reason_for_visit,
            "appointment_date": row.appointment_date,
            "appointment_status": row.appointment_status,
            "duration_minutes": row.duration_minutes,
            "appointment_type": row.appointment_type
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



