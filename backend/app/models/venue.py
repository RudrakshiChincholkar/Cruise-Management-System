from sqlalchemy import Column, Integer, String, Float
from app.database import Base

class Venue(Base):
    __tablename__ = "venues"
    
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(255), nullable=False)
    capacity = Column(Integer, nullable=False)
    size = Column(String(50))
    size_sqft = Column(Float)
    image_url = Column(String(500))
    description = Column(String(1000))
