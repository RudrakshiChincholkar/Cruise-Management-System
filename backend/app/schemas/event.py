from pydantic import BaseModel
from typing import Optional
from datetime import date, time

class EventBase(BaseModel):
    name: str
    description: Optional[str] = None
    category: Optional[str] = None
    venue_id: int
    start_date: date
    end_date: Optional[date] = None
    start_time: Optional[time] = None
    end_time: Optional[time] = None
    expected_attendees: Optional[int] = None

class EventCreate(EventBase):
    pass

class EventResponse(EventBase):
    id: int
    status: str
    organizer_id: int
    
    class Config:
        from_attributes = True
