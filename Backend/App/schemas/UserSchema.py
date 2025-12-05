from datetime import datetime
from pydantic import BaseModel, EmailStr, Field

from ..core.enums import RoleEnum


class UserBase(BaseModel):
    first_name: str
    last_name: str
    phone_number: str
    email: EmailStr
    role: RoleEnum


class UserCreate(UserBase):
    profile_image: str = Field(..., description="Image filename or URL")
    password : str


class UserOut(UserBase):
    id : int
    created_at : datetime

    class Config:
        from_attributes = True
        use_enum_values = True


class UserLogin(BaseModel):
    email: str
    password: str