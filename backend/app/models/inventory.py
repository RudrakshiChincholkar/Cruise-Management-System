from sqlalchemy import Column, Integer, String, Enum as SQLEnum, ForeignKey, DateTime
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func
from app.database import Base
import enum

class EquipmentCategory(str, enum.Enum):
    AV_EQUIPMENT = "AV Equipment"
    FURNITURE = "Furniture"
    EXHIBITION = "Exhibition"
    OTHER = "Other"

class SupplyStatus(str, enum.Enum):
    SUFFICIENT = "sufficient"
    LOW = "low"
    CRITICAL = "critical"

class BookingStatus(str, enum.Enum):
    PENDING = "pending"
    APPROVED = "approved"
    REJECTED = "rejected"
    FULFILLED = "fulfilled"

class Equipment(Base):
    __tablename__ = "equipment"
    
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(255), nullable=False)
    category = Column(SQLEnum(EquipmentCategory))
    total_quantity = Column(Integer, nullable=False)
    available_quantity = Column(Integer, nullable=False)
    in_use_quantity = Column(Integer, default=0)
    maintenance_quantity = Column(Integer, default=0)
    location = Column(String(255))

class Supply(Base):
    __tablename__ = "supplies"
    
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(255), nullable=False)
    quantity = Column(Integer, nullable=False)
    unit = Column(String(50))
    reorder_level = Column(Integer)
    status = Column(SQLEnum(SupplyStatus), default=SupplyStatus.SUFFICIENT)

class InventoryBooking(Base):
    __tablename__ = "inventory_bookings"
    
    id = Column(Integer, primary_key=True, index=True)
    event_id = Column(Integer, ForeignKey("events.id"))
    requested_by_id = Column(Integer, ForeignKey("users.id"))
    requested_by_name = Column(String(255))
    items_description = Column(String(1000))
    booking_date = Column(String(100))
    status = Column(SQLEnum(BookingStatus), default=BookingStatus.PENDING)
    created_at = Column(DateTime, server_default=func.now())
    
    event = relationship("Event")
    requested_by = relationship("User")
