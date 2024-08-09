'use client'
import { useUser } from '@auth0/nextjs-auth0/client'
import Questions from './Questions'
import VoiceRecorder from './VoiceRecorder'
import { useEffect, useState } from 'react'
import { fetchQuestions } from '@/app/actions'
import AnalysisCard from './AnalysisCard'
import axios from 'axios'

const Interview = () => {
  const { user, error, isLoading } = useUser()
  const [selectedQuestion, setSelectedQuestion] = useState<string | null>(null);

  useEffect(() => {
    const fetchQuestion = async (retryCount = 0) => {
      console.log(`fetchQuestion called ${retryCount + 1} time(s)`)
    try {
      const response = await axios.get("/service/generate_interview_question", {
        headers: {"Content-Type": "application/json"},
      });
      setSelectedQuestion(response.data.question);
      } catch(error) {
        if (error.response && error.response.status === 429 && retryCount < 5) {
          const retryAfter = error.response.headers["retry-after"] || Math.pow(2, retryCount) * 1000;
          setTimeout(() => fetchQuestion(retryCount + 1), retryAfter);
        } else {
        console.error("Error fetching interview question from Gemini:", error);
        }
      };

      if (user) {
      fetchQuestion();
      }
    }, [user]);

  if (isLoading) {
    return <div>Loading...</div>
  }

  if (error) {
    return <div>Error: {error.message}</div>
  }

  if (!user) {
    return (
      <div className="hero">
        <div className="flex-1 pt-36 padding-x">
          <h1 className="text-2xl font-bold">
            Interview Meeting Room
          </h1>
          <p className="text-lg mt-4">
            Sorry, but you must be signed in to start your interview.
          </p>
          <button className="bg-primary-blue text-white mt-10 rounded-full">
            <a href="/api/auth/login">
              Sign In to Start Your Interview
            </a>
          </button>
        </div>
      </div>
    )
  } else {
    return (
      <div className="hero flex flex-col sm:flex-row">
        <div className="flex-1 pt-36 padding-x">
          <h1 className="text-2xl font-bold">Interview Meeting Room</h1>
          <div className="flex flex-col sm:flex-row">

            <Questions onSelectQuestion={setSelectedQuestion} />
            <VoiceRecorder
              selectedQuestion={selectedQuestion}
              user={user}
            />
          </div>
          <button className="bg-primary-blue text-white mt-10 rounded-full">
            <a href="/results">View Results</a>
          </button>
        </div>
      </div>
    )
  }
}

export default Interview
