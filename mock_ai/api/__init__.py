import os
import logging
from flask import Flask
from .extensions import db, migrate


def create_app():
    app = Flask(__name__)

    app.secret_key = 'supersecretkey'

    app.config['SQLALCHEMY_DATABASE_URI'] = os.getenv("DATABASE_URL")
    app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
    app.config['UPLOAD_FOLDER'] = '/tmp'

    migrate.init_app(app, db)

    with app.app_context():
        from api import models

    if not app.debug:
        stream_handler = logging.StreamHandler()
        stream_handler.setLevel(logging.INFO)
        app.logger.addHandler(stream_handler)

    app.logger.setLevel(logging.INFO)
    app.logger.info('Flask App startup')

    return app


app = create_app()
