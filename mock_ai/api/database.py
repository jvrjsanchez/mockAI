import sqlite3

# Initialize or connect to the SQLite database
def init_db():
    conn = sqlite3.connect('emails.db')
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
    conn.close()

def add_email(email):
    conn = sqlite3.connect('emails.db')
    cursor = conn.cursor()

    try:
        cursor.execute('INSERT INTO emails (email) VALUES (?)', (email,))
        conn.commit()
    except sqlite3.IntegrityError:
        conn.close()
        return "Email already exists"

    email_id = cursor.lastrowid
    conn.close()
    return email_id

def get_all_emails():
    conn = sqlite3.connect('emails.db')
    cursor = conn.cursor()

    cursor.execute('SELECT id, email FROM emails')
    emails = cursor.fetchall()

    conn.close()
    return emails

def add_question(question, email_id=None):
    conn = sqlite3.connect('emails.db')
    cursor = conn.cursor()

    try:
        cursor.execute('INSERT INTO questions (question, email_id) VALUES (?, ?)', (question, email_id))
        conn.commit()
    except sqlite3.IntegrityError:
        conn.close()
        return "Question already exists"

    question_id = cursor.lastrowid
    conn.close()
    return question_id

def get_all_questions():
    conn = sqlite3.connect('emails.db')
    cursor = conn.cursor()

    cursor.execute('SELECT id, question, email_id FROM questions')
    questions = cursor.fetchall()

    conn.close()
    return questions

# Initialize the database when this script is executed directly
if __name__ == '__main__':
    init_db()

# Close the database connection
def close_db():
    conn = sqlite3.connect('emails.db')
    conn.close()