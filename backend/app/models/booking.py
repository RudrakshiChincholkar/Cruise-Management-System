from sqlalchemy import Column, Integer, String, Date, Time, Enum as SQLEnum, ForeignKey, DateTime
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func
from app.database import Base
import enum

class BookingStatus(str, enum.Enum):
    PENDING = "pending"
    CONFIRMED = "confirmed"
    CANCELLED = "cancelled"

class Booking(Base):
    __tablename__ = "bookings"
    
    id = Column(Integer, primary_key=True, index=True)
    event_name = Column(String(255), nullable=False)
    venue_id = Column(Integer, ForeignKey("venues.id"))
    organizer_id = Column(Integer, ForeignKey("users.id"))
    organizer_name = Column(String(255))
    booking_date = Column(Date, nullable=False)
    start_time = Column(Time)
    end_time = Column(Time)
    expected_attendees = Column(Integer)
    status = Column(SQLEnum(BookingStatus), default=BookingStatus.PENDING)
    created_at = Column(DateTime, server_default=func.now())
    
    venue = relationship("Venue")
    organizer = relationship("User")

