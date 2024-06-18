import sqlite3

def init_db():
    conn = sqlite3.connect('emails.db')
    cursor = conn.cursor()

    # Create table if it doesn't exist
    cursor.execute('''
        CREATE TABLE IF NOT EXISTS emails (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            email TEXT NOT NULL UNIQUE
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
    
    cursor.execute('SELECT id FROM emails WHERE email = ?', (email,))
    email_id = cursor.fetchone()[0]

    conn.close()
    return email_id

def get_all_emails():
    conn = sqlite3.connect('emails.db')
    cursor = conn.cursor()

    cursor.execute('SELECT id, email FROM emails')
    emails = cursor.fetchall()

    conn.close()
    return emails

# Initialize the database
init_db()