from sqlalchemy import Column, Integer, String, Float, Enum as SQLEnum, ForeignKey, DateTime
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func
from app.database import Base
import enum

class TicketStatus(str, enum.Enum):
    ACTIVE = "active"
    SOLD_OUT = "sold-out"

class RegistrationStatus(str, enum.Enum):
    PENDING = "pending"
    CONFIRMED = "confirmed"
    CANCELLED = "cancelled"

class TicketType(Base):
    __tablename__ = "ticket_types"
    
    id = Column(Integer, primary_key=True, index=True)
    event_id = Column(Integer, ForeignKey("events.id"))
    name = Column(String(255), nullable=False)
    price = Column(Float, nullable=False)
    total_quantity = Column(Integer, nullable=False)
    sold_quantity = Column(Integer, default=0)
    status = Column(SQLEnum(TicketStatus), default=TicketStatus.ACTIVE)
    
    event = relationship("Event")

class Ticket(Base):
    __tablename__ = "tickets"
    
    id = Column(Integer, primary_key=True, index=True)
    ticket_id = Column(String(50), unique=True, index=True, nullable=False)
    ticket_type_id = Column(Integer, ForeignKey("ticket_types.id"))
    event_id = Column(Integer, ForeignKey("events.id"))
    attendee_id = Column(Integer, ForeignKey("users.id"))
    attendee_name = Column(String(255))
    attendee_email = Column(String(255))
    price = Column(Float)
    status = Column(SQLEnum(RegistrationStatus), default=RegistrationStatus.PENDING)
    purchase_date = Column(DateTime, server_default=func.now())
    
    ticket_type = relationship("TicketType")
    event = relationship("Event")
    attendee = relationship("User")
