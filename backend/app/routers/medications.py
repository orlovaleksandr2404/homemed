from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from app import schemas, crud
from app.database import get_db

router = APIRouter()

@router.get("/", response_model=list[schemas.MedicationResponse])
def read_medications(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    return crud.get_medications(db, skip=skip, limit=limit)

@router.get("/{medication_id}", response_model=schemas.MedicationResponse)
def read_medication(medication_id: int, db: Session = Depends(get_db)):
    item = crud.get_medication(db, medication_id)
    if not item:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Medication not found")
    return item

@router.post("/", response_model=schemas.MedicationResponse, status_code=status.HTTP_201_CREATED)
def create_medication(payload: schemas.MedicationCreate, db: Session = Depends(get_db)):
    return crud.create_medication(db, payload)

@router.patch("/{medication_id}", response_model=schemas.MedicationResponse)
def update_medication(medication_id: int, payload: schemas.MedicationUpdate, db: Session = Depends(get_db)):
    item = crud.update_medication(db, medication_id, payload)
    if not item:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Medication not found")
    return item

@router.delete("/{medication_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_medication(medication_id: int, db: Session = Depends(get_db)):
    item = crud.delete_medication(db, medication_id)
    if not item:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Medication not found")
