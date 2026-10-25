from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from app import schemas, crud, models
from app.database import get_db
from app.security import get_current_user

router = APIRouter()

@router.get("/", response_model=list[schemas.ShelterResponse])
def read_shelters(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    return crud.get_shelters(db, skip=skip, limit=limit)

@router.get("/{shelter_id}", response_model=schemas.ShelterResponse)
def read_shelter(shelter_id: int, db: Session = Depends(get_db)):
    item = crud.get_shelter(db, shelter_id)
    if not item:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Приют не найден")
    return item

@router.post("/", response_model=schemas.ShelterResponse, status_code=status.HTTP_201_CREATED)
def create_shelter(
    payload: schemas.ShelterCreate,
    db: Session = Depends(get_db),
    current_user: models.User = Depends(get_current_user)
):
    return crud.create_shelter(db, payload)

@router.delete("/{shelter_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_shelter(
    shelter_id: int,
    db: Session = Depends(get_db),
    current_user: models.User = Depends(get_current_user)
):
    item = crud.delete_shelter(db, shelter_id)
    if not item:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Приют не найден")
