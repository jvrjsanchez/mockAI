"use client";
import { useState, useEffect } from "react";
import { useVoiceRecorder } from "@/hooks/useVoiceRecorder";
import useUploadAudio from "@/hooks/useUpload";
import FillerCount from "./FillerCount";
import { Feedback } from "@/types";

interface VoiceRecorderProps {
  selectedQuestion: string;
  user: any;
}

export default function VoiceRecorder({
  selectedQuestion,
  user,
}: VoiceRecorderProps) {
  const [feedback, setFeedback] = useState<Feedback | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);

  const {
    isRecording,
    recordingComplete,
    audioUrl,
    transcript,
    startRecording,
    stopRecording,
    audioBlob,
  } = useVoiceRecorder()!;

  const { isLoading, error } = useUploadAudio();

  const handleUpload = async (audioBlob: Blob) => {
    const formData = new FormData();
    formData.append("audio", audioBlob);
    formData.append("user", user.email);
    formData.append("question", selectedQuestion);

    try {
      const response = await fetch(
        "http://localhost:3001/service/upload_audio",
        {
          method: "POST",
          body: formData,
        }
      );
      const data = await response.json();
      setFeedback(data);
      setShowFeedback(true);
    } catch (error) {
      console.error("Error uploading audio file:", error);
      setFeedback(null);
      setShowFeedback(false);
    }
  };

  const handleToggleRecording = async () => {
    if (!isRecording) {
      startRecording();
    } else {
      stopRecording();
    }
  };

  useEffect(() => {
    if (recordingComplete && audioBlob) {
      // reset feedback
      setFeedback(null);
      handleUpload(audioBlob);
    }
  }, [recordingComplete, audioBlob]);

  console.log(selectedQuestion);

  return (
    <div className="flex items-center justify-center h-screen w-full">
      <div className="w-full">
        {(isRecording || transcript) && (
          <div className="w-1/4 m-auto rounded-md border p-4 bg-white">
            <div className="flex-1 flex w-full justify-between">
              <div className="space-y-1">
                <p className="text-sm font-medium leading-none">
                  {isRecording ? "Recording" : "Recorded"}
                </p>
                <p className="text-sm text-muted-foreground">
                  {isRecording
                    ? "What are your thoughts on this question?...."
                    : "Thank you for your interview."}
                </p>
              </div>
              {isRecording && (
                <div className="rounded-full w-4 h-4 bg-red-400 animate-pulse" />
              )}
            </div>

            {transcript && (
              <div className="border rounded-md p-2 h-full  mt-4">
                <p className="mb-0">{transcript}</p>
              </div>
            )}
            {audioUrl && (
              <div className="mt-4">
                <audio className="w-full" src={audioUrl} controls />
              </div>
            )}
          </div>
        )}

        <div className="flex items-center w-full justify-center mt-6">
          {isRecording ? (
            <button
              onClick={handleToggleRecording}
              className="mt-10 m-auto flex items-center justify-center bg-red-400 hover:bg-red-500 rounded-full w-20 h-20 focus:outline-none"
            >
              <svg
                className="h-12 w-12"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill="white"
                  d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"
                />
              </svg>
            </button>
          ) : (
            <button
              onClick={handleToggleRecording}
              className="mt-10 m-auto flex items-center justify-center bg-blue-400 hover:bg-blue-500 rounded-full w-20 h-20 focus:outline-none"
            >
              <svg
                viewBox="0 0 256 256"
                xmlns="http://www.w3.org/2000/svg"
                className="w-12 h-12 text-white"
              >
                <path
                  fill="currentColor"
                  d="M128 176a48.05 48.05 0 0 0 48-48V64a48 48 0 0 0-96 0v64a48.05 48.05 0 0 0 48 48ZM96 64a32 32 0 0 1 64 0v64a32 32 0 0 1-64 0Zm40 143.6V232a8 8 0 0 1-16 0v-24.4A80.11 80.11 0 0 1 48 128a8 8 0 0 1 16 0a64 64 0 0 0 128 0a8 8 0 0 1 16 0a80.11 80.11 0 0 1-72 79.6Z"
                />
              </svg>
            </button>
          )}

          {/* Render the filler word count */}
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
              <span className="text-gray-600">Uploading...</span>
            </div>
          )}
          {feedback && showFeedback && (
            <FillerCount feedback={feedback} />
          )}
        </div>
      </div>
    </div>
  );
}
