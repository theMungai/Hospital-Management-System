from fastapi import FastAPI, Depends, HTTPException, status, Response
from sqlalchemy.orm import Session

from App.database.database import get_db, engine
import App.models as models

app = FastAPI()

models.Base.metadata.create_all(bind=engine)

@app.get("/test_session")
def get_test(db:Session = Depends(get_db)):
    return {"status" : "success"}