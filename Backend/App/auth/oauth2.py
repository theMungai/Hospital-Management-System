from jose import jwt, JWTError
from datetime import datetime, timedelta
from fastapi import Depends, HTTPException, status
from fastapi.security import OAuth2PasswordBearer

from .. schemas.TokenSchema import TokenData
from ..database.config import settings

oauth_scheme = OAuth2PasswordBearer(tokenUrl="login")

SECRET_KEY = settings.JWT_SECRET_KEY

ALGORITHM = settings.ALGORITHM
TOKEN_EXPIRATION_TIME_MINUTES = 30

def create_access_token(data:dict):
    to_encode = data.copy()
    expiry = datetime.now() + timedelta(minutes=TOKEN_EXPIRATION_TIME_MINUTES)
    to_encode.update({"exp" : expiry})

    encoded_jwt = jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)

    return encoded_jwt


def verify_access_token(token, credentials_exception):
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        id: str = payload.get("user_id")

        if not id:
            raise credentials_exception

        token_data = TokenData(id=str(id))
    except JWTError:
        raise credentials_exception
    return token_data


def get_current_user(token: str = Depends(oauth_scheme)):
    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,detail="Could not validate credentials",headers={"WWW-Authenticate" : "Bearer"}
    )

    return verify_access_token(token,credentials_exception)

