import json


def prompt_with_audio_file(prompt, audio_file_path, genai_instance):

    myfile = genai_instance.upload_file(audio_file_path)
    model = genai_instance.GenerativeModel(
        "gemini-1.5-pro")
    result = model.generate_content([myfile, prompt])

    return result


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
