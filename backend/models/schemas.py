"""Document shape helpers. MongoDB is schemaless, so these act as the
single source of truth for the fields each collection stores."""

from utils.timestamps import now


def user_doc(name, email, password_hash):
    ts = now()
    return {
        "name": name,
        "email": email,
        "password": password_hash,
        "role": "student",
        "created_at": ts,
        "updated_at": ts,
    }


def profile_doc(user_id, name="", email=""):
    ts = now()
    return {
        "user_id": user_id,
        "name": name,
        "email": email,
        "phone": "",
        "college": "",
        "branch": "",
        "year": "",
        "cgpa": "",
        "skills": [],
        "goal": "",
        "avatar": "",
        "created_at": ts,
        "updated_at": ts,
    }


def settings_doc(user_id):
    ts = now()
    return {
        "user_id": user_id,
        "theme": "dark",
        "email_notifications": True,
        "push_notifications": True,
        "weekly_report": True,
        "created_at": ts,
        "updated_at": ts,
    }


def progress_doc(user_id, module_id):
    ts = now()
    return {
        "user_id": user_id,
        "module_id": module_id,
        "class_done": False,
        "notes_done": False,
        "task_done": False,
        "project_done": False,
        "quiz_score": None,
        "certificate_id": None,
        "created_at": ts,
        "updated_at": ts,
    }
