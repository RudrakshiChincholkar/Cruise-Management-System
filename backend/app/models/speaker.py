from sqlalchemy import Column, Integer, String, Float, Text, Enum as SQLEnum, ForeignKey
from sqlalchemy.orm import relationship
from app.database import Base
import enum

class SpeakerStatus(str, enum.Enum):
    PENDING = "pending"
    CONFIRMED = "confirmed"
    CANCELLED = "cancelled"

class Speaker(Base):
    __tablename__ = "speakers"
    
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(255), nullable=False)
    title = Column(String(255))
    company = Column(String(255))
    bio = Column(Text)
    topic = Column(String(500))
    event_id = Column(Integer, ForeignKey("events.id"))
    email = Column(String(255))
    rating = Column(Float)
    past_sessions = Column(Integer, default=0)
    status = Column(SQLEnum(SpeakerStatus), default=SpeakerStatus.PENDING)
    
    event = relationship("Event")

