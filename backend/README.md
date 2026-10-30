# AI Career Guidance — Flask + MongoDB Atlas backend

## Run locally

```bash
cd backend
python -m venv venv && source venv/bin/activate    # Windows: venv\Scripts\activate
pip install -r requirements.txt
cp .env.example .env          # then paste your MongoDB Atlas URI + secrets
python ml/train_model.py      # creates ml/career_model.pkl + ml/label_encoder.pkl
python app.py                 # http://localhost:5000
```

Collections and indexes are created automatically on first boot, and the
courses / jobs / internships catalogues are seeded once.

## Environment

| Variable | Purpose |
| --- | --- |
| `MONGO_URI` | MongoDB Atlas connection string (never hardcode) |
| `SECRET_KEY` | Flask secret |
| `JWT_SECRET` | Signing key for auth tokens |
| `CORS_ORIGINS` | Comma-separated frontend origins |

## API surface

All responses use `{ "success": bool, "message": str, "data": {} }`.
Authenticated routes need `Authorization: Bearer <token>`.

| Area | Endpoints |
| --- | --- |
| Auth | `POST /api/auth/register`, `/login`, `/logout`, `GET /api/auth/me` |
| Profile | `GET/PUT /api/profile`, `GET/PUT /api/settings` |
| Assessment | `POST/GET /api/assessment/interests`, `POST/GET /api/assessment/skills`, `GET /api/assessment/skills/history` |
| Prediction | `POST /api/predict-career`, `GET /api/prediction`, `GET /api/prediction-history` |
| Learning | `GET /api/learning/roadmap`, `GET /api/learning/module/<id>`, `POST .../class|notes|task|project|quiz|certificate|feedback`, `GET /api/learning/progress`, `/certificates`, `/courses` |
| Jobs | `GET /api/jobs`, `POST/DELETE /api/jobs/<id>/bookmark`, `GET /api/jobs/bookmarks` |
| Internships | `GET /api/internships`, `POST/DELETE /api/internships/<id>/bookmark`, `GET /api/internships/bookmarks` |
| Resume | `POST/GET/PUT /api/resume`, `GET /api/resume/download` |
| Dashboard | `GET /api/dashboard`, `/weekly`, `/upcoming`, `/history` |
| Notifications | `GET/POST /api/notifications`, `PUT /<id>/read`, `DELETE /<id>`, `GET /unread-count` |

## ML

`ml/predictor.py` loads `career_model.pkl` + `label_encoder.pkl` via joblib.
If the artifacts are missing it falls back to a transparent weighted scorer, so
the API never breaks before training.

## Deploy

`gunicorn -w 2 -b 0.0.0.0:$PORT app:app` (Render, Railway, Fly, EC2).
Set the frontend's `VITE_API_URL` to the deployed URL.
