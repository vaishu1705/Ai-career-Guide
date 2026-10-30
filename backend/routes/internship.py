"""Internships: list, search, filter, bookmark."""

from flask import Blueprint, g, request

from database import get_db
from middleware.auth import token_required
from routes.jobs import build_query
from utils.responses import success
from utils.timestamps import now
from utils.validators import clamp_int

internship_bp = Blueprint("internship", __name__, url_prefix="/api/internships")


@internship_bp.get("")
@token_required
def list_internships():
    query = build_query(request.args, "role")
    min_stipend = request.args.get("min_stipend")
    if min_stipend:
        query["stipend"] = {"$gte": clamp_int(min_stipend, 0, 10000000, 0)}

    items = list(get_db().internships.find(query).limit(200))
    bookmarked = {b["item_id"] for b in get_db().bookmarks.find({"user_id": g.user_id, "kind": "internship"})}
    for item in items:
        item["bookmarked"] = str(item["_id"]) in bookmarked
    return success(items, "Internships fetched")


@internship_bp.post("/<internship_id>/bookmark")
@token_required
def bookmark_internship(internship_id):
    get_db().bookmarks.update_one(
        {"user_id": g.user_id, "kind": "internship", "item_id": internship_id},
        {"$set": {"updated_at": now()}, "$setOnInsert": {"created_at": now()}},
        upsert=True,
    )
    return success({"item_id": internship_id, "bookmarked": True}, "Internship bookmarked", 201)


@internship_bp.delete("/<internship_id>/bookmark")
@token_required
def remove_internship_bookmark(internship_id):
    get_db().bookmarks.delete_one({"user_id": g.user_id, "kind": "internship", "item_id": internship_id})
    return success({"item_id": internship_id, "bookmarked": False}, "Bookmark removed")


@internship_bp.get("/bookmarks")
@token_required
def list_internship_bookmarks():
    return success(list(get_db().bookmarks.find({"user_id": g.user_id, "kind": "internship"})), "Bookmarked internships")
