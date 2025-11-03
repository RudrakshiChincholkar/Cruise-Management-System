from pydantic import BaseModel, EmailStr
from typing import Optional

class TicketTypeCreate(BaseModel):
    event_id: int
    name: str
    price: float
    total_quantity: int

class TicketTypeResponse(TicketTypeCreate):
    id: int
    sold_quantity: int
    status: str
    
    class Config:
        from_attributes = True

class TicketCreate(BaseModel):
    ticket_type_id: int
    event_id: int
    attendee_name: str
    attendee_email: EmailStr

class TicketResponse(BaseModel):
    id: int
    ticket_id: str
    ticket_type_id: int
    event_id: int
    attendee_name: str
    attendee_email: str
    price: float
    status: str
    
    class Config:
        from_attributes = True

