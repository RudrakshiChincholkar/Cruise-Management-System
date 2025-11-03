from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from typing import List
from app.database import get_db
from app.models.speaker import Speaker

router = APIRouter()

@router.get("/")
def get_speakers(event_id: int = None, db: Session = Depends(get_db)):
    query = db.query(Speaker)
    if event_id:
        query = query.filter(Speaker.event_id == event_id)
    return query.all()
