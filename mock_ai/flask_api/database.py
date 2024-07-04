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
                user TEXT NOT NULL,
                question TEXT NOT NULL,
                score REAL NOT NULL,
                transcript TEXT NOT NULL,
                filler_words TEXT NOT NULL,
                long_pauses TEXT NOT NULL,
                FOREIGN KEY (user) REFERENCES users (user)
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


def save_transcript(user, results):

    try:
        transcript_result = results['results']['channels'][0]['alternatives'][0]['transcript']
        with sqlite3.connect('MockAI.db') as conn:
            cursor = conn.cursor()
            cursor.execute('''
                INSERT INTO results (user, question, score, transcript, filler_words, long_pauses)
                VALUES (?, ?, ?, ?, ?, ?)
            ''', (user, "Why should I hire you?", 50, transcript_result, "uh", "0"))

            conn.commit()
            logging.info("Results saved successfully")
            return True
    except Exception as e:
        logging.error(f"Error saving transcript: {e}")
        return False


# Initialize the database when this script is executed directly
if __name__ == '__main__':
    init_db()
