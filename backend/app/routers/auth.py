from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from app import schemas, crud, models
from app.database import get_db
from app.security import (
    verify_password,
    create_access_token,
    get_current_user
)

router = APIRouter()

@router.post("/register", response_model=schemas.TokenPair, status_code=status.HTTP_201_CREATED)
def register(payload: schemas.UserRegister, db: Session = Depends(get_db)):
    existing = crud.get_user_by_email(db, payload.email)
    if existing:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Пользователь с таким email уже зарегистрирован"
        )
    user = crud.create_user(db, payload)
    access_token = create_access_token(user.id, user.email)
    refresh_token = crud.create_refresh_token_record(db, user.id)

    return schemas.TokenPair(
        access_token=access_token,
        refresh_token=refresh_token,
        user=schemas.UserResponse.model_validate(user)
    )

@router.post("/login", response_model=schemas.TokenPair)
def login(payload: schemas.UserLogin, db: Session = Depends(get_db)):
    user = crud.get_user_by_email(db, payload.email)
    if not user or not verify_password(payload.password, user.hashed_password):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Неверный email или пароль"
        )
    access_token = create_access_token(user.id, user.email)
    refresh_token = crud.create_refresh_token_record(db, user.id)

    return schemas.TokenPair(
        access_token=access_token,
        refresh_token=refresh_token,
        user=schemas.UserResponse.model_validate(user)
    )

@router.post("/refresh", response_model=schemas.AccessTokenResponse)
def refresh_access_token(payload: schemas.RefreshTokenRequest, db: Session = Depends(get_db)):
    db_token = crud.get_valid_refresh_token(db, payload.refresh_token)
    if not db_token:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Некорректный, истёкший или отозванный refresh-токен"
        )
    user = db_token.user
    new_access_token = create_access_token(user.id, user.email)
    return schemas.AccessTokenResponse(access_token=new_access_token)

@router.post("/logout")
def logout(payload: schemas.RefreshTokenRequest, db: Session = Depends(get_db)):
    crud.revoke_refresh_token(db, payload.refresh_token)
    return {"status": "ok", "message": "Сессия успешно завершена, токен отозван"}

@router.get("/me", response_model=schemas.UserResponse)
def get_me(current_user: models.User = Depends(get_current_user)):
    return current_user
