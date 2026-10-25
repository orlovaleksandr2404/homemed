from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from app import schemas, crud, models
from app.database import get_db
from app.security import get_current_user

router = APIRouter()

@router.get("/", response_model=list[schemas.DonationResponse])
def read_donations(
    skip: int = 0,
    limit: int = 100,
    db: Session = Depends(get_db),
    current_user: models.User = Depends(get_current_user)
):
    return crud.get_donations(db, user_id=current_user.id, skip=skip, limit=limit)

@router.get("/{donation_id}", response_model=schemas.DonationResponse)
def read_donation(
    donation_id: int,
    db: Session = Depends(get_db),
    current_user: models.User = Depends(get_current_user)
):
    item = crud.get_donation(db, donation_id)
    if not item:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Пожертвование не найдено")
    if item.user_id != current_user.id:
        raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail="Нет доступа к чужой записи")
    return item

@router.post("/", response_model=schemas.DonationResponse, status_code=status.HTTP_201_CREATED)
def create_donation(
    payload: schemas.DonationCreate,
    db: Session = Depends(get_db),
    current_user: models.User = Depends(get_current_user)
):
    item = crud.create_donation(db, payload, user_id=current_user.id)
    if not item:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Некорректный medication_id (не принадлежит вам) или shelter_id"
        )
    return item

@router.delete("/{donation_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_donation(
    donation_id: int,
    db: Session = Depends(get_db),
    current_user: models.User = Depends(get_current_user)
):
    item = crud.get_donation(db, donation_id)
    if not item:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Пожертвование не найдено")
    if item.user_id != current_user.id:
        raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail="Нет доступа к чужой записи")
    crud.delete_donation(db, donation_id)
