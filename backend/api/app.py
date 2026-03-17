import sys
import os

# 🔥 Fix for module path (VERY IMPORTANT for Render)
sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), "..")))

from flask import Flask, request, jsonify
from flask_cors import CORS
from src.predict import predict_url

app = Flask(__name__)
CORS(app)

@app.route("/")
def home():
    return "Phishing Detection API is running!"

@app.route("/predict", methods=["POST"])
def predict():
    data = request.json
    url = data.get("url")

    if not url:
        return jsonify({"error": "No URL provided"}), 400

    result = predict_url(url)

    # 🔥 HTTPS check
    is_https = 1 if url.startswith("https") else 0

    return jsonify({
        "prediction": int(result),
        "is_https": is_https
    })


# 🔥 Render compatible port (MOST IMPORTANT)
if __name__ == "__main__":
    port = int(os.environ.get("PORT", 10000))
    app.run(host="0.0.0.0", port=port)
