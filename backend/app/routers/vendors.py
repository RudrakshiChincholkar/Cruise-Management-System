from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from typing import List
from app.database import get_db
from app.models.vendor import Vendor

router = APIRouter()

@router.get("/")
def get_vendors(db: Session = Depends(get_db)):
    vendors = db.query(Vendor).all()
    return vendors
