from datetime import datetime, timedelta
from sqlalchemy.orm import Session
from app import models, schemas
from app.config import settings
from app.security import hash_password, generate_refresh_token_string

def get_user_by_email(db: Session, email: str):
    return db.query(models.User).filter(models.User.email == email).first()

def get_user_by_id(db: Session, user_id: int):
    return db.query(models.User).filter(models.User.id == user_id).first()

def create_user(db: Session, item: schemas.UserRegister):
    hashed_pwd = hash_password(item.password)
    db_user = models.User(
        email=item.email,
        hashed_password=hashed_pwd,
        full_name=item.full_name
    )
    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    return db_user

def create_refresh_token_record(db: Session, user_id: int) -> str:
    token_str = generate_refresh_token_string()
    expires_at = datetime.utcnow() + timedelta(days=settings.REFRESH_TOKEN_EXPIRE_DAYS)
    db_token = models.RefreshToken(
        token=token_str,
        user_id=user_id,
        expires_at=expires_at,
        revoked=False
    )
    db.add(db_token)
    db.commit()
    return token_str

def get_valid_refresh_token(db: Session, token_str: str):
    return db.query(models.RefreshToken).filter(
        models.RefreshToken.token == token_str,
        models.RefreshToken.revoked == False,
        models.RefreshToken.expires_at > datetime.utcnow()
    ).first()

def revoke_refresh_token(db: Session, token_str: str):
    db_token = db.query(models.RefreshToken).filter(models.RefreshToken.token == token_str).first()
    if db_token:
        db_token.revoked = True
        db.commit()
        return True
    return False

def get_medications(db: Session, user_id: int, skip: int = 0, limit: int = 100):
    return db.query(models.Medication).filter(
        models.Medication.user_id == user_id
    ).offset(skip).limit(limit).all()

def get_medication(db: Session, medication_id: int):
    return db.query(models.Medication).filter(models.Medication.id == medication_id).first()

def create_medication(db: Session, item: schemas.MedicationCreate, user_id: int):
    db_item = models.Medication(**item.model_dump(), user_id=user_id)
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

def get_donations(db: Session, user_id: int, skip: int = 0, limit: int = 100):
    return db.query(models.Donation).filter(
        models.Donation.user_id == user_id
    ).offset(skip).limit(limit).all()

def get_donation(db: Session, donation_id: int):
    return db.query(models.Donation).filter(models.Donation.id == donation_id).first()

def create_donation(db: Session, item: schemas.DonationCreate, user_id: int):
    medication = get_medication(db, item.medication_id)
    shelter = get_shelter(db, item.shelter_id)
    if not medication or not shelter or medication.user_id != user_id:
        return None
    db_item = models.Donation(**item.model_dump(), user_id=user_id)
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
