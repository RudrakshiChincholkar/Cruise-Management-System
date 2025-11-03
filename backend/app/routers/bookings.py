from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List
from app.database import get_db
from app.models.booking import Booking
from app.models.user import User
from app.schemas.booking import BookingCreate, BookingResponse
from app.utils.dependencies import get_current_user

router = APIRouter()

@router.get("/", response_model=List[BookingResponse])
def get_bookings(
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    if current_user.role == "organizer":
        bookings = db.query(Booking).filter(Booking.organizer_id == current_user.id).all()
    else:
        bookings = db.query(Booking).all()
    return bookings

@router.post("/", response_model=BookingResponse)
def create_booking(
    booking: BookingCreate,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    db_booking = Booking(**booking.dict(), organizer_id=current_user.id)
    db.add(db_booking)
    db.commit()
    db.refresh(db_booking)
    return db_booking

@router.put("/{booking_id}/status")
def update_booking_status(
    booking_id: int,
    status: str,
    db: Session = Depends(get_db)
):
    booking = db.query(Booking).filter(Booking.id == booking_id).first()
    if not booking:
        raise HTTPException(status_code=404, detail="Booking not found")
    
    booking.status = status
    db.commit()
    return {"message": "Booking status updated"}

