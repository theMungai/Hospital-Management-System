from fastapi import Depends, status, HTTPException, APIRouter
from sqlalchemy.orm import Session, aliased
from typing import List

from ..models import User, Patient
from ..database.database import get_db
from ..utils.hashing import hash_pwd
from ..schemas.PatientSchema import PatientOut, PatientCreate

router = APIRouter(
    tags=['Patients']
)

def get_patient_details(db):
    PatientUser = aliased(User)

    query = db.query(
        PatientUser.first_name.label("patient_first_name"),
        PatientUser.last_name.label("patient_last_name"),
        PatientUser.profile_image.label("patient_profile_image"),
        PatientUser.email.label("patient_email"),
        PatientUser.phone_number.label("patient_phone_number"),
        PatientUser.created_at.label("patient_date_joined"),

        Patient.id.label("id"),
        Patient.date_of_birth,
        Patient.gender,
        Patient.marital_status,
        Patient.street_address,
        Patient.city,
        Patient.country,
        Patient.blood_type,
        Patient.any_medication,
        Patient.family_doctor_name,
        Patient.emergency_first_name,
        Patient.emergency_last_name,
        Patient.emergency_relationship,
        Patient.emergency_contact,
        Patient.insurance_provider,
        Patient.insurance_id
    )



    query = query.outerjoin(PatientUser, Patient.user_id == PatientUser.id)

    results = query.all()

    patients_list = []


    for row in results:
        patients_list.append({
            "id": row.id,
            "patient_first_name": row.patient_first_name,
            "patient_last_name": row.patient_last_name,
            "patient_profile_image": row.patient_profile_image,
            "patient_email": row.patient_email,
            "patient_phone_number": row.patient_phone_number,
            "patient_date_joined": row.patient_date_joined,
            "date_of_birth": row.date_of_birth,
            "gender": row.gender,
            "marital_status": row.marital_status,
            "street_address": row.street_address,
            "city": row.city,
            "country": row.country,
            "blood_type": row.blood_type,
            "disease": row.disease,
            "family_doctor_name": row.family_doctor_name,
            "emergency_first_name": row.emergency_first_name,
            "emergency_last_name": row.emergency_last_name,
            "emergency_relationship": row.emergency_relationship,
            "emergency_contact": row.emergency_contact,
            "insurance_provider": row.insurance_provider,
            "insurance_id": row.insurance_id
        })


    return patients_list



@router.get("/patients", status_code=status.HTTP_200_OK, response_model=List[PatientOut])
def get_patients(db: Session = Depends(get_db)):
    try:
        patients = get_patient_details(db)
        return patients
    
    except Exception as error:
        print(f"Database error: {error}")
        raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail="Internal server error while fetching patients")


@router.post("/patients", status_code=status.HTTP_201_CREATED, response_model=PatientOut)
def create_patients(patient: PatientCreate, db: Session = Depends(get_db)):
    existing_user = db.query(User).filter(User.email == patient.email).first()
    if existing_user:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="User with this email already exists."
        )

    patient_data = patient.dict()

    user_data = {
        "first_name": patient_data.pop("first_name"),
        "last_name": patient_data.pop("last_name"),
        "email": patient_data.pop("email"),
        "phone_number": patient_data.pop("phone_number"),
        "password": hash_pwd(patient_data.pop("password")),
        "role": "patient",
        "is_active": True
    }

    new_user = User(**user_data)
    db.add(new_user)
    db.flush()

    patient_data["user_id"] = new_user.id
    new_patient = Patient(**patient_data)
    db.add(new_patient)

    try:
        db.commit()
        db.refresh(new_patient)
    except Exception as error:
        db.rollback()
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,detail=f"Error creating patient: {str(error)}"
        )

    return new_patient
