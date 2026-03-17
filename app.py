from flask import Flask, request, jsonify
from flask_cors import CORS
from backend.src.predict import predict_url
import os

app = Flask(__name__)
CORS(app)

@app.route("/")
def home():
    return jsonify({"status": "healthy", "message": "Phishing Detector API is running!"})

@app.route("/predict", methods=["POST"])
def predict():
    data = request.json or {}
    url = data.get("url")
    
    if not url:
        return jsonify({"error": "Missing URL"}), 400

    try:
        result = predict_url(url)
        is_https = 1 if url.startswith("https") else 0

        return jsonify({
            "prediction": int(result),
            "is_https": is_https
        })
    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == "__main__":
    port = int(os.environ.get("PORT", 10000))
    app.run(host="0.0.0.0", port=port, debug=False)