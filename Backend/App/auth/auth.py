from fastapi import HTTPException, status, Depends, APIRouter
from fastapi.security import OAuth2PasswordRequestForm
from sqlalchemy.orm import Session

from ..database import database
from ..models import User
from ..utils import hashing
from .oauth2 import create_access_token

router = APIRouter(tags=['Authentication'])

@router.post("/login")
def authenticate_user(user_credentials:OAuth2PasswordRequestForm=Depends() ,db: Session=Depends(database.get_db)):
    user = db.query(User).filter(User.email == user_credentials.username).first()

    if not user:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Invalid Credentials")

    if not hashing.verify(user_credentials.password, user.password):
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Invalid Credentials")

    access_token = create_access_token(data={"user_id": user.id})

    return {
        "access_token" : access_token,
        "token_type" : "bearer"
    }