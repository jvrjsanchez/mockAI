from .extensions import db


class User(db.Model):
    __tablename__ = 'users'

    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    email = db.Column(db.String, unique=True, nullable=False)


class Question(db.Model):
    __tablename__ = 'questions'

    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    question = db.Column(db.String, nullable=False)


class Result(db.Model):
    __tablename__ = 'results'

    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    question_id = db.Column(db.Integer, db.ForeignKey(
        'questions.id'), nullable=False)
    question = db.Column(db.String, nullable=False)
    score = db.Column(db.Float, nullable=True)
    transcript = db.Column(db.String, nullable=False)
    filler_words = db.Column(db.String, nullable=False)
    long_pauses = db.Column(db.String, nullable=False)
    pause_durations = db.Column(db.String)
    ai_feedback = db.Column(db.String)
    audio_url = db.Column(db.String, nullable=True)

    user = db.relationship('User', backref=db.backref('results', lazy=True))
    question_rel = db.relationship(
        'Question', backref=db.backref('results', lazy=True))
