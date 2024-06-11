from flask import Flask, request, render_template, redirect, url_for
import speech_recognition as sr
from pydub import AudioSegment, silence
import os

app = Flask(__name__)

word_count = {}
transcribed_text = ""
pauses = []

def detect_pauses(audio_segment, min_silence_len=3000, silence_thresh=-40):
    return silence.detect_silence(audio_segment, min_silence_len=min_silence_len, silence_thresh=silence_thresh)

def grade_interview(word_count, pauses):
    repeat_penalty = sum(count - 1 for count in word_count.values() if count > 1)
    pause_penalty = len(pauses)
    score = max(100 - (repeat_penalty * 5 + pause_penalty * 10), 0)
    return score

@app.route('/', methods=['GET', 'POST'])
def index():
    global word_count, transcribed_text, pauses
    if request.method == 'POST':
        transcribed_text = ""
        word_count = {}
        pauses = []
        if 'text' in request.form:
            text = request.form['text']
            transcribed_text = text
        elif 'audio' in request.files:
            audio_file = request.files['audio']
            if audio_file:
                audio_path = os.path.join('uploads', 'recording.webm')
                audio_file.save(audio_path)
                try:
                    audio = AudioSegment.from_file(audio_path)
                    wav_path = os.path.join('uploads', 'converted.wav')
                    audio.export(wav_path, format='wav')
                    pauses = detect_pauses(audio)

                    recognizer = sr.Recognizer()
                    with sr.AudioFile(wav_path) as source:
                        audio_data = recognizer.record(source)
                        try:
                            transcribed_text = recognizer.recognize_google(audio_data)
                        except sr.UnknownValueError:
                            transcribed_text = ""
                        except sr.RequestError:
                            return "API unavailable", 503
                except Exception as e:
                    return str(e), 400
                finally:
                    os.remove(audio_path)
                    if os.path.exists(wav_path):
                        os.remove(wav_path)

        if transcribed_text:
            words = transcribed_text.split()
            for word in words:
                word = word.lower().strip('.,!?')
                if word in word_count:
                    word_count[word] += 1
                else:
                    word_count[word] = 1

    score = grade_interview(word_count, pauses) if word_count and pauses else None
    return render_template('index.html', word_count=word_count, transcribed_text=transcribed_text, pauses=pauses, score=score)

@app.route('/restart', methods=['POST'])
def restart():
    global word_count, transcribed_text, pauses
    word_count = {}
    transcribed_text = ""
    pauses = []
    return redirect(url_for('index'))

if __name__ == '__main__':
    if not os.path.exists('uploads'):
        os.makedirs('uploads')
    app.run(debug=True)