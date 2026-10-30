from flask import Blueprint, g, request
from werkzeug.security import check_password_hash, generate_password_hash

from database import get_db
from middleware.auth import create_token, token_required
from models.schemas import profile_doc, settings_doc, user_doc
from utils.responses import error, success
from utils.timestamps import now
from utils.validators import ValidationError, clean_str, require, valid_email, valid_password

auth_bp = Blueprint("auth", __name__, url_prefix="/api/auth")


@auth_bp.post("/register")
def register():
    payload = request.get_json(silent=True) or {}
    require(payload, ["name", "email", "password"])
    name = clean_str(payload["name"], "name", 100)
    email = valid_email(payload["email"])
    password = valid_password(payload["password"])

    db = get_db()
    if db.users.find_one({"email": email}):
        raise ValidationError("An account with this email already exists")

    user = user_doc(name, email, generate_password_hash(password))
    user_id = db.users.insert_one(user).inserted_id

    db.profiles.insert_one(profile_doc(user_id, name, email))
    db.settings.insert_one(settings_doc(user_id))
    db.notifications.insert_one({
        "user_id": user_id,
        "title": "Welcome to AI Career Guide",
        "body": "Start with the interest assessment to unlock your roadmap.",
        "type": "system",
        "read": False,
        "created_at": now(),
        "updated_at": now(),
    })

    token = create_token(user_id)
    return success(
        {"token": token, "user": {"_id": user_id, "name": name, "email": email}},
        "Account created successfully",
        201,
    )


@auth_bp.post("/login")
def login():
    payload = request.get_json(silent=True) or {}
    require(payload, ["email", "password"])
    email = valid_email(payload["email"])

    user = get_db().users.find_one({"email": email})
    if not user or not check_password_hash(user["password"], payload["password"]):
        return error("Invalid email or password", 401)

    token = create_token(user["_id"])
    return success(
        {"token": token, "user": {"_id": user["_id"], "name": user["name"], "email": user["email"]}},
        "Logged in successfully",
    )


@auth_bp.post("/logout")
@token_required
def logout():
    get_db().revoked_tokens.insert_one({"token": g.token, "user_id": g.user_id, "created_at": now()})
    return success(message="Logged out successfully")


@auth_bp.get("/me")
@token_required
def me():
    return success({"user": g.user}, "Current user")
