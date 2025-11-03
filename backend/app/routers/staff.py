from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from typing import List
from app.database import get_db
from app.models.staff import Staff

router = APIRouter()

@router.get("/")
def get_staff(db: Session = Depends(get_db)):
    staff = db.query(Staff).all()
    return staff

