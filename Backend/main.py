from fastapi import FastAPI, Depends, HTTPException, status, Response
from sqlalchemy.orm import Session

from App.database.database import get_db, engine
import App.models as models
from App.schemas.UserSchema import UserCreate, UserOut
from App.utils.hashing import hash_pwd
from App.schemas.DoctorSchema import DoctorOut, DoctorCreate

app = FastAPI()

models.Base.metadata.create_all(bind=engine)

@app.get("/users")
def get_test(db:Session = Depends(get_db)):
    posts = db.query(models.User).all()

    return posts


@app.post("/users", status_code=status.HTTP_201_CREATED, response_model=UserOut)
def create_user(user: UserCreate,db: Session=Depends(get_db)):
    existing_user = db.query(models.User).filter(models.User.email == user.email).first()

    if existing_user:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="User with this email already exists.")

    hashed_password = hash_pwd(user.password)
    user.password = hashed_password

    new_user = models.User(**user.dict())
    db.add(new_user)
    db.commit()
    db.refresh(new_user)

    return new_user


@app.post("/doctors", status_code=status.HTTP_201_CREATED, response_model=DoctorOut)
def create_post(doctor : DoctorCreate, db: Session=Depends(get_db)):
    existing_user = db.query(models.User).filter(models.User.email == doctor.email).first()

    if existing_user:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="User with this email already exists.")

    doctor_data = doctor.dict()

    user_data = {
        "first_name": doctor_data.pop("first_name"),
        "last_name": doctor_data.pop("last_name"),
        "email": doctor_data.pop("email"),
        "phone_number": doctor_data.pop("phone_number"),
        "password": hash_pwd(doctor_data.pop("password")),
        "role": "doctor",
        "is_active": True
    }

    doctor_data.pop("role", None)

    new_user = models.User(**user_data)
    db.add(new_user)
    db.commit()
    db.refresh(new_user)

    doctor_data["user_id"] = new_user.id

    new_doctor = models.Doctor(**doctor_data)
    db.add(new_doctor)
    db.commit()
    db.refresh(new_doctor)

    return new_doctor
