from fastapi import Depends, status, HTTPException, APIRouter
from sqlalchemy.orm import Session
from typing import List

from ..models import User, Patient
from ..database.database import get_db
from ..utils.hashing import hash_pwd
from ..schemas.PatientSchema import PatientOut, PatientCreate

router = APIRouter()

@router.get("/patients", status_code=status.HTTP_200_OK, response_model=List[PatientOut])
def get_patients(db: Session = Depends(get_db)):
    patients = db.query(Patient).all()
    return patients


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

    patient_data.pop("role", None)

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

    return {
        "message": "Patient created successfully",
        "patient": new_patient
    }
