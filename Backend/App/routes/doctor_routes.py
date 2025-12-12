from fastapi import Depends, status, HTTPException, APIRouter, File, Form, UploadFile
from sqlalchemy.orm import Session
from typing import List
from pydantic import EmailStr
from datetime import date
import os
import uuid
from typing import BinaryIO

from ..models import User, Doctor
from ..database.database import get_db
from ..utils.hashing import hash_pwd
from ..schemas.DoctorSchema import DoctorOut, DoctorCreate

router = APIRouter(
    tags=['Doctors']
)

UPLOAD_DIR = "uploads"


def save_file_securely(upload_file: UploadFile) -> str:
    os.makedirs(UPLOAD_DIR, exist_ok=True)

    _, ext = os.path.splitext(upload_file.filename or "")
    if not ext:
        ext = ".bin"

    unique_filename = f"{uuid.uuid4()}{ext}"
    file_path = os.path.join(UPLOAD_DIR, unique_filename)

    try:
        file_stream: BinaryIO = upload_file.file
        with open(file_path, "wb") as buffer:
            while chunk := file_stream.read(1024 * 1024):
                buffer.write(chunk)
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to save file: {e}")
    finally:
        upload_file.file.close()
    return file_path


def get_top_practitioners(db):
    pass


@router.post("/doctors", status_code=status.HTTP_201_CREATED)
def create_doctor(
        # User fields
        first_name: str = Form(...),
        last_name: str = Form(...),
        email: EmailStr = Form(...),
        phone_number: str = Form(...),
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
    try:
        degree_file_path = save_file_securely(degree_certificate_upload)
        license_file_path = save_file_securely(license_certificate_upload)
        certs_file_path = save_file_securely(additional_certifications_upload)
    except HTTPException as e:
        raise e
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"File processing error: {e}")

    existing_user = db.query(User).filter(User.email == email).first()
    if existing_user:
        raise HTTPException(status_code=400, detail="User with this email already exists.")

    try:
        new_user = User(
            first_name=first_name,
            last_name=last_name,
            email=email,
            phone_number=phone_number,
            password=hash_pwd(password),
            role="doctor",
            is_active=True
        )
        db.add(new_user)
        db.flush()

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
            # Store the secure file paths
            degree_certificate_upload=degree_file_path,
            license_certificate_upload=license_file_path,
            additional_certifications_upload=certs_file_path,
            recovery_email=recovery_email
        )

        db.add(new_doctor)
        db.commit()
        db.refresh(new_doctor)

        return new_doctor

    except Exception as e:
        db.rollback()
        for path in [degree_file_path, license_file_path, certs_file_path]:
            if os.path.exists(path):
                try:
                    os.remove(path)
                except OSError as os_error:
                    print(f"Failed to clean up file {path}: {os_error}")
        raise HTTPException(status_code=500, detail=f"Registration failed due to a database error: {e}")


@router.get("/doctors", status_code=status.HTTP_200_OK, response_model=List[DoctorOut])
def get_doctors(db: Session = Depends(get_db)):
    doctors = db.query(Doctor).all()
    return doctors