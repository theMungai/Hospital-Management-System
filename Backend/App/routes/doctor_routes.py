from fastapi import Depends, status, HTTPException, APIRouter, File, Form, UploadFile
from sqlalchemy.orm import Session
from typing import List
from pydantic import EmailStr
from datetime import date

from ..models import User, Doctor
from ..database.database import get_db
from ..utils.hashing import hash_pwd
from ..schemas.DoctorSchema import DoctorOut, DoctorCreate

router = APIRouter(
    tags=['Doctors']
)

@router.post("/doctors", status_code=status.HTTP_201_CREATED)
def create_doctor(
    # User fields
    first_name: str = Form(...),
    last_name: str = Form(...),
    email: EmailStr = Form(...),
    phone: str = Form(...),
    password: str = Form(...),

    # Doctor fields
    date_of_birth: date = Form(...),
    gender: str = Form(...),
    national_id_or_passport: str = Form(...),
    street_address: str = Form(...),
    street_address_2: str = Form(...),
    city: str = Form(...),
    region: str = Form(...),
    zip: str = Form(...),
    country: str = Form(...),
    medical_license_number: str = Form(...),
    specialty: str = Form(...),
    years_of_experience: str = Form(...),
    current_workplace: str = Form(...),
    medical_school: str = Form(...),
    graduation_year: str = Form(...),
    level_of_education: str = Form(...),

    # File uploads
    degree_certificate_upload: UploadFile = File(...),
    license_certificate_upload: UploadFile = File(...),
    additional_certifications_upload: UploadFile = File(...),

    # Security
    username: str = Form(...),
    recovery_email: EmailStr = Form(...),

    db: Session = Depends(get_db)
):
    # -------- Save user --------
    existing_user = db.query(User).filter(User.email == email).first()
    if existing_user:
        raise HTTPException(400, "User with this email already exists.")

    new_user = User(
        first_name=first_name,
        last_name=last_name,
        email=email,
        phone_number=phone,
        password=hash_pwd(password),
        role="doctor",
        is_active=True
    )
    db.add(new_user)
    db.flush()

    # -------- Save files --------
    def save_file(upload_file: UploadFile):
        path = f"uploads/{upload_file.filename}"
        with open(path, "wb") as f:
            f.write(upload_file.file.read())
        return path

    degree_file_path = save_file(degree_certificate_upload)
    license_file_path = save_file(license_certificate_upload)
    certs_file_path = save_file(additional_certifications_upload)

    # -------- Save doctor --------
    new_doctor = Doctor(
        user_id=new_user.id,
        username=username,
        date_of_birth=date_of_birth,
        gender=gender,
        national_id_or_passport=national_id_or_passport,
        street_address=street_address,
        street_address_2=street_address_2,
        city=city,
        region=region,
        zip=zip,
        country=country,
        medical_license_number=medical_license_number,
        specialty=specialty,
        years_of_experience=years_of_experience,
        current_workplace=current_workplace,
        medical_school=medical_school,
        graduation_year=graduation_year,
        level_of_education=level_of_education,
        degree_certificate_upload=degree_file_path,
        license_certificate_upload=license_file_path,
        additional_certifications_upload=certs_file_path,
        recovery_email=recovery_email
    )

    db.add(new_doctor)
    db.commit()
    db.refresh(new_doctor)

    return new_doctor


@router.get("/doctors", status_code=status.HTTP_200_OK, response_model=List[DoctorOut])
def get_doctors(db: Session=Depends(get_db)):
    doctors = db.query(Doctor).all()
    return doctors