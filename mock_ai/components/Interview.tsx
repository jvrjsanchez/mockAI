"use client";
import { useUser } from "@auth0/nextjs-auth0/client";
import VoiceRecorder from "./VoiceRecorder";
import { useState, useEffect } from "react";
import axios from "axios";
import AnalysisCard from "./AnalysisCard";

const Interview = () => {
  const { user, error, isLoading } = useUser();
  const [selectedQuestion, setSelectedQuestion] = useState<
    string | null
  >(null);

  const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

  useEffect(() => {
    const fetchQuestion = async () => {
      try {
        const response = await axios.get(
          baseUrl
            ? `${baseUrl}/service/generate_interview_question`
            : "/service/generate_interview_question",
          {
            headers: { "Content-Type": "application/json" },
          }
        );
        setSelectedQuestion(response.data.question);
      } catch (error) {
        console.error(
          "Error fetching interview question from Gemini:",
          error
        );
      }
    };

    if (user) {
      fetchQuestion();
    }
  }, [user]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
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
    );
  } else {
    return (
      <div className="hero items-center sm:flex-row sm:items-start">
        <div className="flex-1 pt-36 padding-x w-full sm:w-1/2">
          <h1 className="text-2xl font-bold">
            Interview Meeting Room
          </h1>
          <div className="flex flex-col sm:flex-row">
            {selectedQuestion && (
              <div className="w-full">
                <AnalysisCard
                  analysis={[selectedQuestion]}
                  title="Interview Question Provided by mockAI"
                />
                <VoiceRecorder
                  selectedQuestion={selectedQuestion}
                  user={user}
                />
              </div>
            )}
          </div>
          <button className="bg-primary-blue text-white mt-10 rounded-full">
            <a href="/results">View Results</a>
          </button>
        </div>
      </div>
    );
  }
};

export default Interview;
