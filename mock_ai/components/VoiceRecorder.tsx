// components/VoiceRecorder.tsx
import React, { useState, useEffect } from 'react'
import Voice from '@react-native-community/voice'
import axios from 'axios'

const VoiceRecorder: React.FC = () => {
  const [recording, setRecording] = useState(false)
  const [transcript, setTranscript] = useState('')
  const [analysis, setAnalysis] = useState('')

  useEffect(() => {
    Voice.onSpeechResults = (event) => {
      setTranscript(event.value[0])
    }

    return () => {
      Voice.destroy().then(Voice.removeAllListeners)
    }
  }, [])

  const startRecording = () => {
    Voice.start('en-US')
    setRecording(true)
  }

  const stopRecording = () => {
    Voice.stop()
    setRecording(false)
  };

  const analyzeResponse = async () => {
    try {
      const response = await axios.post('/api/analyze', { transcript });
      setAnalysis(response.data.analysis);
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <div>
      <button onClick={recording ? stopRecording : startRecording}>
        {recording ? 'Stop Recording' : 'Start Recording'}
      </button>
      <button onClick={analyzeResponse} disabled={!transcript}>
        Analyze Response
      </button>
      <div>
        <h3>Transcript:</h3>
        <p>{transcript}</p>
      </div>
      <div>
        <h3>Analysis:</h3>
        <p>{analysis}</p>
      </div>
    </div>
  )
}

export default VoiceRecorder
