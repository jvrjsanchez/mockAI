import json
import os
import google.generativeai as genai
from flask import send_from_directory
from api import app


PROMPT_TO_AI = os.getenv("PROMPT_TO_AI")


genai.configure(api_key=os.environ["GOOGLE_API_KEY"])


def prompt_with_audio_file(audio_content, question):
    # Create the model
    generation_config = {
        "temperature": 1,
        "top_p": 0.95,
        "top_k": 64,
        "max_output_tokens": 8192,
        "response_mime_type": "text/plain",
    }

    model = genai.GenerativeModel(
        model_name="gemini-1.5-pro",
        generation_config=generation_config,
        system_instruction=ai_sys_instruction(question),
    )

    prompt = PROMPT_TO_AI + question

    temp_audio_file_path = '/tmp/audio.wav'

    try:
        with open(temp_audio_file_path, 'wb') as temp_audio_file:
            temp_audio_file.write(audio_content)

        audio_res = send_from_directory('/tmp', 'audio.wav')

        user_response_audio = genai.upload_file(audio_res)

        response = model.generate_content([prompt, user_response_audio])

        return response.text

    except Exception as e:
        # Handle exceptions (e.g., logging)
        print(f"An error occurred: {e}")
        return None


def text_prompt_for_question():
    # Create the model
    generation_config = {
        "temperature": 0.7,
        "top_p": 0.95,
        "top_k": 64,
        "max_output_tokens": 8192,

        "response_mime_type": "text/plain",
    }

    system_instruction = (
        "Your role is a job interviewer for a website called 'mockAI'. "
        "Ask a behavioral question to the interviewee. The goal of this question is to understand how the interviewee handles a situation. "
        "Ask the interviewee to answer the question within 3 minutes. Address them by their name if you understood it."
    )

    prompt = "You are an interviewer for a website called 'mockAI'. Ask a behavioral question to the interviewee. The goal of this question is to understand how the interviewee handles a situation. Ask the interviewee to answer the question within 3 minutes. Address them by their name if you understood it. "

    model = genai.GenerativeModel(
        model_name="gemini-1.5-pro",
        generation_config=generation_config,
        system_instruction=system_instruction
    )

    response = model.generate_content(
        prompt,
        generation_config=genai.types.GenerationConfig(

            candidate_count=1,

            max_output_tokens=8192,
            temperature=0.7,
        ),
    )
    print("RES: ", response)
    return response.text


def extract_analysis_results(analysis_results):
    """
    Extracts the analysis results from the analysis_results dictionary.
    Parameters:
    analysis_results (dict): The analyze_results results dictionary.
    returns:
    long_pauses (list): A list of long pauses.
    pause_durations (list): A list of pause durations.
    transcript (str): The transcript.
    filler_word_count_json (str): The filler word count as a json string.
    """
    filler_word_count = analysis_results['filler_word_count']
    long_pauses = analysis_results['long_pauses']
    pause_durations = analysis_results['pause_durations']
    transcript = analysis_results['transcript']
    filler_word_count_json = json.dumps(filler_word_count)

    return long_pauses, pause_durations, transcript, filler_word_count_json


def ai_sys_instruction(question: str) -> str:
    """
    Creates a tone and style instructions for the model.
    Parameters:
    question (str): The question the user answered.
    Returns:
    str: The tone and style instructions to be used on the model.
    """

    return f"You are an interview feedback analysis for a website called 'MockAI'. Job seekers submit their audio response to questions and your job is to help them improve, but remember, many job seekers have interview anxiety. The goal of this feedback is not to be too harsh, but give brief feedback where the job seeker can improve. Give a brief feedback on this audio response of an interviewee answering this question: {question} count how many filler words they used. list the filler words out. Give their longest pause in seconds if the pause is greater than 10 seconds. Give th em a made up score out of 10. Thank them for their answer, and sign your name as 'MockAI'. DO NOT include any markdown in your response. Encourage them to keep coming back to MockAI to practice their interviewing skills. Address them by their name if you understood it. If you didn't understand their name, address them as 'interviewee'."