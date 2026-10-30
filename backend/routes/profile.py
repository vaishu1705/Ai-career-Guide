from flask import Blueprint, g, request

from database import get_db
from middleware.auth import token_required
from models.schemas import profile_doc, settings_doc
from utils.responses import success
from utils.timestamps import now
from utils.validators import clean_str


profile_bp = Blueprint(
    "profile",
    __name__,
    url_prefix="/api",
)


EDITABLE = [
    "name",
    "email",
    "phone",
    "college",
    "branch",
    "year",
    "cgpa",
    "goal",
    "avatar",
    "interests",
]


@profile_bp.get("/profile")
@token_required
def get_profile():
    db = get_db()

    profile = db.profiles.find_one(
        {"user_id": g.user_id}
    )

    if not profile:
        profile = profile_doc(
            g.user_id,
            g.user.get("name", ""),
            g.user.get("email", ""),
        )

        db.profiles.insert_one(profile)

    return success(
        profile,
        "Profile fetched",
    )


@profile_bp.put("/profile")
@token_required
def update_profile():
    payload = request.get_json(
        silent=True
    ) or {}

    update = {}

    # -----------------------------------------
    # Normal profile fields
    # -----------------------------------------

    for field in EDITABLE:

        if field in payload:

            # Interests are handled separately below
            if field == "interests":
                continue

            update[field] = clean_str(
                payload[field],
                field,
                200,
                allow_empty=True,
            )

    # -----------------------------------------
    # Skills
    # -----------------------------------------

    if "skills" in payload:

        if isinstance(
            payload["skills"],
            list,
        ):

            update["skills"] = [
                clean_str(
                    skill,
                    "skill",
                    60,
                )
                for skill in payload["skills"][:50]
                if str(skill).strip()
            ]

        elif isinstance(
            payload["skills"],
            str,
        ):

            update["skills"] = [
                clean_str(
                    skill.strip(),
                    "skill",
                    60,
                )
                for skill in payload["skills"].split(",")
                if skill.strip()
            ]

    # -----------------------------------------
    # Interests
    # -----------------------------------------

    if "interests" in payload:

        if isinstance(
            payload["interests"],
            list,
        ):

            update["interests"] = [
                clean_str(
                    interest,
                    "interest",
                    100,
                )
                for interest in payload["interests"][:50]
                if str(interest).strip()
            ]

        elif isinstance(
            payload["interests"],
            str,
        ):

            update["interests"] = [
                clean_str(
                    interest.strip(),
                    "interest",
                    100,
                )
                for interest in payload["interests"].split(",")
                if interest.strip()
            ]

    # -----------------------------------------
    # Updated timestamp
    # -----------------------------------------

    update["updated_at"] = now()

    db = get_db()

    # -----------------------------------------
    # Update MongoDB profile
    # -----------------------------------------

    db.profiles.update_one(
        {"user_id": g.user_id},
        {
            "$set": update,
            "$setOnInsert": {
                "created_at": now(),
            },
        },
        upsert=True,
    )

    # -----------------------------------------
    # Keep users collection name synchronized
    # -----------------------------------------

    if "name" in update:

        db.users.update_one(
            {"_id": g.user_id},
            {
                "$set": {
                    "name": update["name"],
                    "updated_at": now(),
                }
            },
        )

    # -----------------------------------------
    # Return updated profile
    # -----------------------------------------

    profile = db.profiles.find_one(
        {"user_id": g.user_id}
    )

    return success(
        profile,
        "Profile updated successfully",
    )


# =========================================
# SETTINGS
# =========================================

@profile_bp.get("/settings")
@token_required
def get_settings():
    db = get_db()

    doc = db.settings.find_one(
        {"user_id": g.user_id}
    )

    if not doc:

        doc = settings_doc(
            g.user_id
        )

        db.settings.insert_one(doc)

    return success(
        doc,
        "Settings fetched",
    )


@profile_bp.put("/settings")
@token_required
def update_settings():
    payload = request.get_json(
        silent=True
    ) or {}

    update = {
        "updated_at": now()
    }

    # Theme
    if payload.get("theme") in (
        "light",
        "dark",
    ):
        update["theme"] = payload["theme"]

    # Notification settings
    for flag in (
        "email_notifications",
        "push_notifications",
        "weekly_report",
    ):

        if isinstance(
            payload.get(flag),
            bool,
        ):
            update[flag] = payload[flag]

    db = get_db()

    db.settings.update_one(
        {"user_id": g.user_id},
        {
            "$set": update,
            "$setOnInsert": {
                "created_at": now(),
            },
        },
        upsert=True,
    )

    return success(
        db.settings.find_one(
            {"user_id": g.user_id}
        ),
        "Settings updated successfully",
    )