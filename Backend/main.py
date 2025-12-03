from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from App.routes import user_routes, doctor_routes, patient_routes, appointment_routes, appointment_note_routes
from App.auth import auth, oauth2


def create_app():
    app = FastAPI()

    app.add_middleware(
        CORSMiddleware,
        allow_origins=["http://localhost:5173"],
        allow_credentials=True,
        allow_methods="*",
        allow_headers="*"
    )

    app.include_router(user_routes.router)
    app.include_router(doctor_routes.router)
    app.include_router(patient_routes.router)
    app.include_router(appointment_routes.router)
    app.include_router(appointment_note_routes.router)
    app.include_router(oauth2.router)
    app.include_router(auth.router)

    return app

import os
import uvicorn

app = create_app()

if __name__ == "__main__":
    port = int (os.environ.get("PORT", 8000))
    uvicorn.run("main:app", host="0.0.0.0", port=port)