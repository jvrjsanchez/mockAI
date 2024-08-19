

def analyze_audio(response):
    transcription = response['results']['channels'][0]['alternatives'][0]['transcript']
    filler_words = ['um', 'uh', 'like', 'you know', 'so']
    filler_count = {word: 0 for word in filler_words}

    for word in filler_words:
        filler_count[word] = transcription.lower().count(word)

    word_timestamps = response['results']['channels'][0]['alternatives'][0]['words']
    pauses = []
    for i in range(1, len(word_timestamps)):
        prev_word_end = word_timestamps[i-1]['end']
        current_word_start = word_timestamps[i]['start']
        pause_duration = current_word_start - prev_word_end
        if pause_duration > 10:
            pauses.append(pause_duration)

    result = {
        'filler_word_count': filler_count,
        'long_pauses': len(pauses),
        'pause_durations': pauses,
        'transcript': transcription,
    }

    return result
