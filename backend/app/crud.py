from sqlalchemy.orm import Session
from app import models, schemas

def get_medications(db: Session, skip: int = 0, limit: int = 100):
    return db.query(models.Medication).offset(skip).limit(limit).all()

def get_medication(db: Session, medication_id: int):
    return db.query(models.Medication).filter(models.Medication.id == medication_id).first()

def create_medication(db: Session, item: schemas.MedicationCreate):
    db_item = models.Medication(**item.model_dump())
    db.add(db_item)
    db.commit()
    db.refresh(db_item)
    return db_item

def update_medication(db: Session, medication_id: int, item: schemas.MedicationUpdate):
    db_item = get_medication(db, medication_id)
    if not db_item:
        return None
    for field, value in item.model_dump(exclude_unset=True).items():
        setattr(db_item, field, value)
    db.commit()
    db.refresh(db_item)
    return db_item

def delete_medication(db: Session, medication_id: int):
    db_item = get_medication(db, medication_id)
    if not db_item:
        return None
    db.delete(db_item)
    db.commit()
    return db_item

def get_shelters(db: Session, skip: int = 0, limit: int = 100):
    return db.query(models.Shelter).offset(skip).limit(limit).all()

def get_shelter(db: Session, shelter_id: int):
    return db.query(models.Shelter).filter(models.Shelter.id == shelter_id).first()

def create_shelter(db: Session, item: schemas.ShelterCreate):
    db_item = models.Shelter(**item.model_dump())
    db.add(db_item)
    db.commit()
    db.refresh(db_item)
    return db_item

def update_shelter(db: Session, shelter_id: int, item: schemas.ShelterUpdate):
    db_item = get_shelter(db, shelter_id)
    if not db_item:
        return None
    for field, value in item.model_dump(exclude_unset=True).items():
        setattr(db_item, field, value)
    db.commit()
    db.refresh(db_item)
    return db_item

def delete_shelter(db: Session, shelter_id: int):
    db_item = get_shelter(db, shelter_id)
    if not db_item:
        return None
    db.delete(db_item)
    db.commit()
    return db_item

def get_donations(db: Session, skip: int = 0, limit: int = 100):
    return db.query(models.Donation).offset(skip).limit(limit).all()

def get_donation(db: Session, donation_id: int):
    return db.query(models.Donation).filter(models.Donation.id == donation_id).first()

def create_donation(db: Session, item: schemas.DonationCreate):
    medication = get_medication(db, item.medication_id)
    shelter = get_shelter(db, item.shelter_id)
    if not medication or not shelter:
        return None
    db_item = models.Donation(**item.model_dump())
    db.add(db_item)
    db.commit()
    db.refresh(db_item)
    return db_item

def update_donation(db: Session, donation_id: int, item: schemas.DonationUpdate):
    db_item = get_donation(db, donation_id)
    if not db_item:
        return None
    for field, value in item.model_dump(exclude_unset=True).items():
        setattr(db_item, field, value)
    db.commit()
    db.refresh(db_item)
    return db_item

def delete_donation(db: Session, donation_id: int):
    db_item = get_donation(db, donation_id)
    if not db_item:
        return None
    db.delete(db_item)
    db.commit()
    return db_item
