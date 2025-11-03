from pydantic import BaseModel
from typing import Optional

class VenueResponse(BaseModel):
    id: int
    name: str
    capacity: int
    size: Optional[str] = None
    size_sqft: Optional[float] = None
    image_url: Optional[str] = None
    description: Optional[str] = None
    
    class Config:
        from_attributes = True
