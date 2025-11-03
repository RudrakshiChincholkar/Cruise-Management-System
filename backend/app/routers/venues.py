from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from typing import List
from app.database import get_db
from app.models.venue import Venue
from app.schemas.venue import VenueResponse

router = APIRouter()

@router.get("/", response_model=List[VenueResponse])
def get_venues(db: Session = Depends(get_db)):
    venues = db.query(Venue).all()
    return venues

@router.get("/{venue_id}", response_model=VenueResponse)
def get_venue(venue_id: int, db: Session = Depends(get_db)):
    venue = db.query(Venue).filter(Venue.id == venue_id).first()
    if not venue:
        raise HTTPException(status_code=404, detail="Venue not found")
    return venue
