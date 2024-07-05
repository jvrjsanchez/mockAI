

def prompt_with_audio_file(prompt, audio_file_path, genai_instance):

    myfile = genai_instance.upload_file(audio_file_path)
    model = genai_instance.GenerativeModel(
        "gemini-1.5-pro")
    result = model.generate_content([myfile, prompt])

    return result
