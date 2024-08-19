
from flask import request, jsonify
import logging
import os
from flask_cors import CORS
from api.audio_analysis import analyze_audio
from api.database import get_user_by_email, save_transcript
from api.genai_utils import prompt_with_audio_file, extract_analysis_results
from datetime import datetime


from . import app


CORS(app)

API_KEY = os.getenv("DG_API_KEY")
GOOGLE_API_KEY = os.getenv("GOOGLE_API_KEY")
PROMPT_TO_AI_INTERVIEWER = os.getenv("PROMPT_TO_AI_INTERVIEWER")
PROMPT_TO_AI = os.getenv("PROMPT_TO_AI")

logging.basicConfig(level=logging.ERROR)

audio_file_path = os.path.join(os.path.dirname(
    os.path.dirname(__file__)), 'audio.wav')


@app.route('/service/health', methods=['GET'])
def health():
    return {"status": "ok", "message": "API listening"}


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
        from deepgram import DeepgramClient, PrerecordedOptions, FileSource
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
            audio_file_path, question)
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


if __name__ == '__main__':
    app.run(port=3001, debug=True)
