"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useUser } from "@auth0/nextjs-auth0/client";
import AnalysisCard from "./AnalysisCard";

const Results = () => {
  const { user } = useUser();
  const [results, setResults] = useState<any[]>([]); // Treat results as an array
  const [saveResults, setSaveResults] = useState(false);
  const [analysisLoading, setAnalysisLoading] = useState(false);
  const [email, setEmail] = useState(user?.email);

  useEffect(() => {
    setEmail(user?.email);
  }, [user?.email]);

  // Fetch results and handle both object and array response
  useEffect(() => {
    if (email) {
      axios
        .get("/service/get_results", {
          params: { user: user?.email },
          headers: { "Content-Type": "application/json" },
        })
        .then((response) => {
          // Check if response is an array or object
          const fetchedResults = Array.isArray(response.data)
            ? response.data
            : [response.data]; // If it's an object, convert it to an array

          setResults(fetchedResults); // Save fetched results in state
          console.log('Fetched results:', fetchedResults);

          // Fetch AI analysis after fetching results
          fetchAIAnalysis(fetchedResults);
        })
        .catch((error) => {
          console.error("Error fetching results:", error);
        });
    }
  }, [email]);

  // Fetch AI analysis and update results state with ai_feedback
  const fetchAIAnalysis = (fetchedResults) => {
    if (email) {
      setAnalysisLoading(true);

      axios
        .post(
          "/service/generate_ai_response",
          { user: user?.email },
          {
            headers: { "Content-Type": "application/json" },
          }
        )
        .then((response) => {
          const analysisData = typeof response.data.response === 'string'
            ? [response.data.response]
            : Array.isArray(response.data.response)
            ? response.data.response
            : [];

          // Update each result with its corresponding ai_feedback
          const updatedResults = fetchedResults.map((result, index) => ({
            ...result,
            ai_feedback: analysisData[index] || '' // Assign corresponding analysis or empty string
          }));

          setResults(updatedResults); // Update the results state with ai_feedback
          console.log('Updated results with AI feedback:', updatedResults);
        })
        .catch((error) => {
          console.error("Error fetching analysis:", error);
        })
        .finally(() => setAnalysisLoading(false));
    }
  };

  const handleSaveToggle = () => {
    setSaveResults(!saveResults); // Toggle the saveResults state
  };

  const handleSaveResults = () => {
    if (results.length === 0) {
      alert("No results available to save. Please ensure you have completed the interview.");
      console.warn('Attempted to save results, but the results array is empty.');
      return;
    }

    if (saveResults) {
      const payload = {
        user: user?.email,
        results: results.map(result => ({
          question_id: result.question_id,
          question: result.question,
          transcript: result.transcript,
          score: result.score,
          filler_word_count: result.filler_words,
          long_pauses: result.long_pauses,
          pause_durations: result.pause_durations,
          ai_feedback: result.ai_feedback || '' // Include ai_feedback
        }))
      };

      console.log('Saving results payload:', payload);

      axios
        .post('/service/save_results', payload)
        .then(() => {
          alert('Results saved successfully.');
        })
        .catch((error) => {
          console.error('Error saving results:', error);
        });
    } else {
      console.log('Save results is not enabled.');
    }
  };

  const handleStartNewInterview = () => {
    window.location.href = "/interview";
  };

  const handleSignOut = () => {
    window.location.href = "/api/auth/logout";
  };

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
    );
  } else {
    return (
      <div className="hero">
        <div className="flex-1 pt-36 padding-x">
          <h1 className="text-2xl font-bold">
            Your Interview Feedback Powered by mockAI
          </h1>
          {results.length > 0 ? (
            results.map((result, index) => (
              <div key={index} className="result-card">
                <h2 className="text-xl font-bold">{result.question}</h2>
                <p>
                  <strong>Score:</strong> {result.score}
                </p>
                <p>
                  <strong>Transcript:</strong> {result.transcript}
                </p>
                <p>
                  <strong>Filler Words:</strong> {result.filler_words}
                </p>
                <p>
                  <strong>Long Pauses:</strong> {result.long_pauses}
                </p>
                <p>
                  <strong>Pause Durations:</strong>{" "}
                  {result.pause_durations}
                </p>
                <p>
                  <strong>Interview Date:</strong>{" "}
                  {result.interview_date}
                </p>
                <p>
                  <strong>AI Feedback:</strong> {result.ai_feedback}
                </p>
              </div>
            ))
          ) : (
            <p>No results available</p>
          )}
          {analysisLoading && (
            <p className="animate-ping text-center">
              Analyzing your answer...
            </p>
          )}
          <AnalysisCard
            title="Mock AI Analysis"
            analysis={results.map(result => result.ai_feedback)}
          />
          <div className="flex items-center mt-4">
            <label className="mr-2 text-lg font-medium">
              Save Results
            </label>
            <input
              type="checkbox"
              checked={saveResults}
              onChange={handleSaveToggle} // Toggle save state
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
    );
  }
};

export default Results;
