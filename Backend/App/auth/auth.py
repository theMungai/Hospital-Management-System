from fastapi import HTTPException, status, Depends, APIRouter
from sqlalchemy.orm import Session

from ..database import database
from ..models import User
from ..schemas.UserSchema import UserLogin
from ..utils import hashing
from .oauth2 import create_access_token

router = APIRouter(tags=['Authentication'])

@router.post("/login")
def authenticate_user(
    user_credentials: UserLogin,
    db: Session = Depends(database.get_db)
):
    user = db.query(User).filter(User.email == user_credentials.email).first()

    if not user:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Invalid Credentials"
        )

    if not hashing.verify(user_credentials.password, user.password):
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Invalid Credentials"
        )

    # FIXED INDENTATION
    access_token = create_access_token(
        data={
            "user_id": user.id,
            "email": user.email,
            "role": user.role,
        }
    )

    return {
        "access_token": access_token,
        "token_type": "bearer",
        "role": user.role,
        "user": user
    }
