"""Career prediction service.

Loads `career_model.pkl` + `label_encoder.pkl` with joblib when present and
falls back to a transparent rule-based scorer so the API works before the
model is trained (run `python ml/train_model.py` to generate the artifacts).
"""

import os

import numpy as np

MODEL_DIR = os.path.dirname(os.path.abspath(__file__))
MODEL_PATH = os.path.join(MODEL_DIR, "career_model.pkl")
ENCODER_PATH = os.path.join(MODEL_DIR, "label_encoder.pkl")

FEATURES = [
    "programming", "web", "ai", "data", "cyber", "cloud", "uiux", "database",
    "skill_score", "communication", "logical", "aptitude", "personality",
]

CAREERS = {
    "software-engineer": {
        "title": "Software Engineer",
        "weights": {"programming": 1.0, "web": 0.7, "database": 0.5, "logical": 0.8},
        "skills": ["Data Structures", "System Design", "Git", "Testing", "APIs"],
        "roadmap": "software-engineer",
    },
    "full-stack-developer": {
        "title": "Full-Stack Developer",
        "weights": {"web": 1.0, "programming": 0.7, "database": 0.7, "uiux": 0.5},
        "skills": ["React", "Node.js", "REST APIs", "MongoDB", "Deployment"],
        "roadmap": "full-stack-developer",
    },
    "data-scientist": {
        "title": "Data Scientist",
        "weights": {"data": 1.0, "ai": 0.6, "logical": 0.7, "aptitude": 0.6},
        "skills": ["Python", "Pandas", "Statistics", "SQL", "Visualization"],
        "roadmap": "data-scientist",
    },
    "ai-engineer": {
        "title": "AI / ML Engineer",
        "weights": {"ai": 1.0, "data": 0.7, "programming": 0.6, "logical": 0.7},
        "skills": ["Scikit-learn", "Deep Learning", "MLOps", "NumPy", "Model Eval"],
        "roadmap": "ai-engineer",
    },
    "cyber-security-analyst": {
        "title": "Cyber Security Analyst",
        "weights": {"cyber": 1.0, "cloud": 0.5, "logical": 0.6},
        "skills": ["Networking", "Linux", "Threat Analysis", "Cryptography"],
        "roadmap": "cyber-security-analyst",
    },
    "cloud-engineer": {
        "title": "Cloud / DevOps Engineer",
        "weights": {"cloud": 1.0, "programming": 0.5, "database": 0.4},
        "skills": ["Docker", "Kubernetes", "CI/CD", "AWS", "Terraform"],
        "roadmap": "cloud-engineer",
    },
    "ui-ux-designer": {
        "title": "UI / UX Designer",
        "weights": {"uiux": 1.0, "web": 0.5, "personality": 0.5},
        "skills": ["Figma", "Design Systems", "User Research", "Prototyping"],
        "roadmap": "ui-ux-designer",
    },
}

_model = None
_encoder = None


def _load():
    global _model, _encoder
    if _model is not None:
        return _model, _encoder
    if os.path.exists(MODEL_PATH) and os.path.exists(ENCODER_PATH):
        import joblib

        _model = joblib.load(MODEL_PATH)
        _encoder = joblib.load(ENCODER_PATH)
    return _model, _encoder


def build_features(payload):
    """Normalize the request payload into the model's feature vector (0-100)."""
    interests = {str(k).lower(): v for k, v in (payload.get("interests") or {}).items()}
    vector = []
    for name in FEATURES:
        if name in ("skill_score", "communication", "logical", "aptitude", "personality"):
            raw = payload.get(name, 50)
        else:
            raw = interests.get(name, 0)
            if raw and raw <= 5:  # star ratings 1-5
                raw = raw * 20
        try:
            raw = float(raw)
        except (TypeError, ValueError):
            raw = 0.0
        vector.append(max(0.0, min(100.0, raw)))
    return vector


def _rule_based(vector):
    values = dict(zip(FEATURES, vector))
    scored = []
    for slug, meta in CAREERS.items():
        total_w = sum(meta["weights"].values())
        score = sum(values.get(k, 0) * w for k, w in meta["weights"].items()) / total_w
        score = 0.65 * score + 0.35 * values["skill_score"]
        scored.append((slug, round(score, 2)))
    scored.sort(key=lambda x: x[1], reverse=True)
    return scored


def predict(payload):
    vector = build_features(payload)
    values = dict(zip(FEATURES, vector))
    model, encoder = _load()

    if model is not None:
        probabilities = model.predict_proba(np.array([vector]))[0]
        labels = encoder.inverse_transform(np.arange(len(probabilities)))
        ranked = sorted(zip(labels, probabilities), key=lambda x: x[1], reverse=True)
        top_slug = str(ranked[0][0])
        confidence = round(float(ranked[0][1]) * 100, 2)
        alternatives = [{"career": str(s), "match": round(float(p) * 100, 2)} for s, p in ranked[1:4]]
    else:
        ranked = _rule_based(vector)
        top_slug = ranked[0][0]
        confidence = ranked[0][1]
        alternatives = [{"career": s, "match": m} for s, m in ranked[1:4]]

    meta = CAREERS.get(top_slug, CAREERS["software-engineer"])
    ordered = sorted(
        ((k, values[k]) for k in FEATURES if k != "skill_score"),
        key=lambda x: x[1],
        reverse=True,
    )
    strengths = [k for k, v in ordered[:3] if v >= 50] or [ordered[0][0]]
    weaknesses = [k for k, v in ordered[-3:] if v < 60]

    return {
        "career_slug": top_slug,
        "career_title": meta["title"],
        "match": confidence,
        "confidence": confidence,
        "strengths": strengths,
        "weaknesses": weaknesses,
        "recommended_skills": meta["skills"],
        "recommended_roadmap": meta["roadmap"],
        "alternatives": alternatives,
        "features": values,
        "model": "ml" if model is not None else "rule-based",
    }
