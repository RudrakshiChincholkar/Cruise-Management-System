from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.database import get_db
from app.models.inventory import Equipment, Supply, InventoryBooking

router = APIRouter()

@router.get("/equipment")
def get_equipment(db: Session = Depends(get_db)):
    equipment = db.query(Equipment).all()
    return equipment

@router.get("/supplies")
def get_supplies(db: Session = Depends(get_db)):
    supplies = db.query(Supply).all()
    return supplies

@router.get("/bookings")
def get_inventory_bookings(db: Session = Depends(get_db)):
    bookings = db.query(InventoryBooking).all()
    return bookings
