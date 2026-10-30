"""Trains career_model.pkl + label_encoder.pkl.

Run once from the backend folder:  python ml/train_model.py
Generates synthetic-but-consistent training data from the career weights in
predictor.py, fits a RandomForest, and saves both artifacts with joblib.
"""

import os
import sys

import joblib
import numpy as np
import pandas as pd
from sklearn.ensemble import RandomForestClassifier
from sklearn.metrics import accuracy_score
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import LabelEncoder

sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

from ml.predictor import CAREERS, ENCODER_PATH, FEATURES, MODEL_PATH  # noqa: E402

RNG = np.random.default_rng(42)
SAMPLES_PER_CAREER = 600


def synthesize():
    rows, labels = [], []
    for slug, meta in CAREERS.items():
        weights = meta["weights"]
        for _ in range(SAMPLES_PER_CAREER):
            row = []
            for feature in FEATURES:
                if feature in weights:
                    value = RNG.normal(78 * weights[feature] + 15, 12)
                elif feature == "skill_score":
                    value = RNG.normal(70, 15)
                else:
                    value = RNG.normal(38, 18)
                row.append(float(np.clip(value, 0, 100)))
            rows.append(row)
            labels.append(slug)
    return pd.DataFrame(rows, columns=FEATURES), np.array(labels)


def main():
    X, y = synthesize()
    encoder = LabelEncoder().fit(y)
    y_encoded = encoder.transform(y)

    X_train, X_test, y_train, y_test = train_test_split(
        X, y_encoded, test_size=0.2, random_state=42, stratify=y_encoded
    )
    model = RandomForestClassifier(n_estimators=250, max_depth=14, random_state=42)
    model.fit(X_train, y_train)

    print("accuracy:", round(accuracy_score(y_test, model.predict(X_test)), 4))

    joblib.dump(model, MODEL_PATH)
    joblib.dump(encoder, ENCODER_PATH)
    print("saved:", MODEL_PATH, ENCODER_PATH)


if __name__ == "__main__":
    main()
