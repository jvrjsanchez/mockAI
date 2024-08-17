'use client'
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useUser } from '@auth0/nextjs-auth0/client'
import AnalysisCard from './AnalysisCard'

const Results = () => {
  const { user } = useUser()
  const [results, setResults] = useState<any[]>([])
  const [saveResults, setSaveResults] = useState(false)
  const [analysis, setAnalysis] = useState<any>(null)
  const [analysisLoading, setAnalysisLoading] = useState(false)
  const [email, setEmail] = useState(user?.email)

  useEffect(() => {
    setEmail(user?.email)
  }, [user?.email])

  useEffect(() => {
    if (email) {
      axios
        .get('/service/get_results', {
          params: { user: user?.email },
          headers: { 'Content-Type': 'application/json' }
        })
        .then((response) => {
          setResults([response.data])
        })
        .catch((error) => {
          console.error('Error fetching results:', error)
        })
    }
  }, [email])

  useEffect(() => {
    if (email) {
      setAnalysisLoading(true)

      axios
        .post(
          '/service/generate_ai_response',
          { user: user?.email },
          {
            headers: { 'Content-Type': 'application/json' }
          }
        )
        .then((response) => {
          setAnalysis([response.data.response])
        })
        .catch((error) => {
          console.error('Error fetching results:', error)
        })
        .finally(() => setAnalysisLoading(false))
    }
  }, [email])

  const handleSaveToggle = () => {
    setSaveResults(!saveResults)
  }

  const handleSaveResults = () => {
    if (saveResults) {
      axios
        .post('/service/save_results', { user: user?.email, results })
        .then(() => {
          alert('Results saved successfully.')
        })
        .catch((error) => {
          console.error('Error saving results:', error)
        })
    }
  }

  const handleStartNewInterview = () => {
    window.location.href = '/interview'
  }

  const handleSignOut = () => {
    window.location.href = '/api/auth/logout'
  }

  if (!user) {
    return (
      <div className="hero">
        <div className="flex-1 pt-36 padding-x">
          <h1 className="text-2xl font-bold">
            Your Interview Results Powered by mockAI
          </h1>
          <p className="text-lg mt-4">
            Sorry, but you must be signed in to review your results.
          </p>
          <button className="bg-primary-blue text-white mt-10 rounded-full">
            <a href="/api/auth/login">
              Sign In to Review Your Results
            </a>
          </button>
        </div>
      </div>
    )
  } else {
    return (
      <div className="hero">
        <div className="flex-1 pt-36 padding-x">
          <h1 className="text-2xl font-bold">
            Your Interview Feedback Powered by mockAI
          </h1>
          <h2></h2>
          {results.map((result, index) => (
            <div key={index} className="result-card">
              <h2 className="text-xl font-bold">{result.question}</h2>
              <p><strong>Score:</strong> {result.score}</p>
              <p><strong>Transcript:</strong> {result.transcript}</p>
              <p><strong>Filler Words:</strong> {result.filler_words}</p>
              <p><strong>Long Pauses:</strong> {result.long_pauses}</p>
              <p><strong>Pause Durations:</strong> {result.pause_durations}</p>
              <p><strong>Interview Date:</strong> {result.interview_date}</p>
            </div>
          ))}
          {analysisLoading && (
            <p className="animate-ping text-center">
              Analyzing your answer...
            </p>
          )}
          <AnalysisCard
            title="Mock AI Analysis"
            analysis={analysis}
          />
          <div className="flex items-center mt-4">
            <label className="mr-2 text-lg font-medium">
              Save Results
            </label>
            <input
              type="checkbox"
              checked={saveResults}
              onChange={handleSaveToggle}
              className="w-6 h-6"
            />
          </div>
          <button
            onClick={handleSaveResults}
            className="bg-primary-blue text-white mt-4 rounded-full p-2"
          >
            Save Results
          </button>
          <div className="flex justify-between mt-6">
            <button
              onClick={handleStartNewInterview}
              className="bg-green-500 text-white rounded-full p-2"
            >
              Start New Interview
            </button>
            <button
              onClick={handleSignOut}
              className="bg-red-500 text-white rounded-full p-2"
            >
              Sign Out
            </button>
          </div>
        </div>
      </div>
    )
  }
}

export default Results
