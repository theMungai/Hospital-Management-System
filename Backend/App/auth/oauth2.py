from jose import jwt, JWTError
from datetime import datetime, timedelta
from collections import defaultdict
from fastapi import Depends, HTTPException, status, APIRouter, Body
from fastapi.security import OAuth2PasswordBearer
import random
import logging

from sqlalchemy.orm import Session

from ..schemas.TokenSchema import TokenData
from ..database.config import settings
from ..database.database import get_db
from ..models.User import User
from ..utils.send_otp import send_otp_email

otp_store = defaultdict()

router = APIRouter(tags=["One Time Password"])

oauth_scheme = OAuth2PasswordBearer(tokenUrl="login")

SECRET_KEY = settings.JWT_SECRET_KEY
ALGORITHM = settings.ALGORITHM
TOKEN_EXPIRATION_TIME_MINUTES = 30


def create_access_token(data: dict):
    to_encode = data.copy()
    expiry = datetime.utcnow() + timedelta(minutes=TOKEN_EXPIRATION_TIME_MINUTES)
    to_encode.update({"exp": expiry})
    return jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)


def verify_access_token(token, credentials_exception):
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        id = payload.get("user_id")
        email = payload.get("email")
        role = payload.get("role")

        if not id:
            raise credentials_exception

        token_data = TokenData(id=str(id), email=email, role=role)

    except JWTError:
        raise credentials_exception

    return token_data


def get_current_user(token: str = Depends(oauth_scheme)):
    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Could not validate credentials",
        headers={"WWW-Authenticate": "Bearer"}
    )
    return verify_access_token(token, credentials_exception)


logger = logging.getLogger(__name__)


@router.post("/send-otp", tags=["Authentication"])
async def send_otp(email: str = Body(..., embed=True)):
    otp_code = str(random.randint(100000, 999999))
    expires_at = datetime.utcnow() + timedelta(minutes=30)

    otp_store[email] = {"otp": otp_code, "expires_at": expires_at}

    try:
        await send_otp_email(email_to=email, otp_code=otp_code)
        return {"message": "OTP sent successfully"}
    except Exception as e:
        logger.error(f"Failed to send OTP to {email}: {e}")
        raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail="Failed to send OTP")


@router.post("/verify-otp", tags=["Authentication"])
def verify_otp(
    otp: str = Body(..., embed=True),
    current_user: TokenData = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    record = otp_store.get(current_user.email)

    if not record or record["otp"] != otp:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Invalid OTP")

    if datetime.utcnow() > record["expires_at"]:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="OTP expired")

    user = db.query(User).filter(User.id == current_user.id).first()
    user.verified = True
    db.commit()

    otp_store.pop(current_user.email, None)

    access_token = create_access_token(
        data={
            "user_id": user.id,
            "email": user.email,
            "role": user.role
        }
    )

    return {
        "access_token": access_token,
        "token_type": "bearer",
        "role": user.role,
        "user": user
    }
