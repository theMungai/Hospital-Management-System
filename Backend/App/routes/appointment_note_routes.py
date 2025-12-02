from fastapi import HTTPException, status, Depends, APIRouter
from sqlalchemy.orm import Session
from typing import List

from ..database.database import get_db
from ..models.AppointmentNote import AppointmentNote
from ..schemas.AppointmentNoteSchema import AppointmentNoteCreate, AppointmentNoteOut

router = APIRouter(tags=["Appointment Notes"])

@router.get("/appointment-notes", response_model=List[AppointmentNoteOut], status_code=status.HTTP_200_OK)
def get_notes(db: Session = Depends(get_db)):
    notes = db.query(AppointmentNote).all()
    return notes


@router.post("/appointment-notes", response_model=AppointmentNoteCreate, status_code=status.HTTP_201_CREATED)
def create_note(note: AppointmentNoteCreate,db: Session = Depends(get_db)):
    new_note = AppointmentNote(**note.dict())

    db.add(new_note)
    db.commit()
    db.refresh(new_note)

    return new_note

