from fastapi import Depends, status, HTTPException, APIRouter
from sqlalchemy.orm import Session
from typing import List

from ..models import User
from ..database.database import get_db
from ..utils.hashing import hash_pwd
from ..schemas.UserSchema import UserOut, UserCreate

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
def create_user(user: UserCreate,db: Session=Depends(get_db)):
    existing_user = db.query(User).filter(User.email == user.email).first()

    if existing_user:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="User with this email already exists.")

    hashed_password = hash_pwd(user.password)
    user.password = hashed_password

    new_user = User(**user.dict())
    db.add(new_user)
    db.commit()
    db.refresh(new_user)

    return new_user