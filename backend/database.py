"""MongoDB Atlas connection + collection helpers (Flask-PyMongo)."""

from flask_pymongo import PyMongo

mongo = PyMongo()

COLLECTIONS = [
    "users",
    "profiles",
    "interest_assessments",
    "skill_assessments",
    "career_predictions",
    "learning_roadmaps",
    "courses",
    "modules",
    "classes",
    "notes",
    "practice_tasks",
    "mini_projects",
    "quiz",
    "quiz_results",
    "certificates",
    "learning_progress",
    "resume",
    "jobs",
    "internships",
    "notifications",
    "prediction_history",
    "settings",
    "bookmarks",
]


def init_db(app):
    """Bind PyMongo to the app and make sure every collection/index exists."""
    mongo.init_app(app)

    with app.app_context():
        db = mongo.db
        existing = set(db.list_collection_names())
        for name in COLLECTIONS:
            if name not in existing:
                db.create_collection(name)

        db.users.create_index("email", unique=True)
        db.profiles.create_index("user_id", unique=True)
        db.settings.create_index("user_id", unique=True)
        db.resume.create_index("user_id")
        db.interest_assessments.create_index([("user_id", 1), ("created_at", -1)])
        db.skill_assessments.create_index([("user_id", 1), ("created_at", -1)])
        db.career_predictions.create_index([("user_id", 1), ("created_at", -1)])
        db.prediction_history.create_index([("user_id", 1), ("created_at", -1)])
        db.learning_progress.create_index([("user_id", 1), ("module_id", 1)], unique=True)
        db.quiz_results.create_index([("user_id", 1), ("module_id", 1)])
        db.certificates.create_index([("user_id", 1), ("module_id", 1)])
        db.notifications.create_index([("user_id", 1), ("read", 1)])
        db.bookmarks.create_index([("user_id", 1), ("kind", 1), ("item_id", 1)], unique=True)

    return mongo


def get_db():
    return mongo.db
