from sqlalchemy import Column, Integer, String, Float
from app.database import Base

class Vendor(Base):
    __tablename__ = "vendors"
    
    id = Column(Integer, primary_key=True, index=True)
    company = Column(String(255), nullable=False)
    contact_person = Column(String(255))
    category = Column(String(100))
    email = Column(String(255))
    phone = Column(String(20))
    rating = Column(Float)
    events_serviced = Column(Integer, default=0)

