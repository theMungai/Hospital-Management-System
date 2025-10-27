from passlib.context import CryptContext

pwd_context = CryptContext(schemes=["bcrypt"], deprecate="auto")

def hash(password:str):
    return pwd_context.hash(password)