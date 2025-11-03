from sqlalchemy import Column, Integer, String, Enum as SQLEnum
from app.database import Base
import enum

class StaffStatus(str, enum.Enum):
    ACTIVE = "active"
    INACTIVE = "inactive"
    ON_LEAVE = "on-leave"

class Staff(Base):
    __tablename__ = "staff"
    
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(255), nullable=False)
    role = Column(String(100), nullable=False)
    email = Column(String(255), unique=True)
    phone = Column(String(20))
    status = Column(SQLEnum(StaffStatus), default=StaffStatus.ACTIVE)
    assigned_events = Column(Integer, default=0)

