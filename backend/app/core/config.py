import os
from pydantic_settings import BaseSettings

class Settings(BaseSettings):
    PROJECT_NAME: str = "Hospital Operations AI"
    DATABASE_URL: str = os.getenv("DATABASE_URL", "sqlite:///./hospital.db")
    REDIS_URL: str = os.getenv("REDIS_URL", "redis://localhost:6379/0")
    SECRET_KEY: str = os.getenv("SECRET_KEY", "supersecretkey")
    DEBUG: bool = True

settings = Settings()
