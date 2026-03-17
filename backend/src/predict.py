import joblib
import pandas as pd
from pathlib import Path

from .feature_extraction import extract_features

_BACKEND_DIR = Path(__file__).resolve().parents[1]
_MODEL_PATH = _BACKEND_DIR / "model" / "model.pkl"
model = joblib.load(str(_MODEL_PATH))

def predict_url(url):
    features = extract_features(url)
    df = pd.DataFrame([features])
    prediction = model.predict(df)
    return prediction[0]