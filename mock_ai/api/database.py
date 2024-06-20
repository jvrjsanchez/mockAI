import sqlite3
import logging

# Configure logging
logging.basicConfig(level=logging.DEBUG)

# Initialize or connect to the SQLite database
def init_db():
    with sqlite3.connect('emails.db') as conn:
        cursor = conn.cursor()
        
        # Create emails table if it doesn't exist
        cursor.execute('''
            CREATE TABLE IF NOT EXISTS emails (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                email TEXT NOT NULL UNIQUE
            )
        ''')

        # Create questions table if it doesn't exist
        cursor.execute('''
            CREATE TABLE IF NOT EXISTS questions (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                question TEXT NOT NULL,
                email_id INTEGER,
                FOREIGN KEY (email_id) REFERENCES emails(id)
            )
        ''')

        conn.commit()
        logging.info("Database initialized successfully.")

def add_email(email):
    try:
        with sqlite3.connect('emails.db') as conn:
            cursor = conn.cursor()
            cursor.execute('INSERT INTO emails (email) VALUES (?)', (email,))
            conn.commit()
            email_id = cursor.lastrowid
            logging.info(f"Added email: {email} with id: {email_id}")
            return email_id
    except sqlite3.IntegrityError as e:
        logging.error(f"IntegrityError: {e}")
        return "Email already exists"

def get_all_emails():
    with sqlite3.connect('emails.db') as conn:
        cursor = conn.cursor()
        cursor.execute('SELECT id, email FROM emails')
        emails = cursor.fetchall()
        logging.info("Retrieved all emails")
        return emails

def add_question(question, email_id=None):
    try:
        with sqlite3.connect('emails.db') as conn:
            cursor = conn.cursor()
            cursor.execute('INSERT INTO questions (question, email_id) VALUES (?, ?)', (question, email_id))
            conn.commit()
            question_id = cursor.lastrowid
            logging.info(f"Added question: {question} with id: {question_id}")
            return question_id
    except sqlite3.IntegrityError as e:
        logging.error(f"IntegrityError: {e}")
        return "Question already exists"

def get_all_questions():
    with sqlite3.connect('emails.db') as conn:
        cursor = conn.cursor()
        cursor.execute('SELECT id, question, email_id FROM questions')
        questions = cursor.fetchall()
        logging.info("Retrieved all questions")
        return questions

# Initialize the database when this script is executed directly
if __name__ == '__main__':
    init_db()