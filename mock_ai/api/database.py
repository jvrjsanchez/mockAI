import sqlite3
import logging

# Configure logging
logging.basicConfig(level=logging.DEBUG)

# Initialize or connect to the SQLite database
def init_db():
    with sqlite3.connect('MockAI.db') as conn:
        cursor = conn.cursor()

        # Create users table if it doesn't exist
        cursor.execute('''
            CREATE TABLE IF NOT EXISTS users (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                user TEXT NOT NULL UNIQUE,
                email TEXT NOT NULL UNIQUE
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
                question TEXT NOT NULL,
                score REAL NOT NULL,
                transcript TEXT NOT NULL,
                filler_words TEXT NOT NULL,
                long_pauses TEXT NOT NULL,
                pause_durations TEXT,
                ai_feedback TEXT,
                interview_date TEXT,
                FOREIGN KEY (user_id) REFERENCES users (id),
                FOREIGN KEY (question_id) REFERENCES questions (id)
            )
        ''')

        conn.commit()
        logging.info("Database initialized successfully.")

def add_user(user, email):
    try:
        with sqlite3.connect('MockAI.db') as conn:
            cursor = conn.cursor()
            cursor.execute('INSERT INTO users (user, email) VALUES (?, ?)', (user, email))
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
        cursor.execute('SELECT id, user, email FROM users')
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
    try:
        with sqlite3.connect('MockAI.db') as conn:
            cursor = conn.cursor()
            cursor.execute('SELECT * FROM users WHERE email = ?', (email, ))
            user = cursor.fetchone()
            logging.info(f"Retrieved user: {user}")
            return user[0]  # return primary key.
    except Exception as e:
        logging.error(f"Error retrieving user: {e}")
        return None


def save_transcript(user_id, transcript, question_id, question, filler_word_count, long_pauses, pause_durations, score, feedback, interview_date):
    try:
        with sqlite3.connect('MockAI.db') as conn:
            cursor = conn.cursor()
            cursor.execute('''
                INSERT INTO results (user_id, question, question_id, score, transcript, filler_words, long_pauses, pause_durations, ai_feedback, interview_date)
                VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
            ''', (user_id, question, question_id, score, transcript, filler_word_count, long_pauses, pause_durations, feedback, interview_date))

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
                            UPDATE results
                            SET ai_feedback = ?
                            WHERE id = (
                                SELECT id FROM results
                                WHERE user_id = ?
                                ORDER BY id DESC
                                LIMIT 1
                            )
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
