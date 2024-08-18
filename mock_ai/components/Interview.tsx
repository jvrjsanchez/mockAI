"use client";
import { useState, useEffect } from "react";
import { Questions } from "./Questions";
import { fetchQuestions } from "@/app/actions";
import { useVoiceRecorder } from "@/hooks/useVoiceRecorder";
import useFetchFeedback from "@/hooks/useFetchFeedback";
import useUploadAudio from "@/hooks/useUpload";
import { Feedback, Question } from "@/types";
import FillerCount from "./FillerCount";
import { Stats } from "./Stats";

import AIFeedback from "./AIFeedback";

export function Interview() {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [selectedQuestion, setSelectedQuestion] =
    useState<Question | null>(null);
  const [notification, setNotification] = useState<string | null>(
    null
  );
  const [feedback, setFeedback] = useState<Feedback | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [analysis, setAnalysis] = useState<string[]>([]);
  const [uploaded, setUploaded] = useState(false);

  const {
    isRecording,
    recordingComplete,
    audioUrl,
    transcript,
    startRecording,
    stopRecording,
    audioBlob,
    recordingTime,
  } = useVoiceRecorder()!;

  const { isLoading, error: uploadError } = useUploadAudio();

  const handleUpload = async (audioBlob: Blob) => {
    const formData = new FormData();
    formData.append("audio", audioBlob, "audio.wav");
    formData.append("user", "test@example.com");
    const questionAsString = selectedQuestion
      ? JSON.stringify(selectedQuestion)
      : "";
    formData.append("question", questionAsString);

    try {
      const response = await fetch("/service/upload_audio", {
        method: "POST",
        body: formData,
      });
      const data = await response.json();
      console.log(data);
      setFeedback(data);
      setShowFeedback(true);
    } catch (error) {
      console.error("Error uploading audio file:", error);
      setFeedback(null);
      setShowFeedback(false);
    }
  };

  const handleToggleRecording = async () => {
    if (!selectedQuestion) {
      return setNotification(
        "Please select a question before recording."
      );
    }

    if (!isRecording) {
      setNotification(null);
      startRecording();
    } else {
      stopRecording();
    }
  };

  useEffect(() => {
    if (recordingComplete && audioBlob) {
      // reset feedback
      setFeedback(null);
      handleUpload(audioBlob).then(() => setUploaded(true));
    }

    return () => {
      setUploaded(false);
    };
  }, [recordingComplete, audioBlob]);

  useEffect(() => {
    if (uploaded && !uploadError) {
      fetch("/service/generate_ai_response", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ user: "test@example.com" }),
      })
        .then((response) => {
          console.log(response);
          if (!response.ok) {
            throw new Error("Failed to fetch results");
          }
          return response.json();
        })
        .then((data) => {
          console.log(data);
          setAnalysis(data);
        })
        .catch((error) => {
          console.error("Error fetching results:", error);
        });
    }
  }, [uploaded]);

  useEffect(() => {
    async function fetchData() {
      const response: Question[] = await fetchQuestions();
      setQuestions(response);
    }
    fetchData();
  }, []);

  console.log(isRecording);
  console.log(analysis.response);
  const extractFeedbackDetails = (response) => {
    const scoreMatch = response.match(/score is (\d\/10)/);

    const fillerWordsMatch = response.match(
      /filler words like "(.*?)"/
    );

    const score = scoreMatch ? scoreMatch[1] : null;

    const fillerWords = fillerWordsMatch
      ? fillerWordsMatch[1].split(",").map((word) => word.trim())
      : [];

    return {
      score,
      fillerWords,
    };
  };

  let score, fillerWords;

  if (analysis && analysis.response) {
    const feedbackDetails = extractFeedbackDetails(analysis.response);
    score = feedbackDetails.score;
    fillerWords = feedbackDetails.fillerWords;
  }

  console.log("Score:", score); // Debugging line
  console.log("Filler Words:", fillerWords); // Debugging line

  return (
    <div className="w-full max-w-4xl mx-auto py-12 md:py-16 lg:py-20">
      <div className="space-y-8">
        <div className="py-2">
          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl text-secondary-foreground text-center">
            Behavioral Interview Practice
          </h1>
          <p className="mt-2 text-muted-foreground text-center">
            Select a question to practice your response.
          </p>
        </div>
        <div className="bg-card rounded-lg overflow-hidden mx-4">
          <div className="px-2 py-2 bg-card-foreground">
            <h2 className="text-lg font-medium text-[#41D4FC] ">
              Interview Questions
            </h2>
          </div>
          <Questions
            questions={questions}
            selectedQuestion={selectedQuestion}
            onSelectQuestion={setSelectedQuestion}
            setNotification={setNotification}
          />
        </div>
        <div className="bg-card rounded-lg overflow-hidden mx-4">
          <div className="px-2 py-2 bg-card-foreground">
            <h2 className="text-lg font-medium">Practice Response</h2>
          </div>
          <div className="p-6 space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="text-base font-medium">
                {selectedQuestion
                  ? selectedQuestion.question
                  : "Select a question in the list above."}
              </h3>
              <div className="flex items-center gap-2">
                <div className="bg-primary text-primary-foreground px-3 py-1 rounded-full text-sm font-medium">
                  {recordingTime}
                </div>
                <button className="text-primary">
                  <MicIcon
                    className={
                      isRecording
                        ? "animate-pulse h-6 w-6 text-red-500"
                        : "h-6 w-6 text-popover-foreground"
                    }
                    onClick={handleToggleRecording}
                  />
                </button>
              </div>
            </div>
            {notification && (
              <div className="text-red-500">{notification}</div>
            )}
            <div className="bg-muted rounded-lg p-4">
              <p className="text-muted-foreground">
                {transcript && (
                  <span className="text-black">{transcript}</span>
                )}
              </p>
            </div>
          </div>
        </div>
        <div className="bg-card rounded-lg overflow-hidden mx-6">
          <div className="px-2 py-2 bg-card-foreground">
            <h2 className="text-lg font-medium ">Feedback</h2>
          </div>
          <div className="p-6 space-y-4">
            {feedback && <Stats fillerWords={feedback!} />}

            <AIFeedback feedbackData={analysis} />
            <div>
              <h3 className="text-base font-medium">Strengths</h3>
              <ul className="mt-2 space-y-2 text-muted-foreground">
                {isLoading && (
                  <div className="flex items-center mt-6 space-x-2">
                    <svg
                      className="animate-spin h-5 w-5 text-gray-600"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291l1.42 1.42A8 8 0 014 12H0c0 3.314 1.344 6.314 3.512 8.512z"
                      ></path>
                    </svg>
                    <span className="text-gray-600">
                      Uploading...
                    </span>
                  </div>
                )}

                <li>
                  <CheckIcon className="mr-2 inline-block h-4 w-4 text-green-500" />
                  Showed empathy and a willingness to understand the
                  other persons perspective
                </li>
                <li>
                  <CheckIcon className="mr-2 inline-block h-4 w-4 text-green-500" />
                  Proposed constructive solutions to address the
                  issues
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-base font-medium">
                Areas for Improvement
              </h3>
              <ul className="mt-2 space-y-2 text-muted-foreground">
                {fillerWords &&
                  fillerWords.map((word, i) => (
                    <li key={i}>
                      <XIcon className="mr-2 inline-block h-4 w-4 text-red-500" />
                      Used filler words like "{word}"
                    </li>
                  ))}
                <li>
                  <XIcon className="mr-2 inline-block h-4 w-4 text-red-500" />
                  Could have provided more specific examples to
                  illustrate the situation
                </li>
                <li>
                  <XIcon className="mr-2 inline-block h-4 w-4 text-red-500" />
                  Response could have been more concise and focused
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function CheckIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M20 6 9 17l-5-5" />
    </svg>
  );
}

function MicIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z" />
      <path d="M19 10v2a7 7 0 0 1-14 0v-2" />
      <line x1="12" x2="12" y1="19" y2="22" />
    </svg>
  );
}

function XIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M18 6 6 18" />
      <path d="m6 6 12 12" />
    </svg>
  );
}
