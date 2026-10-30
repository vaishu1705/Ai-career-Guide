"""AI Smart Career Guidance System — Flask REST API (MongoDB Atlas)."""

import os

from flask import Flask, jsonify
from flask_cors import CORS
from werkzeug.exceptions import HTTPException

from config import Config
from database import get_db, init_db

from routes.assessment import assessment_bp
from routes.auth import auth_bp
from routes.dashboard import dashboard_bp
from routes.internship import internship_bp
from routes.jobs import jobs_bp
from routes.learning import learning_bp
from routes.notifications import notifications_bp
from routes.prediction import prediction_bp
from routes.profile import profile_bp
from routes.resume import resume_bp

from services.seed_service import seed_catalogue
from utils.validators import ValidationError


BLUEPRINTS = [
    auth_bp,
    profile_bp,
    assessment_bp,
    prediction_bp,
    learning_bp,
    jobs_bp,
    internship_bp,
    resume_bp,
    dashboard_bp,
    notifications_bp,
]


def create_app():
    Config.validate()

    app = Flask(__name__, static_folder="static")

    app.config.from_object(Config)

    os.makedirs(
        app.config["UPLOAD_FOLDER"],
        exist_ok=True,
    )

    # Allow the React/Vite frontend to communicate with Flask.
    # Frontend:
    # http://localhost:8080
    #
    # Backend:
    # http://localhost:5000
    CORS(
        app,
        resources={
            r"/api/*": {
                "origins": [
                    "http://localhost:8080",
                    "http://127.0.0.1:8080",
                ]
            }
        },
        supports_credentials=True,
    )

    # Initialize MongoDB
    init_db(app)

    # Seed catalogue data
    with app.app_context():
        seed_catalogue(get_db())

    # Register all API blueprints
    for bp in BLUEPRINTS:
        app.register_blueprint(bp)

    # Health check
    @app.get("/api/health")
    def health():
        return jsonify(
            {
                "success": True,
                "message": "API is healthy",
                "data": {
                    "status": "ok"
                },
            }
        )

    # Validation errors
    @app.errorhandler(ValidationError)
    def handle_validation(err):
        return (
            jsonify(
                {
                    "success": False,
                    "message": err.message,
                    "data": {},
                }
            ),
            422,
        )

    # HTTP errors
    @app.errorhandler(HTTPException)
    def handle_http(err):
        return (
            jsonify(
                {
                    "success": False,
                    "message": err.description,
                    "data": {},
                }
            ),
            err.code,
        )

    # Unexpected errors
    @app.errorhandler(Exception)
    def handle_unexpected(err):
        app.logger.exception(err)

        return (
            jsonify(
                {
                    "success": False,
                    "message": "Internal server error",
                    "data": {},
                }
            ),
            500,
        )

    return app


# Create Flask application
app = create_app()


# Start Flask when this file is executed directly
if __name__ == "__main__":
    app.run(
        host="0.0.0.0",
        port=int(os.getenv("PORT", "5000")),
        debug=True,
    )