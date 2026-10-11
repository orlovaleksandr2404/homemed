from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from app import schemas, crud
from app.database import get_db

router = APIRouter()

@router.get("/", response_model=list[schemas.DonationResponse])
def read_donations(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    return crud.get_donations(db, skip=skip, limit=limit)

@router.get("/{donation_id}", response_model=schemas.DonationResponse)
def read_donation(donation_id: int, db: Session = Depends(get_db)):
    item = crud.get_donation(db, donation_id)
    if not item:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Donation not found")
    return item

@router.post("/", response_model=schemas.DonationResponse, status_code=status.HTTP_201_CREATED)
def create_donation(payload: schemas.DonationCreate, db: Session = Depends(get_db)):
    item = crud.create_donation(db, payload)
    if not item:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Invalid medication_id or shelter_id")
    return item

@router.patch("/{donation_id}", response_model=schemas.DonationResponse)
def update_donation(donation_id: int, payload: schemas.DonationUpdate, db: Session = Depends(get_db)):
    item = crud.update_donation(db, donation_id, payload)
    if not item:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Donation not found")
    return item

@router.delete("/{donation_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_donation(donation_id: int, db: Session = Depends(get_db)):
    item = crud.delete_donation(db, donation_id)
    if not item:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Donation not found")
