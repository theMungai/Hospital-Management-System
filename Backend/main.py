from fastapi import FastAPI, Depends, HTTPException, status, Response
from sqlalchemy.orm import Session

from App.database.database import get_db, engine
import App.models as models
from App.schemas.UserSchema import UserCreate, UserOut
from App.utils.hashing import hash_pwd

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
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="User already exists.")

    hashed_password = hash_pwd(user.password)
    user.password = hashed_password

    new_user = models.User(**user.dict())
    db.add(new_user)
    db.commit()
    db.refresh(new_user)

    return new_user