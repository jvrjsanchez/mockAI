"use client";
import { useEffect, useState, useRef } from "react";
import { useVideoRecorder } from "@/hooks/useVideoRecorder";
import { Button } from "./ui/Button";
import { Card, CardHeader, CardTitle, CardContent } from "./ui/card";
import { Mic, Pause, Video, Rocket } from "lucide-react";

interface VoiceRecorderProps {
  selectedQuestion: string;
  user: any;
  onRecordingComplete: () => void;
  setIsUploading: (isUploading: boolean) => void;
  isUploading: boolean;
}

export default function VoiceRecorder({
  selectedQuestion,
  user,
  onRecordingComplete,
  setIsUploading,
  isUploading,
}: VoiceRecorderProps) {
  const videoRef = useRef<HTMLVideoElement>(null);

  const {
    isRecording,
    startRecording,
    stopRecording,
    videoUrl,
    uploadedVideoUrl,
    saveVideoUrl,
    uploadAudio,
    transcript,
    videoBlob,
    audioBlob,
  } = useVideoRecorder(videoRef, selectedQuestion);

  const [isLoading, setIsLoading] = useState(false);

  const handleToggleRecording = async () => {
    if (isRecording) {
      setIsLoading(true);
      stopRecording();

      setIsLoading(false);
      videoRef.current?.scrollIntoView({ behavior: "smooth" });
    } else {
      startRecording();
      videoRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  };

  useEffect(() => {
    const uploadBlobs = async () => {
      setIsUploading(true);

      if (videoBlob && audioBlob) {
        try {
          await uploadAudio(user, selectedQuestion); // Upload extracted audio
          onRecordingComplete();
          setIsLoading(false);
          videoRef.current?.scrollIntoView({ behavior: "smooth" });
        } catch (error) {
          setIsLoading(false);
          setIsUploading(false);
          console.error("Error uploading blobs:", error);
        }
      }
    };

    if (videoBlob && audioBlob) {
      uploadBlobs();
    }
  }, [videoBlob, audioBlob]);

  return (
    <div className="bg-[#050614] text-white p-6 flex items-center justify-center flex-grow min-h-[25vh] max-w-2xl mx-auto">
      <div className="w-full max-w-3xl flex-grow">
        {(isRecording || transcript) && (
          <Card className="bg-[#0a0b24] border-[#2e2f61] mb-8">
            <CardHeader>
              <CardTitle className="flex justify-between items-center">
                <span className="text-[#7fceff]">
                  {isRecording ? "Recording" : "Recorded"}
                </span>
                {isRecording && (
                  <span className="flex items-center">
                    <span className="animate-pulse mr-2 h-3 w-3 rounded-full bg-[#ff6db3]"></span>
                    Live
                  </span>
                )}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-[#f0f0f0] mb-4">
                {isRecording
                  ? "What are your thoughts on this question?"
                  : "Thank you for your interview."}
              </p>
              {transcript && (
                <div className="bg-[#131538] rounded-md p-4 mb-4">
                  <p className="text-[#f0f0f0]">{transcript}</p>
                </div>
              )}
              <div className="aspect-w-16 aspect-h-9 bg-[#131538] rounded-lg overflow-hidden max-w-full">
                <video
                  ref={videoRef}
                  key={videoUrl}
                  className="w-full h-full object-cover"
                  controls
                  muted
                  crossOrigin="anonymous"
                  onError={() => console.error("Error loading video")}
                >
                  <source src={videoUrl} type="video/webm" />
                  Your browser does not support the video tag.
                </video>

                <div className="w-full h-full flex items-center justify-center">
                  <Video className="h-16 w-16 text-[#7fceff] opacity-50" />
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        <div className="flex flex-col items-center mb-8">
          <Button
            onClick={handleToggleRecording}
            disabled={isUploading}
            className={`rounded-full p-8 transition-all duration-300 ${
              isUploading
                ? "bg-[#ff6db3] text-[#050614] cursor-not-allowed"
                : isRecording
                ? "bg-[#ff6db3] hover:bg-[#ff6db3]/90"
                : "bg-[#7fceff] hover:bg-[#7fceff]/90"
            }`}
            aria-label={
              isUploading
                ? "Uploading..."
                : isRecording
                ? "Stop Recording"
                : "Start Recording"
            }
          >
            {isUploading ? (
              <>
                <Rocket className="h-8 w-8 text-[#7fceff] animate-bounce" />
                <span className="ml-2">Uploading...</span>
              </>
            ) : isRecording ? (
              <Pause className="h-8 w-8 text-[#050614]" />
            ) : (
              <Mic className="h-8 w-8 text-[#050614]" />
            )}
          </Button>

          {isLoading && (
            <div className="mt-4 flex items-center space-x-2 text-[#7fceff]">
              <svg
                className="animate-spin h-5 w-5"
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
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
              <span>Uploading...</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
