from sqlalchemy import Column, Integer, String, Enum as SQLEnum, ForeignKey, DateTime, Time
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func
from app.database import Base
import enum

class CheckInStatus(str, enum.Enum):
    CHECKED_IN = "checked-in"
    CHECKED_OUT = "checked-out"
    REJECTED = "rejected"

class AccessLog(Base):
    __tablename__ = "access_logs"
    
    id = Column(Integer, primary_key=True, index=True)
    ticket_id = Column(String(50), ForeignKey("tickets.ticket_id"))
    attendee_name = Column(String(255))
    event_id = Column(Integer, ForeignKey("events.id"))
    gate = Column(String(100))
    check_in_time = Column(Time)
    status = Column(SQLEnum(CheckInStatus))
    created_at = Column(DateTime, server_default=func.now())
    
    ticket = relationship("Ticket")
    event = relationship("Event")
