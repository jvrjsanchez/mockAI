from .extensions import db
from flask import request, jsonify, session
import requests
import os
import io
import traceback
import json
import logging
import vercel_blob
from deepgram import DeepgramClient, PrerecordedOptions, FileSource
from flask_cors import CORS
from dotenv import load_dotenv
import google.generativeai as genai
from api.genai_utils import text_prompt_for_question, prompt_with_audio_file
from api.audio_analysis import analyze_audio
from api.models import User, Question, Result
from api.genai_utils import prompt_with_audio_file, extract_analysis_results


# https://github.com/orgs/vercel/discussions/6837
# Reference for imports in serverless

from . import app


# Initialize CORS
CORS(app)

logging.basicConfig(level=logging.ERROR)


load_dotenv()


# Initialize Deepgram client
deepgram = DeepgramClient(os.getenv("DG_API_KEY"))

IS_PRODUCTION = os.getenv("FLASK_ENV") == "production"


@app.route("/service/upload_audio", methods=["POST"])
def upload_audio():
    if "audio" not in request.files:
        return jsonify({"error": "No audio file provided"}), 400
    elif "user" not in request.form or "question" not in request.form:
        return jsonify({"error": "User and question are required"}), 400

    user_email = request.form.get("user")
    print("user from response: ", user_email)
    question = request.form.get("question")

    AUDIO_URL = None

    try:
        audio_file = request.files["audio"]
        audio_buffer = audio_file.read()

        # save the audio file in development.
        if not IS_PRODUCTION:
            with open("./audio.wav", "wb") as f:
                f.write(audio_buffer)

        # Transcribe audio using Deepgram
        # https://developers.deepgram.com/reference/listen-remote
        # https://github.com/deepgram/deepgram-python-sdk/blob/main/examples/speech-to-text/rest/url/main.py
        options = PrerecordedOptions(
            model="nova-2",
            smart_format=True,
            punctuate=True,
            filler_words=True,
            utterances=True,
            utt_split=10000,
        )

        if IS_PRODUCTION:
            buffer_data = vercel_blob.put(
                audio_file.filename,
                audio_buffer,
                {
                    "addRandomSuffix": "false",
                },

            )
            logging.info(f"Buffer data: {buffer_data}")
            AUDIO_URL = {"url": buffer_data.get("url")}
            logging.info(f"Audio URL: {AUDIO_URL}")

            response = deepgram.listen.prerecorded.v("1").transcribe_url(
                AUDIO_URL, options
            )
        else:

            payload: FileSource = {
                "buffer": audio_buffer,
            }
            response = deepgram.listen.prerecorded.v("1").transcribe_file(
                payload, options
            )

        userObject = User.query.filter_by(email=user_email).first()

        if userObject is None:
            return jsonify({"error": "User not found"}), 404

        userId = userObject.id

        analysis_results = analyze_audio(response)

        long_pauses, pause_durations, transcript, filler_word_count_json = (
            extract_analysis_results(analysis_results)
        )

        new_result = Result(
            user_id=userId,
            question_id=1,
            question=question,
            transcript=transcript,
            audio_url=AUDIO_URL["url"],
            filler_words=filler_word_count_json,
            long_pauses=long_pauses,
            pause_durations=(
                0 if len(pause_durations) == 0 else json.dumps(pause_durations)
            ),
        )
        db.session.add(new_result)
        db.session.commit()

        return jsonify(analysis_results)

    except json.JSONDecodeError:
        return jsonify({"error": "Invalid JSON in question field"}), 400
    except Exception as e:
        stack_trace = traceback.format_exc()
        logging.error(f"Exception occurred: {e}\n{stack_trace}")
    return (
        jsonify({"error": "An internal error occurred. Please try again later."}),
        500,
    )


@app.route("/service/health", methods=["GET"])
def health():
    return {"status": "ok", "message": "API listening"}


@app.route("/service/add_user", methods=["POST"])
def add_email_route():
    data = request.json
    email = data["email"]

    if not email:
        return jsonify({"error": "Email is required"}), 400

    user = User.query.filter_by(email=email).first()

    if user:
        return jsonify({"error": "User already exists"}), 400

    new_user = User(email=email)
    db.session.add(new_user)
    db.session.commit()

    return jsonify({"message": "User added successfully", "user_id": new_user.id}), 201


@app.route("/service/get_users", methods=["GET"])
def get_emails_route():
    emails = User.query.all()
    return jsonify(emails)


@app.route("/service/add_question", methods=["POST"])
def add_question_route():
    try:
        data = request.get_json()
        question_text = data.get('question')

        if not question_text:
            return jsonify({"error": "Question field is required"}), 400

        new_question = Question(question=question_text)
        db.session.add(new_question)
        db.session.commit()

        return jsonify({"message": "Question added successfully"}), 201

    except json.JSONDecodeError:
        return jsonify({"error": "Invalid JSON in request body"}), 400
    except Exception as e:
        stack_trace = traceback.format_exc()
        logging.error(f"Exception occurred: {e}\n{stack_trace}")
        return jsonify({"error": "An internal error occurred. Please try again later."}), 500


@app.route('/service/generate_interview_question', methods=['GET'])
def generate_interview_question():
    try:

        gemini_response = text_prompt_for_question()

        if gemini_response:
            question = gemini_response
            new_question = Question(question=gemini_response)
            db.session.add(new_question)
            db.session.commit()
            return question
        else:
            print("No response from Gemini and user not provided.")
            return jsonify({"error": "No response from Gemini"}), 500
    except Exception as e:
        db.session.rollback()
        logging.error(f"Exception: {e}")
        return jsonify({"error": str(e)}), 500


@app.route("/service/save_results", methods=["POST"])
def save_results():
    data = request.get_json()
    user = data.get("user")
    results = data.get("results")

    if not user or not results:
        return jsonify({"error": "User and results are required"}), 400

    try:
        userId = User.query.filter_by(email=user).first().id
        for result in results:
            new_result = Result(
                user_id=userId,
                question_id=result.get("question_id"),
                question=result.get("question"),
                transcript=result.get("transcript"),
                filler_word_count=result.get("filler_word_count"),
                long_pauses=result.get("long_pauses"),
                pause_durations=result.get("pause_durations"),
            )
            db.session.add(new_result)
            db.session.commit()

        return jsonify({"message": "Results saved successfully for user"}), 201
    except Exception as e:
        return jsonify({"error": str(e)}), 500


@app.route("/service/get_results", methods=["GET"])
def get_results():
    try:
        user = request.args.get("user").strip()
        userId = User.query.filter_by(email=user).first().id

        results = Result.query.filter_by(user_id=userId).all()
        results_dict = [result.get_as_dict() for result in results]
        return jsonify(results_dict)

    except Exception as e:
        logging.error(f"An error occurred: {e}")
        return jsonify({"error": str(e)}), 500


@app.route('/service/generate_ai_response', methods=['POST', 'GET'])
def generate_ai_response():
    try:
        file_path = '/tmp/audio.wav'
        data = request.get_json()
        user_email = data.get('user')

        userObject = User.query.filter_by(email=user_email).first()
        userId = userObject.id
        result = Result.query.filter_by(
            user_id=userId).order_by(Result.id.desc()).first()

        if not result or not result.audio_url:
            logging.error("Audio URL not found in the Result table")
            return jsonify({'error': 'Audio URL not found'}), 400

        url = result.audio_url
        logging.info(f"Audio URL retrieved from Result table: {url}")

        audio_res = requests.get(url)
        if audio_res.status_code != 200:
            return jsonify({'error': 'Failed to download audio file'}), 400

        if os.path.exists(file_path):
            os.remove(file_path)
            logging.info('Existing audio file deleted')

        with open(file_path, 'xb') as f:
            f.write(audio_res.content)
            logging.info('Audio file saved')

        question = result.question

        audio_file = io.BytesIO(audio_res.content)
        audio_content = audio_file.read()

        gemini_response = prompt_with_audio_file(audio_content, question)

        if gemini_response and user_email:

            result.ai_feedback = gemini_response
            db.session.commit()
        else:
            print("No response from Gemini and user not provided.")

        return jsonify({"response": gemini_response})
    except Exception as e:
        logging.error(f"An error occurred: {e}")
        db.session.rollback()
        return jsonify({"error": str(e)}), 500


if __name__ == "__main__":
    app.run(port=3001, debug=True)
