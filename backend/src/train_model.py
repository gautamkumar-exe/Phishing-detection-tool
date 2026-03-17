import pandas as pd
from xgboost import XGBClassifier
import joblib

data = pd.read_csv("data/phishing_dataset.csv")

X = data.drop("label", axis=1)
y = data["label"]

model = XGBClassifier()
model.fit(X, y)

joblib.dump(model, "model/model.pkl")

print("Model trained and saved!")