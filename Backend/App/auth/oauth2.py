from jose import JWTError, jwt
from datetime import datetime, timedelta

SECURITY_KEY = "f685ccb35a8cc96d71bf55ed95f28c270701ade7c4d5a8de565dd92ec2eee27e637f6daef6e4b7641a4377ff92236f3934fe4c8c9e8fd252831694ebdb68d79528518fbc2bba1adaca7614fdd14b705017487d496dcfbab5639ad8907e61a9b8a9ae7ac95ca6ba1aa7e82249249219d6efc7dd6e605ff9f443fa41f085ab04fc4a62fdcefeeae4fdf5a63dbec9f79c2e129c4ec3a2e4d88dd5f003a144226eadfdf308043ea446e9b96b23a4296c54afa4d6153e9ddac1fb6461c5b3b1a0f0169255578d005c4b702fc9749d5a25b6ca230ef76558f2368d208e6377a86030aea0440fbbe2a1077ded87b6d746317f776b1aaf1dbb938fd1a0582e766e8d4e66"

ALGORITHM = "HS256"
TOKEN_EXPIRATION_TIME_MINUTES = 30

def create_access_token(data:dict):
    to_encode = data.copy()
    expiry = datetime.now() + timedelta(minutes=TOKEN_EXPIRATION_TIME_MINUTES)
    to_encode.update({"exp" : expiry})

    encoded_jwt = jwt.encode(to_encode, SECURITY_KEY, algorithm=ALGORITHM)

    return encoded_jwt
