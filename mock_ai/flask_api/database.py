import sqlite3
import logging

# Configure logging
logging.basicConfig(level=logging.DEBUG)

# Initialize or connect to the SQLite database

default_question = "Tell me about a time you had to work with a difficult person. How did you handle the situation?"
default_score = 100.0
default_filler_words = ""
default_long_pauses = ""


def init_db():
    with sqlite3.connect('MockAI.db') as conn:
        cursor = conn.cursor()

        # Create users table if it doesn't exist
        cursor.execute('''
            CREATE TABLE IF NOT EXISTS users (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                user TEXT NOT NULL UNIQUE
            )
        ''')

        # Create questions table if it doesn't exist
        cursor.execute('''
            CREATE TABLE IF NOT EXISTS questions (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                question TEXT NOT NULL
            )
        ''')

        # Create results table if it doesn't exist
        cursor.execute('''
            CREATE TABLE IF NOT EXISTS results (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                user_id INTEGER NOT NULL,
                question_id INTEGER NOT NULL,
                score REAL NOT NULL,
                transcript TEXT NOT NULL,
                filler_words TEXT NOT NULL,
                long_pauses TEXT NOT NULL,
                ai_feedback TEXT,
                FOREIGN KEY (user_id) REFERENCES users (id)
                FOREIGN KEY (question_id) REFERENCES questions (id)
            )
        ''')

        conn.commit()
        logging.info("Database initialized successfully.")


def add_user(user):

    try:
        with sqlite3.connect('MockAI.db') as conn:
            cursor = conn.cursor()
            cursor.execute('INSERT INTO users (user) VALUES (?)', (user,))
            conn.commit()
            user_id = cursor.lastrowid
            logging.info(f"Added user: {user} with id: {user_id}")
            return user_id
    except sqlite3.IntegrityError as e:
        if "UNIQUE constraint failed" in str(e):
            logging.error("User already in DB. Pass.")
            return None
        else:
            logging.error(f"IntegrityError: {e}")
            return "User already exists"


def get_all_users():
    with sqlite3.connect('MockAI.db') as conn:
        cursor = conn.cursor()
        cursor.execute('SELECT id, user FROM users')
        users = cursor.fetchall()
        logging.info("Retrieved all users")
        return users


def add_question(question):
    try:
        with sqlite3.connect('MockAI.db') as conn:
            cursor = conn.cursor()
            cursor.execute(
                'INSERT INTO questions (question) VALUES (?)', (question,))
            conn.commit()
            question_id = cursor.lastrowid
            logging.info(f"Added question: {question} with id: {question_id}")
            return question_id
    except sqlite3.IntegrityError as e:
        logging.error(f"IntegrityError: {e}")
        return "Question already exists"


def get_all_questions():
    with sqlite3.connect('MockAI.db') as conn:
        cursor = conn.cursor()
        cursor.execute('SELECT id, question FROM questions')
        questions = cursor.fetchall()
        logging.info("Retrieved all questions")
        return questions


def get_user_by_email(email):
    with sqlite3.connect('MockAI.db') as conn:
        cursor = conn.cursor()
        cursor.execute('SELECT * FROM users WHERE user = ?', (email,))
        user = cursor.fetchone()
        logging.info(f"Retrieved user: {user}")
        return user[1]


def save_transcript(user_id, results):

    try:
        transcript_result = results['results']['channels'][0]['alternatives'][0]['transcript']
        with sqlite3.connect('MockAI.db') as conn:
            cursor = conn.cursor()
            cursor.execute('''
                INSERT INTO results (user_id, question, score, transcript, filler_words, long_pauses)
                VALUES (?, ?, ?, ?, ?, ?)
            ''', (user_id, default_question, default_score, transcript_result, default_filler_words, default_long_pauses))

            conn.commit()
            logging.info("Results saved successfully")
            return True
    except Exception as e:
        logging.error(f"Error saving transcript: {e}")
        return False


def get_last_transcript(user_id):
    try:
        with sqlite3.connect('MockAI.db') as conn:
            cursor = conn.cursor()
            cursor.execute('''
                SELECT transcript FROM results WHERE user_id = ? ORDER BY id DESC LIMIT 1
            ''', (user_id,))
            transcript = cursor.fetchone()
            logging.info(f"Retrieved transcript: {transcript}")
            return transcript[0]
    except Exception as e:
        logging.error(f"Error retrieving transcript: {e}")
        return None


def update_feedback(user_id, feedback):
    try:
        with sqlite3.connect('MockAI.db') as conn:
            cursor = conn.cursor()
            cursor.execute('''
                UPDATE results SET ai_feedback = ? WHERE user_id = ? ORDER BY id DESC LIMIT 1
            ''', (feedback, user_id))
            conn.commit()
            logging.info("Feedback updated successfully")
            return True
    except Exception as e:
        logging.error(f"Error updating feedback: {e}")
        return False


# Initialize the database when this script is executed directly
if __name__ == '__main__':
    init_db()
