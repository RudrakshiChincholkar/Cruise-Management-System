from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List
from datetime import datetime
import random
import string
from app.database import get_db
from app.models.ticket import Ticket, TicketType
from app.models.user import User
from app.schemas.ticket import TicketCreate, TicketResponse, TicketTypeCreate, TicketTypeResponse
from app.utils.dependencies import get_current_user

router = APIRouter()

def generate_ticket_id():
    return f"TKT-{datetime.now().year}-{''.join(random.choices(string.digits, k=6))}"

@router.get("/types", response_model=List[TicketTypeResponse])
def get_ticket_types(event_id: int = None, db: Session = Depends(get_db)):
    query = db.query(TicketType)
    if event_id:
        query = query.filter(TicketType.event_id == event_id)
    return query.all()

@router.post("/types", response_model=TicketTypeResponse)
def create_ticket_type(
    ticket_type: TicketTypeCreate,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    db_ticket_type = TicketType(**ticket_type.dict())
    db.add(db_ticket_type)
    db.commit()
    db.refresh(db_ticket_type)
    return db_ticket_type

@router.post("/", response_model=TicketResponse)
def purchase_ticket(
    ticket: TicketCreate,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    ticket_type = db.query(TicketType).filter(TicketType.id == ticket.ticket_type_id).first()
    if not ticket_type:
        raise HTTPException(status_code=404, detail="Ticket type not found")
    
    if ticket_type.sold_quantity >= ticket_type.total_quantity:
        raise HTTPException(status_code=400, detail="Tickets sold out")
    
    db_ticket = Ticket(
        ticket_id=generate_ticket_id(),
        ticket_type_id=ticket.ticket_type_id,
        event_id=ticket.event_id,
        attendee_id=current_user.id,
        attendee_name=ticket.attendee_name,
        attendee_email=ticket.attendee_email,
        price=ticket_type.price,
        status="confirmed"
    )
    
    ticket_type.sold_quantity += 1
    if ticket_type.sold_quantity >= ticket_type.total_quantity:
        ticket_type.status = "sold-out"
    
    db.add(db_ticket)
    db.commit()
    db.refresh(db_ticket)
    return db_ticket

@router.get("/my-tickets", response_model=List[TicketResponse])
def get_my_tickets(
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    tickets = db.query(Ticket).filter(Ticket.attendee_id == current_user.id).all()
    return tickets
