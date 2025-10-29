from fastapi import FastAPI, Depends, HTTPException, status, Response
from sqlalchemy.orm import Session
from typing import List

from App.database.database import get_db, engine
import App.models as models
from App.schemas.UserSchema import UserCreate, UserOut
from App.utils.hashing import hash_pwd
from App.schemas.DoctorSchema import DoctorOut, DoctorCreate
from App.schemas.PatientSchema import PatientOut, PatientCreate

app = FastAPI()

models.Base.metadata.create_all(bind=engine)

@app.get("/users")
def get_users(db:Session = Depends(get_db)):
    users = db.query(models.User).all()

    return users


@app.post("/users", status_code=status.HTTP_201_CREATED, response_model=UserOut)
def create_user(user: UserCreate,db: Session=Depends(get_db)):
    existing_user = db.query(models.User).filter(models.User.email == user.email).first()

    if existing_user:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="User with this email already exists.")

    hashed_password = hash_pwd(user.password)
    user.password = hashed_password

    new_user = models.User(**user.dict())
    db.add(new_user)
    db.commit()
    db.refresh(new_user)

    return new_user


@app.post("/doctors", status_code=status.HTTP_201_CREATED, response_model=DoctorOut)
def create_post(doctor : DoctorCreate, db: Session=Depends(get_db)):
    existing_user = db.query(models.User).filter(models.User.email == doctor.email).first()

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

    new_user = models.User(**user_data)
    db.add(new_user)
    db.commit()
    db.refresh(new_user)

    doctor_data["user_id"] = new_user.id

    new_doctor = models.Doctor(**doctor_data)
    db.add(new_doctor)
    db.commit()
    db.refresh(new_doctor)

    return new_doctor


@app.get("/doctors", status_code=status.HTTP_200_OK, response_model=List[DoctorOut])
def get_doctors(db: Session=Depends(get_db)):
    doctors = db.query(models.Doctor).all()
    return doctors

@app.get("/patients", status_code=status.HTTP_200_OK, response_model=List[PatientOut])
def get_patients(db: Session=Depends(get_db)):
    patients = db.query(models.Patient).all()
    return patients

@app.post("/patients", status_code=status.HTTP_201_CREATED, response_model=PatientOut)
def create_patients(patient:PatientCreate,db: Session=Depends(get_db)):
    existing_user = db.query(models.User).filter(models.User.email == patient.email).first()

    if existing_user:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="User with this email already exists.")

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

    new_user = models.User(**user_data)
    db.add(new_user)
    db.commit()
    db.refresh(new_user)

    patient_data["user_id"] = new_user.id

    new_patient = models.Patient(**patient_data)
    db.add(new_patient)
    db.commit()
    db.refresh(new_patient)

    return new_patient
