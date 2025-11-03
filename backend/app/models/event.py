from sqlalchemy import Column, Integer, String, Date, Time, Enum as SQLEnum, ForeignKey
from sqlalchemy.orm import relationship
from app.database import Base
import enum

class EventStatus(str, enum.Enum):
    DRAFT = "draft"
    PUBLISHED = "published"
    ONGOING = "ongoing"
    COMPLETED = "completed"
    CANCELLED = "cancelled"

class Event(Base):
    __tablename__ = "events"
    
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(255), nullable=False)
    description = Column(String(2000))
    category = Column(String(100))
    venue_id = Column(Integer, ForeignKey("venues.id"))
    start_date = Column(Date, nullable=False)
    end_date = Column(Date)
    start_time = Column(Time)
    end_time = Column(Time)
    expected_attendees = Column(Integer)
    status = Column(SQLEnum(EventStatus), default=EventStatus.DRAFT)
    organizer_id = Column(Integer, ForeignKey("users.id"))
    
    venue = relationship("Venue")
    organizer = relationship("User")
