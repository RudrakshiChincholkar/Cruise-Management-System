from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.config import settings
from app.database import engine, Base
from app.routers import auth, events, venues, bookings, tickets, staff, vendors, speakers, inventory, access_control, analytics

# Create tables
Base.metadata.create_all(bind=engine)

app = FastAPI(title="Convention Centre API", version="1.0.0")

# CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=[settings.FRONTEND_URL, "http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include routers
app.include_router(auth.router, prefix="/api/auth", tags=["Authentication"])
app.include_router(events.router, prefix="/api/events", tags=["Events"])
app.include_router(venues.router, prefix="/api/venues", tags=["Venues"])
app.include_router(bookings.router, prefix="/api/bookings", tags=["Bookings"])
app.include_router(tickets.router, prefix="/api/tickets", tags=["Tickets"])
app.include_router(staff.router, prefix="/api/staff", tags=["Staff"])
app.include_router(vendors.router, prefix="/api/vendors", tags=["Vendors"])
app.include_router(speakers.router, prefix="/api/speakers", tags=["Speakers"])
app.include_router(inventory.router, prefix="/api/inventory", tags=["Inventory"])
app.include_router(access_control.router, prefix="/api/access", tags=["Access Control"])
app.include_router(analytics.router, prefix="/api/analytics", tags=["Analytics"])

@app.get("/")
def root():
    return {"message": "Convention Centre API", "version": "1.0.0"}

@app.get("/health")
def health_check():
    return {"status": "healthy"}

