import os
import logging
from flask import Flask
from dotenv import load_dotenv
from .extensions import db, migrate
from sqlalchemy import create_engine

from sqlalchemy.orm import scoped_session, sessionmaker

load_dotenv()


def create_app():
    app = Flask(__name__)

    db_url = os.getenv('DATABASE_URL')

    app.secret_key = os.getenv('SECRET_KEY', 'supersecretkey')

    app.config['SQLALCHEMY_DATABASE_URI'] = db_url

    engine = create_engine(db_url, pool_recycle=3600, pool_pre_ping=True)
    db.session = scoped_session(sessionmaker(
        autocommit=False, autoflush=False, bind=engine))
    app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
    app.config['UPLOAD_FOLDER'] = '/tmp'

    db.init_app(app)
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
