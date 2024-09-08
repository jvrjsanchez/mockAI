import React, { useState } from "react";
import { Button } from "./ui/Button";
import { Card } from "@/components/ui/card";
import { Video } from "lucide-react";

interface InterviewRoomProps {
  mode: "audio" | "video";
}

export default function InterviewRoom({ mode }: InterviewRoomProps) {
  const [isRecording, setIsRecording] = useState(false);
  const [transcript, setTranscript] = useState("testing");

  const toggleRecording = () => {
    setIsRecording(!isRecording);
    // Here you would implement the actual recording logic
  };

  return (
    <div className="h-full bg-[#050614] text-white p-6 flex items-center justify-center">
      <Card className="bg-white text-[#050614] p-6 w-full max-w-md">
        <h2 className="text-xl font-semibold mb-4">
          Thank you for your interview.
        </h2>

        <div className="bg-[#f0f0f0] p-2 mb-4 rounded">
          <p className="text-[#050614]">{transcript}</p>
        </div>

        <div className="relative aspect-video bg-black rounded overflow-hidden mb-4">
          {mode === "video" && (
            <video
              className="w-full h-full object-cover"
              autoPlay
              muted
              playsInline
            >
              <source src="/placeholder-video.mp4" type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          )}
          {mode === "audio" && (
            <div className="w-full h-full flex items-center justify-center text-white">
              Audio Only
            </div>
          )}
          <div className="absolute bottom-2 left-2 text-white text-sm">
            0:02 / 0:03
          </div>
        </div>

        <div className="flex justify-center">
          <Button
            onClick={toggleRecording}
            className={`rounded-full p-2 ${
              isRecording
                ? "bg-[#ff6db3] hover:bg-[#ff6db3]/90"
                : "bg-[#7fceff] hover:bg-[#7fceff]/90"
            }`}
            aria-label={
              isRecording ? "Stop Recording" : "Start Recording"
            }
          >
            <Video className="h-6 w-6" />
          </Button>
        </div>
      </Card>
    </div>
  );
}
