from fastapi import FastAPI

from App.routes import user_routes, doctor_routes, patient_routes
from App.auth import auth


app = FastAPI()

app.include_router(user_routes.router)
app.include_router(doctor_routes.router)
app.include_router(patient_routes.router)
app.include_router(auth.router)