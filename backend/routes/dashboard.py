from flask import Blueprint, g

from controllers.dashboard_controller import build_dashboard
from database import get_db
from middleware.auth import token_required
from utils.responses import success

dashboard_bp = Blueprint("dashboard", __name__, url_prefix="/api/dashboard")


@dashboard_bp.get("")
@token_required
def dashboard():
    return success(build_dashboard(g.user_id), "Dashboard fetched")


@dashboard_bp.get("/weekly")
@token_required
def weekly():
    return success(build_dashboard(g.user_id)["weekly_progress"], "Weekly progress")


@dashboard_bp.get("/upcoming")
@token_required
def upcoming():
    return success(build_dashboard(g.user_id)["upcoming_tasks"], "Upcoming tasks")


@dashboard_bp.get("/history")
@token_required
def history():
    docs = list(get_db().prediction_history.find({"user_id": g.user_id}).sort("created_at", -1).limit(50))
    return success(docs, "Prediction history")
