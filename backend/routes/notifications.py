from flask import Blueprint, g, request

from database import get_db
from middleware.auth import token_required
from utils.responses import error, success
from utils.timestamps import now
from utils.validators import clean_str, require, to_object_id

notifications_bp = Blueprint("notifications", __name__, url_prefix="/api/notifications")


@notifications_bp.get("")
@token_required
def list_notifications():
    docs = list(get_db().notifications.find({"user_id": g.user_id}).sort("created_at", -1).limit(100))
    return success(docs, "Notifications fetched")


@notifications_bp.post("")
@token_required
def create_notification():
    payload = request.get_json(silent=True) or {}
    require(payload, ["title"])
    doc = {
        "user_id": g.user_id,
        "title": clean_str(payload["title"], "title", 160),
        "body": clean_str(payload.get("body", ""), "body", 1000, allow_empty=True),
        "type": clean_str(payload.get("type", "info"), "type", 40, allow_empty=True),
        "read": False,
        "created_at": now(),
        "updated_at": now(),
    }
    doc["_id"] = get_db().notifications.insert_one(dict(doc)).inserted_id
    return success(doc, "Notification created", 201)


@notifications_bp.put("/<notification_id>/read")
@token_required
def read_notification(notification_id):
    result = get_db().notifications.update_one(
        {"_id": to_object_id(notification_id, "notification id"), "user_id": g.user_id},
        {"$set": {"read": True, "updated_at": now()}},
    )
    if not result.matched_count:
        return error("Notification not found", 404)
    return success(message="Notification marked as read")


@notifications_bp.delete("/<notification_id>")
@token_required
def delete_notification(notification_id):
    result = get_db().notifications.delete_one(
        {"_id": to_object_id(notification_id, "notification id"), "user_id": g.user_id}
    )
    if not result.deleted_count:
        return error("Notification not found", 404)
    return success(message="Notification deleted")


@notifications_bp.get("/unread-count")
@token_required
def unread_count():
    count = get_db().notifications.count_documents({"user_id": g.user_id, "read": False})
    return success({"unread": count}, "Unread count")
