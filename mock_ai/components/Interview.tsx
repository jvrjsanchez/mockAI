"use client";
import { useUser } from "@auth0/nextjs-auth0/client";
import { useState, useEffect } from "react";
import axios from "axios";
import AnalysisCard from "./AnalysisCard";
import Link from "next/link";
import VoiceRecorder from "./VoiceRecorder";
import VideoRecorder from "./VideoRecorder";
import { Skeleton } from "./ui/skeleton";
import { Button } from "./ui/Button";
import { Cloud } from "lucide-react";

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
  const [isUploading, setIsUploading] = useState(false);
  const [isQuestionFetching, setIsQuestionFetching] = useState(true);
  const [errorMessage, setErrorMessage] = useState<string | null>(
    null
  );

  const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

  const fetchQuestion = async () => {
    setIsQuestionFetching(true);
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
      setIsQuestionFetching(false);
    } catch (error) {
      setIsQuestionFetching(false);
      setErrorMessage(
        "Failed to fetch the interview question. Please try again."
      );
      console.error(
        "Error fetching interview question from Gemini:",
        error
      );
    }
  };

  useEffect(() => {
    if (user && step === 5 && !selectedQuestion) {
      fetchQuestion();
    }
  }, [user, step, selectedQuestion]);

  const handleNextStep = () => {
    setStepVisible(false);
    setTimeout(() => {
      setStep(step + 1);
      setStepVisible(true);
    }, 500);
  };

  if (isLoading) {
    return (
      <div className="hero">
        <div className="flex-1 pt-36 padding-x mx-auto">
          <h1 className="text-2xl font-bold text-center">
            Loading...
          </h1>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="hero">
        <div className="flex-1 pt-36 padding-x mx-auto">
          <h1 className="text-2xl font-bold text-center">Error</h1>
          <p className="text-lg mt-4">
            Sorry, but there was an error loading the page.
          </p>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="hero">
        <div className="flex-1 pt-36 padding-x mx-auto">
          <h1 className="text-2xl font-bold text-center">
            Interview Meeting Room
          </h1>
          <p className="text-lg mt-4">
            Sorry, but you must be signed in to start your interview.
          </p>
          {/* 'asChild prop on the Button allows the a tag to render but keep the styles of the Button.*/}
          <div className="flex justify-center">
            <Button
              asChild
              variant={"ghost"}
              className="bg-primary-blue text-white mt-10 rounded-full"
            >
              <a href="/api/auth/login">
                Sign In to Start Your Interview
              </a>
            </Button>
          </div>
        </div>
      </div>
    );
  } else {
    return (
      <div className="hero items-center sm:flex-row sm:items-start">
        <div className="flex-1 pt-36 padding-x w-full sm:w-1/2">
          <h1 className="text-md md:text-3xl lg:text-4xl font-bold text-center mb-5">
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
              {/* The AnalysisCard is being used to rendeer the question here.*/}
              <AnalysisCard
                content={[selectedQuestion]}
                title="Interview Question Provided by mockAI"
                type="question"
                isLoading={isQuestionFetching}
              />
              {recordingType === "audio" ? (
                <VoiceRecorder
                  selectedQuestion={selectedQuestion}
                  user={user}
                  onRecordingComplete={() => {
                    setIsQuestionAnswered(true);
                    setIsUploading(false);
                  }}
                  setIsUploading={setIsUploading}
                />
              ) : (
                <VideoRecorder
                  selectedQuestion={selectedQuestion}
                  user={user}
                  onRecordingComplete={() => {
                    setIsQuestionAnswered(true);
                    setIsUploading(false);
                  }}
                  setIsUploading={setIsUploading}
                  isUploading={isUploading}
                />
              )}
            </div>
          )}

          {/* step 6 and possibly loading for question.*/}
          {step === 6 && !selectedQuestion && (
            <div className="space-y-4 transition-opacity duration-500">
              {isQuestionFetching ? (
                <>
                  <Skeleton className="h-3 w-3/4" />
                  <Skeleton className="h-3 w-1/2" />
                  <Skeleton className="h-3 w-3/4" />
                  <Skeleton className="h-3 w-1/2" />
                  <Skeleton className="h-3 w-1/2" />
                  <Skeleton className="h-3 w-2/3" />
                </>
              ) : errorMessage ? (
                <div className="bg-[#131538] text-[#b92e1c] border border-[#f18372] p-4 rounded-lg">
                  <p className="text-lg font-semibold text-center">
                    {errorMessage}
                  </p>
                  <Button
                    onClick={fetchQuestion}
                    className="mt-4 bg-primary-blue text-white hover:bg-primary-blue/90 rounded-full"
                  >
                    Retry
                  </Button>
                </div>
              ) : (
                <p>No question found, please retry.</p>
              )}
            </div>
          )}

          {isUploading || isQuestionAnswered ? (
            <Button
              variant={"outline"}
              disabled={isUploading}
              className={`transition-opacity duration-500 my-2 ease-in-out ${
                isUploading
                  ? "bg-[#ff6db3] text-[#050614] hover:bg-[#ff6db3]/90 opacity-100 visible"
                  : "bg-primary-blue text-white opacity-100 visible"
              }`}
            >
              {isUploading ? (
                <>
                  <Cloud className="mr-2 h-4 w-4" /> Uploading...
                </>
              ) : (
                <Link href="/results">View Results</Link>
              )}
            </Button>
          ) : null}
        </div>
      </div>
    );
  }
};

export default Interview;
