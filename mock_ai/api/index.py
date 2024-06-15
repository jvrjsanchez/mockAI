from flask import Flask, request
from flask_cors import CORS

app = Flask(__name__)
CORS(app)


@app.route('/api', methods=['POST'])
def api():
    data = request.get_json()
    return data


@app.route('/api/health', methods=['GET'])
def health():
    return {"status": "ok", "message": "API listening"}


if __name__ == '__main__':
    app.run(port=3001, debug=True)
