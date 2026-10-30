"""Interest assessment + skill (MCQ) assessment APIs."""

from flask import Blueprint, g, request

from database import get_db
from middleware.auth import token_required
from utils.responses import success
from utils.timestamps import now
from utils.validators import ValidationError, clamp_int, clean_str, require

assessment_bp = Blueprint("assessment", __name__, url_prefix="/api/assessment")


@assessment_bp.post("/interests")
@token_required
def save_interests():
    payload = request.get_json(silent=True) or {}
    require(payload, ["interests"])
    raw = payload["interests"]
    if not isinstance(raw, list) or not raw:
        raise ValidationError("interests must be a non-empty array")

    interests = []
    for item in raw[:32]:
        if isinstance(item, str):
            interests.append({"key": clean_str(item, "interest", 60), "rating": 3})
        elif isinstance(item, dict):
            interests.append({
                "key": clean_str(item.get("key"), "interest key", 60),
                "rating": clamp_int(item.get("rating", 3), 1, 5, 3),
            })
        else:
            raise ValidationError("Each interest must be a string or {key, rating}")

    doc = {
        "user_id": g.user_id,
        "interests": interests,
        "created_at": now(),
        "updated_at": now(),
    }
    doc["_id"] = get_db().interest_assessments.insert_one(doc).inserted_id
    return success(doc, "Interest assessment saved", 201)


@assessment_bp.get("/interests")
@token_required
def latest_interests():
    doc = get_db().interest_assessments.find_one({"user_id": g.user_id}, sort=[("created_at", -1)])
    return success(doc or {}, "Latest interest assessment")


@assessment_bp.post("/skills")
@token_required
def save_skill_assessment():
    payload = request.get_json(silent=True) or {}
    require(payload, ["answers"])
    answers_in = payload["answers"]
    if not isinstance(answers_in, list) or not answers_in:
        raise ValidationError("answers must be a non-empty array")

    answers, correct = [], 0
    for a in answers_in[:200]:
        if not isinstance(a, dict):
            raise ValidationError("Each answer must be an object")
        is_correct = bool(a.get("correct"))
        correct += 1 if is_correct else 0
        answers.append({
            "question_id": clean_str(a.get("question_id") or a.get("questionId"), "question_id", 80),
            "selected": clamp_int(a.get("selected", -1), -1, 10, -1),
            "correct": is_correct,
            "topic": clean_str(a.get("topic", ""), "topic", 80, allow_empty=True),
            "interest": clean_str(a.get("interest", ""), "interest", 60, allow_empty=True),
        })

    total = len(answers)
    score = round(correct / total * 100, 2)

    domains = {}
    for a in answers:
        key = a["interest"] or a["topic"] or "general"
        bucket = domains.setdefault(key, {"total": 0, "correct": 0})
        bucket["total"] += 1
        bucket["correct"] += 1 if a["correct"] else 0
    completed_domains = [
        {"domain": k, "total": v["total"], "correct": v["correct"], "score": round(v["correct"] / v["total"] * 100, 2)}
        for k, v in domains.items()
    ]

    doc = {
        "user_id": g.user_id,
        "answers": answers,
        "total_questions": total,
        "correct_answers": correct,
        "score": score,
        "completed_domains": completed_domains,
        "difficulty": clean_str(payload.get("difficulty", "mixed"), "difficulty", 20, allow_empty=True),
        "time_taken": clamp_int(payload.get("time_taken", 0), 0, 86400, 0),
        "created_at": now(),
        "updated_at": now(),
    }
    doc["_id"] = get_db().skill_assessments.insert_one(doc).inserted_id
    return success(doc, "Skill assessment saved", 201)


@assessment_bp.get("/skills")
@token_required
def latest_skills():
    doc = get_db().skill_assessments.find_one({"user_id": g.user_id}, sort=[("created_at", -1)])
    return success(doc or {}, "Latest skill assessment")


@assessment_bp.get("/skills/history")
@token_required
def skills_history():
    docs = list(get_db().skill_assessments.find({"user_id": g.user_id}).sort("created_at", -1).limit(50))
    return success(docs, "Skill assessment history")
