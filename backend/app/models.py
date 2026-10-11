from sqlalchemy import Column, Integer, String, Date, ForeignKey
from sqlalchemy.orm import relationship
from app.database import Base

class Medication(Base):
    __tablename__ = "medications"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, nullable=False)
    category = Column(String, nullable=False)
    dosage = Column(String, nullable=False)
    quantity = Column(Integer, nullable=False, default=1)
    expiry_date = Column(Date, nullable=False)

    donations = relationship("Donation", back_populates="medication", cascade="all, delete-orphan")

class Shelter(Base):
    __tablename__ = "shelters"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, nullable=False)
    address = Column(String, nullable=False)
    phone = Column(String, nullable=False)
    description = Column(String, nullable=True)

    donations = relationship("Donation", back_populates="shelter", cascade="all, delete-orphan")

class Donation(Base):
    __tablename__ = "donations"

    id = Column(Integer, primary_key=True, index=True)
    medication_id = Column(Integer, ForeignKey("medications.id", ondelete="CASCADE"), nullable=False)
    shelter_id = Column(Integer, ForeignKey("shelters.id", ondelete="CASCADE"), nullable=False)
    quantity = Column(Integer, nullable=False)
    donation_date = Column(Date, nullable=False)
    status = Column(String, nullable=False, default="planned")

    medication = relationship("Medication", back_populates="donations")
    shelter = relationship("Shelter", back_populates="donations")
