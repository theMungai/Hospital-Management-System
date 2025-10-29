from fastapi import FastAPI

from App.database.database import  engine
from App.routes import user_routes, doctor_routes, patient_routes
import App.models as models


app = FastAPI()

models.Base.metadata.create_all(bind=engine)

app.include_router(user_routes.router)
app.include_router(doctor_routes.router)
app.include_router(patient_routes.router)