# index.py

from flask import Flask, request, jsonify
import os
import json
import logging
from deepgram import DeepgramClient, PrerecordedOptions, FileSource  # type: ignore
from flask_cors import CORS
from dotenv import load_dotenv
from api.audio_analysis import analyze_audio
from api.database import init_db, add_user, get_all_users, add_question, get_all_questions, get_user_by_email, save_transcript, update_feedback
import sqlite3
from api.genai_utils import prompt_with_audio_file, extract_analysis_results
import google.generativeai as genai
from datetime import datetime

from . import app


CORS(app)

logging.basicConfig(level=logging.ERROR)

load_dotenv()

# NOTE did you forget to add your API keys to the .env file?
#      - path: mock_ai/api/.env
API_KEY = os.getenv("DG_API_KEY")
GOOGLE_API_KEY = os.getenv("GOOGLE_API_KEY")
PROMPT_TO_AI_INTERVIEWER = os.getenv("PROMPT_TO_AI_INTERVIEWER")
PROMPT_TO_AI = os.getenv("PROMPT_TO_AI")

# Gemini configuration
#  https://cloud.google.com/generative-ai/docs/gemini/quickstart
genai.configure(api_key=GOOGLE_API_KEY)
model = genai.GenerativeModel(
    'gemini-1.5-pro', generation_config={"response_mime_type": "application/json"})

audio_file_path = os.path.join(os.path.dirname(
    os.path.dirname(__file__)), 'audio.wav')

# Initialize the database
init_db()


@app.route('/service/upload_audio', methods=['POST'])
def upload_audio():
    if 'audio' not in request.files:
        return jsonify({"error": "No audio file provided"}), 400
    elif 'user' not in request.form or 'question' not in request.form:
        return jsonify({"error": "User and question are required"}), 400

    user = request.form.get('user')
    question = request.form.get('question')
    questionId = None

    # The question comes in as a string with the question id in the question. The id is actually the questions primary key, so we need to extract it.
    if question and question[:1].isdigit():
        questionId = int(question[:1])
    else:
        return jsonify({"error": "Invalid question id"}), 400

    audio_file = request.files['audio']
    audio_buffer = audio_file.read()

    # save the audio file
    with open('./audio.wav', 'wb') as f:
        f.write(audio_buffer)

    try:
        # STEP 1 Create a Deepgram client using the API key
        deepgram = DeepgramClient(API_KEY)

        with open('./audio.wav', "rb") as file:
            buffer_data = file.read()

        payload: FileSource = {
            "buffer": buffer_data,
        }

        # STEP 2: Configure Deepgram options for audio analysis
        options = PrerecordedOptions(
            model="nova-2",
            smart_format=True,
            punctuate=True,
            filler_words=True,
            utterances=True,
            utt_split=10000
        )

        # STEP 3: Call the transcribe_file method with the audio payload and options

        response = deepgram.listen.prerecorded.v(
            "1").transcribe_file(payload, options)

        # save the transcript to the feedback table and enter the users email.
        userId = get_user_by_email(user)

        analysis_results = analyze_audio(response)

        # Access the results from the dictionary from analyze_audio using helper.
        long_pauses, pause_durations, transcript, filler_word_count_json = extract_analysis_results(
            analysis_results)

        # Generate score and feedback using Google Gemini
        gemini_response = prompt_with_audio_file(
            PROMPT_TO_AI, audio_file_path, genai)
        feedback = gemini_response.text
        # Assuming score is part of the response metadata
        score = gemini_response.metadata.get('score', 0)

        interview_date = datetime.now().strftime("%Y-%m-%d %H:%M:%S")

        save_transcript(userId, transcript, questionId, question[2:],
                        filler_word_count_json, long_pauses, 0 if len(pause_durations) == 0 else json.dumps(pause_durations), score, feedback, interview_date)

        return jsonify({
            "transcript": transcript,
            "score": score,
            "feedback": feedback,
            "long_pauses": long_pauses,
            "pause_durations": pause_durations,
            "filler_words": filler_word_count_json,
            "interview_date": interview_date
        })

    except Exception as e:
        print(f"Exception: {e}")
        return jsonify({"error": str(e)})


@app.route('/service/health', methods=['GET'])
def health():
    return {"status": "ok", "message": "API listening"}


@app.route('/service/add_user', methods=['POST'])
def add_email_route():
    data = request.json
    email = data['email']

    if not email:
        return jsonify({"error": "Email is required"}), 400

    # if the user already exists in sqlite3, skip to the next step
    user_id = add_user(email, email)

    if user_id is None:
        return jsonify({"error": "User already exists"}), 400

    return jsonify({"message": "Request received", "user_id": user_id}), 200


@app.route('/service/get_users', methods=['GET'])
def get_emails_route():
    emails = get_all_users()
    return jsonify(emails)


@app.route('/service/add_question', methods=['POST'])
def add_question_route():
    data = request.get_json()
    question = data.get('question')

    if not question:
        return jsonify({"error": "Question is required"}), 400

    question_id = add_question(question)

    if question_id == "Question already exists":
        return jsonify({"error": "Question already exists"}), 400

    return jsonify({"id": question_id, "question": question})


@app.route('/service/get_question', methods=['GET'])
def get_questions_route():
    questions = get_all_questions()
    return jsonify(questions)


@app.route('/service/save_results', methods=['POST'])
def save_results():
    data = request.get_json()
    user = data.get('user')
    results = data.get('results')

    if not user or not results:
        return jsonify({"error": "User and results are required"}), 400

    # Save results in the database
    try:
        with sqlite3.connect('MockAI.db') as conn:
            cursor = conn.cursor()
            for result in results:
                cursor.execute('''
                   UPDATE results
                   SET question = ?, score = ?,  long_pauses = ?, 
                   filler_words = ?, pause_durations = ?
                   where id = ?
                ''', (result['question'], result['score'], result['long_pauses'], result['filler_words'], result['pause_durations'], result['id']))
            conn.commit()
            return jsonify({"message": "Results saved successfully"})
    except Exception as e:
        return jsonify({"error": str(e)}), 500


@app.route('/service/get_results', methods=['GET'])
def get_results():
    try:
        user = request.args.get('user').strip()
        user = str(user)
        userId = get_user_by_email(user)

        with sqlite3.connect('MockAI.db') as conn:
            cursor = conn.cursor()
            results = cursor.execute('''
                SELECT * FROM results WHERE user_id = ? ORDER BY id DESC LIMIT 1
            ''', (userId,)).fetchone()
            return jsonify({
                'id': results[0],
                'user': results[1],
                'question': results[3],
                'score': results[4],
                'transcript': results[5],
                'filler_words': results[6],
                'long_pauses': results[7],
                'pause_durations': results[8],
                'ai_feedback': '' if not results[9] else results[9],
                'interview_date': results[10],
            })
    except Exception as e:
        return jsonify({"error": str(e)}), 500


@app.route('/service/get_all_results', methods=['GET'])
def get_all_results():
    try:
        user = request.args.get('user').strip()
        user = str(user)
        userId = get_user_by_email(user)

        with sqlite3.connect('MockAI.db') as conn:
            cursor = conn.cursor()
            results = cursor.execute('''
                SELECT * FROM results WHERE user_id = ? ORDER BY id DESC
            ''', (userId,)).fetchall()
            return jsonify([
                {
                    'id': result[0],
                    'user': result[1],
                    'question': result[3],
                    'score': result[4],
                    'transcript': result[5],
                    'filler_words': result[6],
                    'long_pauses': result[7],
                    'pause_durations': result[8],
                    'ai_feedback': '' if not result[9] else result[9],
                    'interview_date': result[10],
                }
                for result in results
            ])
    except Exception as e:
        return jsonify({"error": str(e)}), 500


@app.route('/service/generate_ai_response', methods=['POST', 'GET'])
def generate_ai_response():
    try:
        data = request.get_json()
        user = data.get('user')
        userId = get_user_by_email(user)

        # Get the last transcript saved for the user
        # NOTE Not used as we pass the audio to the AI model. We can use this if we have problems saving audio in deployment.
        # transcript = get_last_transcript(userId)
        # print("transcript from db [not in use]: ", transcript)

        gemini_response = prompt_with_audio_file(
            PROMPT_TO_AI, audio_file_path, genai)

        if gemini_response and gemini_response.text and user:
            update_feedback(userId, gemini_response.text)
        else:
            print("No response from Gemini and user not provided.")

        return jsonify({"response": gemini_response.text})
    except Exception as e:
        print(f"An error occurred: {e}")
        return jsonify({"error": str(e)}), 500


@app.route('/service/generate_interview_question', methods=['GET'])
def generate_interview_question():
    try:
        prompt = "You are an interviewer for a website called 'mockAI'. Ask a behavioral question to the interviewee. The goal of this question is to understand how the interviewee handles a situation. Ask the interviewee to answer the question within 3 minutes. Address them by their name if you understood it. "
        if not prompt:
            raise ValueError("Prompt not provided")

        logging.debug(f"Prompt: {prompt}")
        gemini_response = model.generate_content(prompt)

        if gemini_response and gemini_response.text:
            question = gemini_response.text
            add_question(question)
            return question
        else:
            print("No response from Gemini and user not provided.")
            return jsonify({"error": "No response from Gemini"}), 500
    except Exception as e:
        logging.error(f"Exception: {e}")
        return jsonify({"error": str(e)}), 500


if __name__ == '__main__':
    app.run(port=3001, debug=True)
