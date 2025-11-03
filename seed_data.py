from app.database import SessionLocal, engine, Base
from app.models import *
from app.utils.security import get_password_hash

# Create all tables
Base.metadata.create_all(bind=engine)

db = SessionLocal()

# Create default venues
venues_data = [
    {
        "name": "Grand Exhibition Hall",
        "capacity": 5000,
        "size": "50,000 sq ft",
        "size_sqft": 50000,
        "image_url": "https://images.unsplash.com/photo-1676973694580-2fca4513e6e1",
        "description": "Our largest venue perfect for exhibitions and conferences"
    },
    {
        "name": "Executive Conference Center",
        "capacity": 500,
        "size": "8,000 sq ft",
        "size_sqft": 8000,
        "image_url": "https://images.unsplash.com/photo-1591425609338-eb875e0a0fb9",
        "description": "Professional conference space with state-of-the-art facilities"
    },
    {
        "name": "Premium Event Space",
        "capacity": 300,
        "size": "5,000 sq ft",
        "size_sqft": 5000,
        "image_url": "https://images.unsplash.com/photo-1540575467063-178a50c2df87",
        "description": "Elegant space for corporate events and gatherings"
    }
]

for venue_data in venues_data:
    venue = db.query(Venue).filter(Venue.name == venue_data["name"]).first()
    if not venue:
        venue = Venue(**venue_data)
        db.add(venue)

# Create default users
users_data = [
    {
        "email": "organizer@test.com",
        "password": "password123",
        "full_name": "John Organizer",
        "role": "organizer",
        "phone": "+1234567890"
    },
    {
        "email": "attendee@test.com",
        "password": "password123",
        "full_name": "Jane Attendee",
        "role": "attendee",
        "phone": "+1234567891"
    }
]

for user_data in users_data:
    user = db.query(User).filter(User.email == user_data["email"]).first()
    if not user:
        user = User(
            email=user_data["email"],
            hashed_password=get_password_hash(user_data["password"]),
            full_name=user_data["full_name"],
            role=user_data["role"],
            phone=user_data["phone"]
        )
        db.add(user)

# Create sample staff
staff_data = [
    {"name": "Michael Chen", "role": "Event Coordinator", "email": "michael.chen@conventionhub.com", "phone": "+1234567892", "status": "active", "assigned_events": 3},
    {"name": "Sarah Johnson", "role": "Technical Support", "email": "sarah.j@conventionhub.com", "phone": "+1234567893", "status": "active", "assigned_events": 5},
    {"name": "David Martinez", "role": "Security Lead", "email": "d.martinez@conventionhub.com", "phone": "+1234567894", "status": "on-leave", "assigned_events": 0}
]

for staff_member in staff_data:
    staff = db.query(Staff).filter(Staff.email == staff_member["email"]).first()
    if not staff:
        staff = Staff(**staff_member)
        db.add(staff)

# Create sample vendors
vendors_data = [
    {"company": "Elite Catering Services", "contact_person": "Jennifer White", "category": "Catering", "email": "info@elitecatering.com", "phone": "+1555111222", "rating": 4.9, "events_serviced": 15},
    {"company": "ProAV Solutions", "contact_person": "Robert Lee", "category": "Audio/Visual", "email": "contact@proav.com", "phone": "+1555333444", "rating": 4.7, "events_serviced": 22},
    {"company": "Decor Masters", "contact_person": "Lisa Anderson", "category": "Decoration", "email": "hello@decormasters.com", "phone": "+1555555666", "rating": 4.8, "events_serviced": 18}
]

for vendor_data in vendors_data:
    vendor = db.query(Vendor).filter(Vendor.email == vendor_data["email"]).first()
    if not vendor:
        vendor = Vendor(**vendor_data)
        db.add(vendor)

# Create sample equipment
equipment_data = [
    {"name": "Projector - 4K HD", "category": "AV Equipment", "total_quantity": 20, "available_quantity": 12, "in_use_quantity": 7, "maintenance_quantity": 1, "location": "Equipment Room A"},
    {"name": "Wireless Microphone Set", "category": "AV Equipment", "total_quantity": 50, "available_quantity": 35, "in_use_quantity": 15, "maintenance_quantity": 0, "location": "Equipment Room A"},
    {"name": "Conference Chair", "category": "Furniture", "total_quantity": 500, "available_quantity": 200, "in_use_quantity": 300, "maintenance_quantity": 0, "location": "Storage Area B"},
    {"name": "Exhibition Booth Kit", "category": "Exhibition", "total_quantity": 100, "available_quantity": 45, "in_use_quantity": 50, "maintenance_quantity": 5, "location": "Storage Area C"}
]

for equip_data in equipment_data:
    equipment = db.query(Equipment).filter(Equipment.name == equip_data["name"]).first()
    if not equipment:
        equipment = Equipment(**equip_data)
        db.add(equipment)

# Create sample supplies
supplies_data = [
    {"name": "Name Badges", "quantity": 5000, "unit": "pcs", "reorder_level": 1000, "status": "sufficient"},
    {"name": "Lanyards", "quantity": 800, "unit": "pcs", "reorder_level": 1000, "status": "low"},
    {"name": "Signage Boards", "quantity": 150, "unit": "pcs", "reorder_level": 50, "status": "sufficient"},
    {"name": "Registration Forms", "quantity": 300, "unit": "pcs", "reorder_level": 500, "status": "critical"}
]

for supply_data in supplies_data:
    supply = db.query(Supply).filter(Supply.name == supply_data["name"]).first()
    if not supply:
        supply = Supply(**supply_data)
        db.add(supply)

db.commit()
db.close()

print("Database seeded successfully!")
print("\nTest Credentials:")
print("Organizer - Email: organizer@test.com, Password: password123")
print("Attendee - Email: attendee@test.com, Password: password123")

