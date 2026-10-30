"""Resume builder: create, update, download (JSON + printable HTML)."""

from flask import Blueprint, Response, g, request

from database import get_db
from middleware.auth import token_required
from utils.responses import error, success
from utils.timestamps import now
from utils.validators import clean_str

resume_bp = Blueprint("resume", __name__, url_prefix="/api/resume")

LIST_FIELDS = ["skills", "education", "experience", "projects", "certifications", "achievements"]


def _sanitize(payload):
    doc = {
        "full_name": clean_str(payload.get("full_name", ""), "full_name", 120, allow_empty=True),
        "title": clean_str(payload.get("title", ""), "title", 120, allow_empty=True),
        "email": clean_str(payload.get("email", ""), "email", 160, allow_empty=True),
        "phone": clean_str(payload.get("phone", ""), "phone", 40, allow_empty=True),
        "location": clean_str(payload.get("location", ""), "location", 120, allow_empty=True),
        "summary": clean_str(payload.get("summary", ""), "summary", 2000, allow_empty=True),
        "links": payload.get("links", {}) if isinstance(payload.get("links"), dict) else {},
    }
    for field in LIST_FIELDS:
        value = payload.get(field)
        doc[field] = value[:50] if isinstance(value, list) else []
    return doc


@resume_bp.post("")
@token_required
def create_resume():
    payload = request.get_json(silent=True) or {}
    doc = {**_sanitize(payload), "user_id": g.user_id, "created_at": now(), "updated_at": now()}
    db = get_db()
    if db.resume.find_one({"user_id": g.user_id}):
        return error("Resume already exists, use PUT /api/resume to update it", 409)
    doc["_id"] = db.resume.insert_one(dict(doc)).inserted_id
    return success(doc, "Resume created successfully", 201)


@resume_bp.get("")
@token_required
def get_resume():
    return success(get_db().resume.find_one({"user_id": g.user_id}) or {}, "Resume fetched")


@resume_bp.put("")
@token_required
def update_resume():
    payload = request.get_json(silent=True) or {}
    db = get_db()
    db.resume.update_one(
        {"user_id": g.user_id},
        {"$set": {**_sanitize(payload), "updated_at": now()}, "$setOnInsert": {"created_at": now()}},
        upsert=True,
    )
    return success(db.resume.find_one({"user_id": g.user_id}), "Resume updated successfully")


@resume_bp.get("/download")
@token_required
def download_resume():
    doc = get_db().resume.find_one({"user_id": g.user_id})
    if not doc:
        return error("No resume found", 404)

    def section(title, items):
        if not items:
            return ""
        rows = "".join(f"<li>{i if isinstance(i, str) else i.get('title', '')}</li>" for i in items)
        return f"<h2>{title}</h2><ul>{rows}</ul>"

    html = f"""<!doctype html><html><head><meta charset="utf-8">
<title>{doc.get('full_name', 'Resume')}</title>
<style>body{{font-family:Arial,Helvetica,sans-serif;max-width:800px;margin:40px auto;color:#111}}
h1{{margin-bottom:0}}h2{{border-bottom:1px solid #ddd;padding-bottom:4px;margin-top:28px}}</style></head>
<body onload="window.print()">
<h1>{doc.get('full_name', '')}</h1>
<p>{doc.get('title', '')} — {doc.get('email', '')} · {doc.get('phone', '')} · {doc.get('location', '')}</p>
<p>{doc.get('summary', '')}</p>
{section('Skills', doc.get('skills'))}
{section('Education', doc.get('education'))}
{section('Experience', doc.get('experience'))}
{section('Projects', doc.get('projects'))}
{section('Certifications', doc.get('certifications'))}
</body></html>"""
    return Response(html, mimetype="text/html",
                    headers={"Content-Disposition": 'inline; filename="resume.html"'})
