from flask import Flask, request, jsonify
import os
from deepgram import DeepgramClient, PrerecordedOptions, FileSource
from flask_cors import CORS
from dotenv import load_dotenv
from database import add_email, get_all_emails, add_question, get_all_questions, init_db

app = Flask(__name__)
CORS(app)

load_dotenv()

# did you forget to add your API key to the .env file?
API_KEY = os.getenv("DG_API_KEY")

@app.route('/api', methods=['POST'])
def api():
    data = request.get_json()
    return jsonify(data)

@app.route('/api/upload_audio', methods=['POST'])
def upload_audio():
    if 'audio' not in request.files:
        return "No audio file provided", 400

    audio_file = request.files['audio']
    audio_buffer = audio_file.read()

    # save the audio file
    with open('./audio.webm', 'wb') as f:
        f.write(audio_buffer)

    try:
        # STEP 1 Create a Deepgram client using the API key
        deepgram = DeepgramClient(API_KEY)

        with open('./audio.webm', "rb") as file:
            buffer_data = file.read()

        payload: FileSource = {
            "buffer": buffer_data,
        }

        # STEP 2: Configure Deepgram options for audio analysis
        options = PrerecordedOptions(
            model="nova-2",
            smart_format=True,
            # intents=True,
            # summarize="v2",
            # topics=True,
        )

        # STEP 3: Call the transcribe_file method with the audio payload and options
        response = deepgram.listen.prerecorded.v(
            "1").transcribe_file(payload, options)

        # STEP 4: Print the response
        print(response.to_json(indent=4))
        return jsonify(response.to_json(indent=4))

    except Exception as e:
        print(f"Exception: {e}")
        return jsonify({"error": str(e)})

@app.route('/api/health', methods=['GET'])
def health():
    return {"status": "ok", "message": "API listening"}

@app.route('/api/add_email', methods=['POST'])
def add_email_route():
    data = request.get_json()
    email = data.get('email')

    if not email:
        return jsonify({"error": "Email is required"}), 400

    email_id = add_email(email)

    if email_id == "Email already exists":
        return jsonify({"error": "Email already exists"}), 400

    return jsonify({"id": email_id, "email": email})

@app.route('/api/get_emails', methods=['GET'])
def get_emails_route():
    emails = get_all_emails()
    return jsonify(emails)

@app.route('/api/add_question', methods=['POST'])
def add_question_route():
    data = request.get_json()
    question = data.get('question')
    email_id = data.get('email_id')

    if not question:
        return jsonify({"error": "Question is required"}), 400

    question_id = add_question(question, email_id)

    if question_id == "Question already exists":
        return jsonify({"error": "Question already exists"}), 400

    return jsonify({"id": question_id, "question": question, "email_id": email_id})

@app.route('/api/get_questions', methods=['GET'])
def get_questions_route():
    questions = get_all_questions()
    return jsonify(questions)

# Initialize the database when this script is executed directly
if __name__ == '__main__':
    init_db()
    app.run(port=3001, debug=True)