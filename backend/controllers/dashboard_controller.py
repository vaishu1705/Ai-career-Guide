"""Aggregates dashboard metrics from the learning + assessment collections."""

from datetime import timedelta

from database import get_db
from services.roadmap_service import build_roadmap
from utils.timestamps import now


def _module_complete(p):
    return bool(
        p and p.get("class_done") and p.get("notes_done") and p.get("task_done")
        and p.get("project_done") and (p.get("quiz_score") or 0) >= 60
    )


def build_dashboard(user_id):
    db = get_db()
    prediction = db.career_predictions.find_one({"user_id": user_id}, sort=[("created_at", -1)]) or {}
    skills = db.skill_assessments.find_one({"user_id": user_id}, sort=[("created_at", -1)]) or {}
    slug = prediction.get("recommended_roadmap", "software-engineer")
    roadmap = build_roadmap(slug)

    progress = list(db.learning_progress.find({"user_id": user_id}))
    by_id = {p["module_id"]: p for p in progress}
    completed = [m for m in roadmap if _module_complete(by_id.get(m["module_id"]))]

    quiz_scores = [p["quiz_score"] for p in progress if p.get("quiz_score") is not None]
    certificates = list(db.certificates.find({"user_id": user_id}).sort("created_at", -1))

    learning_percentage = round(len(completed) / len(roadmap) * 100, 2) if roadmap else 0
    avg_quiz = round(sum(quiz_scores) / len(quiz_scores), 2) if quiz_scores else 0
    readiness = round(0.4 * learning_percentage + 0.35 * (skills.get("score") or 0) + 0.25 * avg_quiz, 2)

    week_start = now() - timedelta(days=7)
    weekly = {
        "classes_completed": sum(1 for p in progress if p.get("class_done") and p.get("updated_at", now()) >= week_start),
        "quizzes_completed": db.quiz_results.count_documents({"user_id": user_id, "created_at": {"$gte": week_start}}),
        "projects_completed": db.mini_projects.count_documents({"user_id": user_id, "created_at": {"$gte": week_start}}),
        "goal_classes": 3,
        "goal_quizzes": 1,
        "goal_projects": 1,
    }

    upcoming = []
    for module in roadmap:
        p = by_id.get(module["module_id"])
        if not _module_complete(p):
            for field, label in (("class_done", "Watch class"), ("notes_done", "Read notes"),
                                 ("task_done", "Submit practice task"), ("project_done", "Submit mini project")):
                if not (p or {}).get(field):
                    upcoming.append({"module_id": module["module_id"], "module": module["title"], "task": label})
            if (p or {}).get("quiz_score") is None:
                upcoming.append({"module_id": module["module_id"], "module": module["title"], "task": "Take quiz"})
            break

    return {
        "career": {
            "slug": prediction.get("career_slug"),
            "title": prediction.get("career_title"),
            "match": prediction.get("match"),
        },
        "overall_progress": learning_percentage,
        "learning_percentage": learning_percentage,
        "career_readiness": readiness,
        "assessment_score": skills.get("score", 0),
        "average_quiz_score": avg_quiz,
        "certificates_earned": len(certificates),
        "certificates": certificates[:5],
        "completed_courses": len(completed),
        "completed_modules": [m["title"] for m in completed],
        "total_modules": len(roadmap),
        "weekly_progress": weekly,
        "upcoming_tasks": upcoming[:5],
        "prediction_history": list(
            db.prediction_history.find({"user_id": user_id}).sort("created_at", -1).limit(10)
        ),
    }
