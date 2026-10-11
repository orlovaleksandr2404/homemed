from datetime import date
from pydantic import BaseModel, ConfigDict

class MedicationBase(BaseModel):
    name: str
    category: str
    dosage: str
    quantity: int
    expiry_date: date

class MedicationCreate(MedicationBase):
    pass

class MedicationUpdate(BaseModel):
    name: str | None = None
    category: str | None = None
    dosage: str | None = None
    quantity: int | None = None
    expiry_date: date | None = None

class MedicationResponse(MedicationBase):
    id: int
    model_config = ConfigDict(from_attributes=True)

class ShelterBase(BaseModel):
    name: str
    address: str
    phone: str
    description: str | None = None

class ShelterCreate(ShelterBase):
    pass

class ShelterUpdate(BaseModel):
    name: str | None = None
    address: str | None = None
    phone: str | None = None
    description: str | None = None

class ShelterResponse(ShelterBase):
    id: int
    model_config = ConfigDict(from_attributes=True)

class DonationBase(BaseModel):
    medication_id: int
    shelter_id: int
    quantity: int
    donation_date: date
    status: str = "planned"

class DonationCreate(DonationBase):
    pass

class DonationUpdate(BaseModel):
    quantity: int | None = None
    donation_date: date | None = None
    status: str | None = None

class DonationResponse(DonationBase):
    id: int
    medication: MedicationResponse
    shelter: ShelterResponse
    model_config = ConfigDict(from_attributes=True)
