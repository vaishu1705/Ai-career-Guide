import os
from datetime import timedelta

from dotenv import load_dotenv

load_dotenv()


class Config:
    """Application configuration loaded from environment variables."""

    MONGO_URI = os.getenv("MONGO_URI")
    SECRET_KEY = os.getenv("SECRET_KEY", "change-me")
    JWT_SECRET = os.getenv("JWT_SECRET", "change-me-too")
    JWT_ALGORITHM = "HS256"
    JWT_EXPIRES = timedelta(days=int(os.getenv("JWT_EXPIRES_DAYS", "7")))

    UPLOAD_FOLDER = os.path.join(os.path.dirname(os.path.abspath(__file__)), "uploads")
    MAX_CONTENT_LENGTH = 8 * 1024 * 1024  # 8 MB

    CORS_ORIGINS = [o.strip() for o in os.getenv("CORS_ORIGINS", "*").split(",")]

    @staticmethod
    def validate():
        if not Config.MONGO_URI:
            raise RuntimeError(
                "MONGO_URI is not set. Copy .env.example to .env and add your "
                "MongoDB Atlas connection string."
            )
