from .extensions import db


class User(db.Model):
    __tablename__ = 'users'

    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    email = db.Column(db.String, unique=True, nullable=False)


class Question(db.Model):
    __tablename__ = 'questions'

    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    question = db.Column(db.String, nullable=False)
    name = db.Column(db.String, nullable=False)
    company = db.Column(db.String, nullable=False)
    position = db.Column(db.String, nullable=False)
    interview_type = db.Column(db.String, nullable=False)


class Result(db.Model):
    __tablename__ = 'results'

    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    question_id = db.Column(db.Integer, db.ForeignKey(
        'questions.id'), nullable=False)
    updated_at = db.Column(
        db.DateTime, nullable=True, default=db.func.now()
    )
    score = db.Column(db.Float, nullable=True)
    transcript = db.Column(db.String, nullable=False)
    filler_words = db.Column(db.String, nullable=False)
    long_pauses = db.Column(db.String, nullable=False)
    pause_durations = db.Column(db.String)
    ai_feedback = db.Column(db.String)
    audio_url = db.Column(db.String, nullable=True)
    video_url = db.Column(db.String, nullable=True)
    interview_date = db.Column(
        db.DateTime, nullable=True, default=db.func.now())
    user = db.relationship('User', backref=db.backref('results', lazy=True))
    question_rel = db.relationship(
        'Question', backref=db.backref('results', lazy=True))

    # method to return the result as a dictionary so we can jsonify it.
    # question=self.question_rel.question  is used to get the question from the question table using the question_id foreign key.

    def get_as_dict(self) -> dict:
        result_dict = dict(id=self.id, user_id=self.user_id, question_id=self.question_id, question=self.question_rel.question, updated_at=self.updated_at, score=self.score, transcript=self.transcript,
                           filler_words=self.filler_words, long_pauses=self.long_pauses, pause_durations=self.pause_durations, ai_feedback=self.ai_feedback, audio_url=self.audio_url, video_url=self.video_url, interview_date=self.interview_date)

        return result_dict
