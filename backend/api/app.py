from flask import Flask, request, jsonify
from flask_cors import CORS
from src.predict import predict_url

app = Flask(__name__)
CORS(app)

@app.route("/predict", methods=["POST"])
def predict():
    data = request.json
    url = data.get("url")

    result = predict_url(url)

    # 🔥 ADD THIS LINE
    is_https = 1 if url.startswith("https") else 0

    return jsonify({
        "prediction": int(result),
        "is_https": is_https   # 🔥 IMPORTANT
    })

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=10000, debug=True)