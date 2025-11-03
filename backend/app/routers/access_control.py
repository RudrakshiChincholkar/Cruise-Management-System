from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from datetime import datetime
from app.database import get_db
from app.models.access_log import AccessLog
from app.models.ticket import Ticket

router = APIRouter()

@router.post("/scan/{ticket_id}")
def scan_ticket(ticket_id: str, gate: str, db: Session = Depends(get_db)):
    ticket = db.query(Ticket).filter(Ticket.ticket_id == ticket_id).first()
    if not ticket:
        raise HTTPException(status_code=404, detail="Invalid ticket")
    
    if ticket.status != "confirmed":
        raise HTTPException(status_code=400, detail="Ticket not valid")
    
    access_log = AccessLog(
        ticket_id=ticket_id,
        attendee_name=ticket.attendee_name,
        event_id=ticket.event_id,
        gate=gate,
        check_in_time=datetime.now().time(),
        status="checked-in"
    )
    
    db.add(access_log)
    db.commit()
    
    return {"message": "Check-in successful", "attendee": ticket.attendee_name}

@router.get("/logs")
def get_access_logs(event_id: int = None, db: Session = Depends(get_db)):
    query = db.query(AccessLog)
    if event_id:
        query = query.filter(AccessLog.event_id == event_id)
    logs = query.order_by(AccessLog.created_at.desc()).limit(100).all()
    return logs
