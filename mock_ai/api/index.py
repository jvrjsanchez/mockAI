
from flask import request, jsonify

import logging
from flask_cors import CORS
from dotenv import load_dotenv


from . import app


CORS(app)

logging.basicConfig(level=logging.ERROR)

load_dotenv()


@app.route('/service/health', methods=['GET'])
def health():
    return {"status": "ok", "message": "API listening"}


if __name__ == '__main__':
    app.run(port=3001, debug=True)
