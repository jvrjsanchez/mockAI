"use client";
import { useUser } from "@auth0/nextjs-auth0/client";
import { useState, useEffect } from "react";
import axios from "axios";
import AnalysisCard from "./AnalysisCard";
import VoiceRecorder from "./VoiceRecorder";
import VideoRecorder from "./VideoRecorder";

const Interview = () => {
  const { user, error, isLoading } = useUser();
  const [step, setStep] = useState(1);
  const [selectedQuestion, setSelectedQuestion] = useState<
    string | null
  >(null);
  const [name, setName] = useState("");
  const [company, setCompany] = useState("");
  const [position, setPosition] = useState("");
  const [questionType, setQuestionType] = useState("technical");
  const [recordingType, setRecordingType] = useState<
    "audio" | "video"
  >("audio");
  const [isQuestionAnswered, setIsQuestionAnswered] = useState(false);
  const [stepVisible, setStepVisible] = useState(true);

  const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

  const fetchQuestion = async () => {
    try {
      const response = await axios.get(
        baseUrl
          ? `${baseUrl}/service/generate_interview_question`
          : "/service/generate_interview_question",
        {
          params: {
            name,
            company,
            position,
            interview_type: questionType,
          },
          headers: { "Content-Type": "application/json" },
        }
      );
      setSelectedQuestion(response.data);
    } catch (error) {
      console.error(
        "Error fetching interview question from Gemini:",
        error
      );
    }
  };

  useEffect(() => {
    if (user && step === 5) {
      fetchQuestion();
    }
  }, [user, step]);

  const handleNextStep = () => {
    setStepVisible(false);
    setTimeout(() => {
      setStep(step + 1);
      setStepVisible(true);
    }, 500);
  };

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

          {step === 1 && (
            <div
              className={`fade-in ${!stepVisible ? "fade-out" : ""}`}
            >
              <div className="flex flex-col mb-6">
                <label>Your Name:</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="border p-2 text-black"
                />
              </div>
              <button
                onClick={handleNextStep}
                className="bg-primary-blue text-white mt-4 rounded-full p-2"
              >
                Next
              </button>
            </div>
          )}

          {step === 2 && (
            <div
              className={`fade-in ${!stepVisible ? "fade-out" : ""}`}
            >
              <div className="flex flex-col mb-6">
                <label>Company:</label>
                <input
                  type="text"
                  value={company}
                  onChange={(e) => setCompany(e.target.value)}
                  className="border p-2 text-black"
                />
              </div>
              <button
                onClick={handleNextStep}
                className="bg-primary-blue text-white mt-4 rounded-full p-2"
              >
                Next
              </button>
            </div>
          )}

          {step === 3 && (
            <div
              className={`fade-in ${!stepVisible ? "fade-out" : ""}`}
            >
              <div className="flex flex-col mb-6">
                <label>Position:</label>
                <input
                  type="text"
                  value={position}
                  onChange={(e) => setPosition(e.target.value)}
                  className="border p-2 text-black"
                />
              </div>
              <button
                onClick={handleNextStep}
                className="bg-primary-blue text-white mt-4 rounded-full p-2"
              >
                Next
              </button>
            </div>
          )}

          {step === 4 && (
            <div
              className={`fade-in ${!stepVisible ? "fade-out" : ""}`}
            >
              <div className="flex flex-col mb-6">
                <label>Question Type:</label>
                <select
                  value={questionType}
                  onChange={(e) => setQuestionType(e.target.value)}
                  className="border p-2 text-black"
                >
                  <option value="technical">Technical</option>
                  <option value="behavioral">Behavioral</option>
                </select>
              </div>
              <button
                onClick={handleNextStep}
                className="bg-primary-blue text-white mt-4 rounded-full p-2"
              >
                Next
              </button>
            </div>
          )}

          {step === 5 && (
            <div
              className={`fade-in ${!stepVisible ? "fade-out" : ""}`}
            >
              <div className="flex flex-col mb-6">
                <label>Recording Type:</label>
                <select
                  value={recordingType}
                  onChange={(e) => setRecordingType(e.target.value)}
                  className="border p-2 text-black"
                >
                  <option value="audio">Audio</option>
                  <option value="video">Video</option>
                </select>
              </div>
              <button
                onClick={() => setStep(step + 1)}
                className="bg-primary-blue text-white mt-4 rounded-full p-2"
              >
                Start Interview
              </button>
            </div>
          )}

          {step === 6 && selectedQuestion && (
            <div
              className={`fade-in ${!stepVisible ? "fade-out" : ""}`}
            >
              <AnalysisCard
                analysis={[selectedQuestion]}
                title="Interview Question Provided by mockAI"
              />
              {recordingType === "audio" ? (
                <VoiceRecorder
                  selectedQuestion={selectedQuestion}
                  user={user}
                  onRecordingComplete={() =>
                    setIsQuestionAnswered(true)
                  }
                />
              ) : (
                <VideoRecorder
                  selectedQuestion={selectedQuestion}
                  user={user}
                  onRecordingComplete={() =>
                    setIsQuestionAnswered(true)
                  }
                />
              )}
            </div>
          )}

          <button
            className="bg-primary-blue text-white mt-10 rounded-full"
            onClick={() => (window.location.href = "/results")}
          >
            View Results
          </button>
        </div>
      </div>
    );
  }
};

export default Interview;
