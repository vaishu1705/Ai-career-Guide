"""Roadmap, module progress, quizzes and certificates."""

import uuid

from flask import Blueprint, g, request

from database import get_db
from middleware.auth import token_required
from services.roadmap_service import build_roadmap, module_by_id
from utils.responses import error, success
from utils.timestamps import now
from utils.validators import ValidationError, clamp_int, clean_str, require

learning_bp = Blueprint("learning", __name__, url_prefix="/api/learning")


def _career_slug(user_id):
    db = get_db()
    doc = db.learning_roadmaps.find_one({"user_id": user_id})
    if doc and doc.get("career_slug"):
        return doc["career_slug"]
    prediction = db.career_predictions.find_one({"user_id": user_id}, sort=[("created_at", -1)])
    return (prediction or {}).get("recommended_roadmap", "software-engineer")


def _progress_map(user_id):
    return {p["module_id"]: p for p in get_db().learning_progress.find({"user_id": user_id})}


def _module_complete(progress):
    return bool(
        progress
        and progress.get("class_done")
        and progress.get("notes_done")
        and progress.get("task_done")
        and progress.get("project_done")
        and (progress.get("quiz_score") or 0) >= 60
    )


def _set_step(module_id, field, value):
    db = get_db()
    db.learning_progress.update_one(
        {"user_id": g.user_id, "module_id": module_id},
        {"$set": {field: value, "updated_at": now()}, "$setOnInsert": {"created_at": now()}},
        upsert=True,
    )
    return db.learning_progress.find_one({"user_id": g.user_id, "module_id": module_id})


@learning_bp.get("/roadmap")
@token_required
def get_roadmap():
    slug = _career_slug(g.user_id)
    roadmap = build_roadmap(slug)
    progress = _progress_map(g.user_id)

    unlocked = True
    for module in roadmap:
        module["progress"] = progress.get(module["module_id"], {})
        module["completed"] = _module_complete(progress.get(module["module_id"]))
        module["locked"] = not unlocked
        unlocked = module["completed"]

    completed = sum(1 for m in roadmap if m["completed"])
    return success(
        {
            "career_slug": slug,
            "modules": roadmap,
            "completed_modules": completed,
            "total_modules": len(roadmap),
            "percentage": round(completed / len(roadmap) * 100, 2) if roadmap else 0,
        },
        "Roadmap fetched",
    )


@learning_bp.get("/module/<module_id>")
@token_required
def get_module(module_id):
    slug = _career_slug(g.user_id)
    module = module_by_id(slug, module_id)
    if not module:
        return error("Module not found", 404)
    module["progress"] = get_db().learning_progress.find_one({"user_id": g.user_id, "module_id": module_id}) or {}
    return success(module, "Module fetched")


@learning_bp.post("/module/<module_id>/class")
@token_required
def complete_class(module_id):
    return success(_set_step(module_id, "class_done", True), "Class marked complete")


@learning_bp.post("/module/<module_id>/notes")
@token_required
def complete_notes(module_id):
    return success(_set_step(module_id, "notes_done", True), "Notes marked complete")


@learning_bp.post("/module/<module_id>/task")
@token_required
def submit_task(module_id):
    payload = request.get_json(silent=True) or {}
    get_db().practice_tasks.insert_one({
        "user_id": g.user_id,
        "module_id": module_id,
        "submission": clean_str(payload.get("submission", ""), "submission", 5000, allow_empty=True),
        "created_at": now(),
        "updated_at": now(),
    })
    return success(_set_step(module_id, "task_done", True), "Practice task submitted")


@learning_bp.post("/module/<module_id>/project")
@token_required
def submit_project(module_id):
    payload = request.get_json(silent=True) or {}
    get_db().mini_projects.insert_one({
        "user_id": g.user_id,
        "module_id": module_id,
        "title": clean_str(payload.get("title", "Mini project"), "title", 160, allow_empty=True),
        "repo_url": clean_str(payload.get("repo_url", ""), "repo_url", 300, allow_empty=True),
        "description": clean_str(payload.get("description", ""), "description", 5000, allow_empty=True),
        "created_at": now(),
        "updated_at": now(),
    })
    return success(_set_step(module_id, "project_done", True), "Mini project submitted")


@learning_bp.post("/module/<module_id>/quiz")
@token_required
def submit_quiz(module_id):
    payload = request.get_json(silent=True) or {}
    require(payload, ["score"])
    score = clamp_int(payload["score"], 0, 100)

    db = get_db()
    db.quiz_results.insert_one({
        "user_id": g.user_id,
        "module_id": module_id,
        "score": score,
        "answers": payload.get("answers", [])[:100] if isinstance(payload.get("answers"), list) else [],
        "created_at": now(),
        "updated_at": now(),
    })
    progress = _set_step(module_id, "quiz_score", score)
    return success({"progress": progress, "passed": score >= 60}, "Quiz submitted")


@learning_bp.post("/module/<module_id>/certificate")
@token_required
def generate_certificate(module_id):
    db = get_db()
    progress = db.learning_progress.find_one({"user_id": g.user_id, "module_id": module_id})
    if not _module_complete(progress):
        raise ValidationError("Finish the class, notes, task, project and pass the quiz first")

    existing = db.certificates.find_one({"user_id": g.user_id, "module_id": module_id})
    if existing:
        return success(existing, "Certificate already issued")

    certificate = {
        "user_id": g.user_id,
        "module_id": module_id,
        "certificate_id": f"ACG-{uuid.uuid4().hex[:10].upper()}",
        "score": progress.get("quiz_score"),
        "issued_to": g.user.get("name"),
        "created_at": now(),
        "updated_at": now(),
    }
    certificate["_id"] = db.certificates.insert_one(dict(certificate)).inserted_id
    db.learning_progress.update_one(
        {"_id": progress["_id"]}, {"$set": {"certificate_id": certificate["certificate_id"], "updated_at": now()}}
    )
    return success(certificate, "Certificate generated", 201)


@learning_bp.get("/certificates")
@token_required
def list_certificates():
    return success(list(get_db().certificates.find({"user_id": g.user_id}).sort("created_at", -1)), "Certificates")


@learning_bp.get("/progress")
@token_required
def track_progress():
    slug = _career_slug(g.user_id)
    roadmap = build_roadmap(slug)
    progress = _progress_map(g.user_id)
    completed = sum(1 for m in roadmap if _module_complete(progress.get(m["module_id"])))
    quizzes = [p["quiz_score"] for p in progress.values() if p.get("quiz_score") is not None]
    return success(
        {
            "career_slug": slug,
            "modules": list(progress.values()),
            "completed_modules": completed,
            "total_modules": len(roadmap),
            "percentage": round(completed / len(roadmap) * 100, 2) if roadmap else 0,
            "average_quiz_score": round(sum(quizzes) / len(quizzes), 2) if quizzes else 0,
        },
        "Learning progress",
    )


@learning_bp.get("/courses")
@token_required
def list_courses():
    query = {}
    level = request.args.get("level")
    search = request.args.get("q")
    if level and level.lower() != "all":
        query["level"] = level
    if search:
        query["title"] = {"$regex": clean_str(search, "q", 80), "$options": "i"}
    return success(list(get_db().courses.find(query).limit(100)), "Courses")


@learning_bp.post("/module/<module_id>/feedback")
@token_required
def module_feedback(module_id):
    payload = request.get_json(silent=True) or {}
    doc = {
        "user_id": g.user_id,
        "module_id": module_id,
        "rating": clamp_int(payload.get("rating", 5), 1, 5, 5),
        "useful": bool(payload.get("useful", True)),
        "comment": clean_str(payload.get("comment", ""), "comment", 1000, allow_empty=True),
        "created_at": now(),
        "updated_at": now(),
    }
    get_db().module_feedback.insert_one(doc)
    return success(doc, "Thanks for the feedback", 201)
