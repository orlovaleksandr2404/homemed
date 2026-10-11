from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.database import Base, engine
from app.routers import medications, shelters, donations

Base.metadata.create_all(bind=engine)

app = FastAPI(title="HomeMed API", version="1.0.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(medications.router, prefix="/api/medications", tags=["Medications"])
app.include_router(shelters.router, prefix="/api/shelters", tags=["Shelters"])
app.include_router(donations.router, prefix="/api/donations", tags=["Donations"])

@app.get("/")
def root():
    return {"status": "ok", "message": "HomeMed API is running"}
