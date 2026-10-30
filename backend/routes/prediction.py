"""Career prediction API backed by the scikit-learn model."""

from flask import Blueprint, g, request

from database import get_db
from middleware.auth import token_required
from ml.predictor import predict as run_prediction
from services.roadmap_service import build_roadmap
from utils.responses import success
from utils.timestamps import now

prediction_bp = Blueprint("prediction", __name__, url_prefix="/api")


def _latest_signals(user_id):
    db = get_db()
    interests_doc = db.interest_assessments.find_one({"user_id": user_id}, sort=[("created_at", -1)]) or {}
    skills_doc = db.skill_assessments.find_one({"user_id": user_id}, sort=[("created_at", -1)]) or {}
    interests = {i["key"]: i.get("rating", 3) for i in interests_doc.get("interests", [])}
    return interests, skills_doc


@prediction_bp.post("/predict-career")
@token_required
def predict_career():
    payload = request.get_json(silent=True) or {}
    stored_interests, skills_doc = _latest_signals(g.user_id)

    features = {
        "interests": payload.get("interests") or stored_interests,
        "skill_score": payload.get("skill_score", skills_doc.get("score", 50)),
        "communication": payload.get("communication", 60),
        "logical": payload.get("logical", 60),
        "aptitude": payload.get("aptitude", 60),
        "personality": payload.get("personality", 60),
    }

    result = run_prediction(features)
    roadmap = build_roadmap(result["recommended_roadmap"])

    doc = {
        "user_id": g.user_id,
        **result,
        "input": features,
        "created_at": now(),
        "updated_at": now(),
    }
    db = get_db()
    doc["_id"] = db.career_predictions.insert_one(dict(doc)).inserted_id
    db.prediction_history.insert_one({
        "user_id": g.user_id,
        "prediction_id": doc["_id"],
        "career_slug": result["career_slug"],
        "career_title": result["career_title"],
        "match": result["match"],
        "created_at": now(),
        "updated_at": now(),
    })
    db.learning_roadmaps.update_one(
        {"user_id": g.user_id},
        {"$set": {"career_slug": result["recommended_roadmap"], "roadmap": roadmap, "updated_at": now()},
         "$setOnInsert": {"created_at": now()}},
        upsert=True,
    )

    return success({**doc, "roadmap": roadmap}, "Career predicted successfully", 201)


@prediction_bp.get("/prediction")
@token_required
def latest_prediction():
    doc = get_db().career_predictions.find_one({"user_id": g.user_id}, sort=[("created_at", -1)])
    return success(doc or {}, "Latest prediction")


@prediction_bp.get("/prediction-history")
@token_required
def prediction_history():
    docs = list(get_db().prediction_history.find({"user_id": g.user_id}).sort("created_at", -1).limit(50))
    return success(docs, "Prediction history")
