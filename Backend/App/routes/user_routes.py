from fastapi import Depends, status, HTTPException, APIRouter, Form, UploadFile, File
from sqlalchemy.orm import Session
from typing import List

from ..core.enums import RoleEnum
from ..models import User
from ..database.database import get_db
from ..utils.hashing import hash_pwd
from ..schemas.UserSchema import UserOut, UserCreate
from .doctor_routes import save_file_securely

router = APIRouter(
    tags=['Users']
)

@router.get("/users", status_code=status.HTTP_200_OK, response_model=List[UserOut])
def get_users(db:Session = Depends(get_db)):
    users = db.query(User).all()

    return users


@router.get("/users/{id}", status_code=status.HTTP_200_OK, response_model=UserOut)
def get_user_by_id(id: int, db:Session=Depends(get_db)):
    user = db.query(User).filter(User.id == id).first()

    if not user:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail=f"User with id {id} not found.")

    return user


@router.post("/users", status_code=status.HTTP_201_CREATED, response_model=UserOut)
def create_user(
        first_name: str = Form(...),
        last_name: str = Form(...),
        email: str = Form(...),
        phone_number: str = Form(...),
        password: str = Form(...),
        role: RoleEnum = Form(...),
        profile_image: UploadFile = File(...),
        db: Session = Depends(get_db)

):
    existing_user = db.query(User).filter(User.email == email).first()

    if existing_user:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="User with this email already exists.")

    hashed_password = hash_pwd(password)
    password = hashed_password

    image_path = None
    if profile_image:
        image_path = save_file_securely(profile_image)

    new_user = User(
        first_name = first_name,
        last_name = last_name,
        email = email,
        phone_number = phone_number,
        password = password,
        role = role,
        profile_image = image_path
    )

    db.add(new_user)
    db.commit()
    db.refresh(new_user)

    return new_user