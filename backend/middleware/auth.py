"""JWT auth middleware."""

from functools import wraps

import jwt
from bson import ObjectId
from flask import current_app, g, request

from database import get_db
from utils.responses import error
from utils.timestamps import now


def create_token(user_id):
    payload = {
        "sub": str(user_id),
        "iat": now(),
        "exp": now() + current_app.config["JWT_EXPIRES"],
    }
    return jwt.encode(payload, current_app.config["JWT_SECRET"], algorithm=current_app.config["JWT_ALGORITHM"])


def decode_token(token):
    return jwt.decode(token, current_app.config["JWT_SECRET"], algorithms=[current_app.config["JWT_ALGORITHM"]])


def _bearer():
    header = request.headers.get("Authorization", "")
    if header.startswith("Bearer "):
        return header[7:].strip()
    return None


def token_required(fn):
    @wraps(fn)
    def wrapper(*args, **kwargs):
        token = _bearer()
        if not token:
            return error("Authorization token missing", 401)
        try:
            payload = decode_token(token)
        except jwt.ExpiredSignatureError:
            return error("Session expired, please log in again", 401)
        except jwt.PyJWTError:
            return error("Invalid token", 401)

        if get_db().revoked_tokens.find_one({"token": token}):
            return error("Session has been logged out", 401)

        user = get_db().users.find_one({"_id": ObjectId(payload["sub"])}, {"password": 0})
        if not user:
            return error("User no longer exists", 401)

        g.user = user
        g.user_id = user["_id"]
        g.token = token
        return fn(*args, **kwargs)

    return wrapper
