from fastapi import Depends, status, HTTPException, APIRouter
from sqlalchemy.orm import Session
from typing import List

from ..models import User, Doctor
from ..database.database import get_db
from ..utils.hashing import hash_pwd
from ..schemas.DoctorSchema import DoctorOut, DoctorCreate

router = APIRouter()

@router.post("/doctors", status_code=status.HTTP_201_CREATED, response_model=DoctorOut)
def create_post(doctor : DoctorCreate, db: Session=Depends(get_db)):
    existing_user = db.query(User).filter(User.email == doctor.email).first()

    if existing_user:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="User with this email already exists.")

    doctor_data = doctor.dict()

    user_data = {
        "first_name": doctor_data.pop("first_name"),
        "last_name": doctor_data.pop("last_name"),
        "email": doctor_data.pop("email"),
        "phone_number": doctor_data.pop("phone_number"),
        "password": hash_pwd(doctor_data.pop("password")),
        "role": "doctor",
        "is_active": True
    }

    doctor_data.pop("role", None)

    new_user = User(**user_data)
    db.add(new_user)
    db.flush()

    doctor_data["user_id"] = new_user.id
    new_doctor = Doctor(**doctor_data)
    db.add(new_doctor)

    try:
        db.commit()
        db.refresh(new_doctor)

    except Exception as error:
        db.rollback()
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail=f"Error creating doctor {str(error)}")

    return new_doctor


@router.get("/doctors", status_code=status.HTTP_200_OK, response_model=List[DoctorOut])
def get_doctors(db: Session=Depends(get_db)):
    doctors = db.query(Doctor).all()
    return doctors