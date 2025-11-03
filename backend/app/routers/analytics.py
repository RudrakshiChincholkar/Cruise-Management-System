from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from sqlalchemy import func
from app.database import get_db
from app.models.event import Event
from app.models.ticket import Ticket, TicketType
from app.models.booking import Booking

router = APIRouter()

@router.get("/dashboard")
def get_analytics_dashboard(db: Session = Depends(get_db)):
    total_events = db.query(func.count(Event.id)).scalar()
    total_bookings = db.query(func.count(Booking.id)).scalar()
    total_tickets_sold = db.query(func.count(Ticket.id)).filter(Ticket.status == "confirmed").scalar()
    total_revenue = db.query(func.sum(Ticket.price)).filter(Ticket.status == "confirmed").scalar() or 0
    
    return {
        "total_events": total_events,
        "total_bookings": total_bookings,
        "total_tickets_sold": total_tickets_sold,
        "total_revenue": float(total_revenue)
    }

@router.get("/revenue-by-month")
def get_revenue_by_month(db: Session = Depends(get_db)):
    # Simplified version - you can enhance this with actual monthly aggregation
    return [
        {"month": "Jun", "revenue": 45000, "bookings": 12},
        {"month": "Jul", "revenue": 52000, "bookings": 15},
        {"month": "Aug", "revenue": 48000, "bookings": 13},
        {"month": "Sep", "revenue": 65000, "bookings": 18},
        {"month": "Oct", "revenue": 78000, "bookings": 22},
        {"month": "Nov", "revenue": 70000, "bookings": 19}
    ]

