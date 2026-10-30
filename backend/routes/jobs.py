"""Jobs: list, search, filter, bookmark."""

from flask import Blueprint, g, request

from database import get_db
from middleware.auth import token_required
from utils.responses import success
from utils.timestamps import now
from utils.validators import clamp_int, clean_str

jobs_bp = Blueprint("jobs", __name__, url_prefix="/api/jobs")


def build_query(args, title_field):
    query = {}
    search = args.get("q")
    if search:
        term = clean_str(search, "q", 80)
        query["$or"] = [
            {title_field: {"$regex": term, "$options": "i"}},
            {"company": {"$regex": term, "$options": "i"}},
            {"skills": {"$regex": term, "$options": "i"}},
        ]
    location = args.get("location")
    if location and location.lower() != "all":
        query["location"] = {"$regex": clean_str(location, "location", 80), "$options": "i"}
    if args.get("remote") in ("true", "1"):
        query["remote"] = True
    level = args.get("level")
    if level and level.lower() != "all":
        query["level"] = level
    return query


@jobs_bp.get("")
@token_required
def list_jobs():
    query = build_query(request.args, "title")
    min_salary = request.args.get("min_salary")
    if min_salary:
        query["salary_max"] = {"$gte": clamp_int(min_salary, 0, 100000000, 0)}

    jobs = list(get_db().jobs.find(query).limit(200))
    bookmarked = {b["item_id"] for b in get_db().bookmarks.find({"user_id": g.user_id, "kind": "job"})}
    for job in jobs:
        job["bookmarked"] = str(job["_id"]) in bookmarked
    return success(jobs, "Jobs fetched")


@jobs_bp.post("/<job_id>/bookmark")
@token_required
def bookmark_job(job_id):
    get_db().bookmarks.update_one(
        {"user_id": g.user_id, "kind": "job", "item_id": job_id},
        {"$set": {"updated_at": now()}, "$setOnInsert": {"created_at": now()}},
        upsert=True,
    )
    return success({"item_id": job_id, "bookmarked": True}, "Job bookmarked", 201)


@jobs_bp.delete("/<job_id>/bookmark")
@token_required
def remove_job_bookmark(job_id):
    get_db().bookmarks.delete_one({"user_id": g.user_id, "kind": "job", "item_id": job_id})
    return success({"item_id": job_id, "bookmarked": False}, "Bookmark removed")


@jobs_bp.get("/bookmarks")
@token_required
def list_job_bookmarks():
    docs = list(get_db().bookmarks.find({"user_id": g.user_id, "kind": "job"}))
    return success(docs, "Bookmarked jobs")
