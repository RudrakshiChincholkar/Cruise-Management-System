from pydantic import BaseModel
from datetime import date, time
from typing import Optional

class BookingCreate(BaseModel):
    event_name: str
    venue_id: int
    organizer_name: str
    booking_date: date
    start_time: Optional[time] = None
    end_time: Optional[time] = None
    expected_attendees: Optional[int] = None

class BookingResponse(BookingCreate):
    id: int
    status: str
    organizer_id: int
    
    class Config:
        from_attributes = True
