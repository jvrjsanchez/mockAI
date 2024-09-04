"use client";
import { useRef, useState, useEffect } from "react";

declare global {
  interface Window {
    webkitSpeechRecognition: any;
  }
}

export const useVideoRecorder = () => {
  const [isRecording, setIsRecording] = useState(false);
  const [recordingComplete, setRecordingComplete] = useState(false);
  const [videoUrl, setVideoUrl] = useState<string | null>(null);
  const [videoBlob, setVideoBlob] = useState<Blob | null>(null);
  const [transcript, setTranscript] = useState("");

  // For Media Recorder
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const videoChunksRef = useRef<Blob[]>([]);

  // For Speech Recognition
  const recognitionRef = useRef<any>(null);

  async function initializeMediaRecorder() {
    // Clear previous video chunks so the next recording is clean.
    videoChunksRef.current = [];
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: true,
      });
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;

      const handleDataAvailable = (event) => {
        videoChunksRef.current.push(event.data);
      };

      const handleStop = () => {
        const videoBlob = new Blob(videoChunksRef.current, {
          type: "video/webm",
        });
        const videoUrl = URL.createObjectURL(videoBlob);
        setVideoUrl(videoUrl);
        setVideoBlob(videoBlob);

        mediaRecorder.removeEventListener(
          "dataavailable",
          handleDataAvailable
        );
        mediaRecorder.removeEventListener("stop", handleStop);
      };

      mediaRecorder.addEventListener(
        "dataavailable",
        handleDataAvailable
      );
      mediaRecorder.addEventListener("stop", handleStop);

      mediaRecorder.start();
    } catch (error) {
      console.error("Failed to initialize media recorder:", error);
    }
  }

  function initializeSpeechRecognition() {
    recognitionRef.current = new window.webkitSpeechRecognition();
    recognitionRef.current.continuous = true;
    recognitionRef.current.interimResults = true;

    recognitionRef.current.onresult = async (event: any) => {
      try {
        const { transcript } =
          event.results[event.results.length - 1][0];
        console.log(transcript);
        setTranscript(transcript);
      } catch (error) {
        console.error(
          "Error handling speech recognition result:",
          error
        );
      }
    };

    recognitionRef.current.onerror = (event: any) => {
      console.error("Speech recognition error:", event.error);
    };

    try {
      recognitionRef.current.start();
    } catch (error) {
      console.error("Error starting speech recognition:", error);
    }
  }

  const startRecording = () => {
    setIsRecording(true);

    initializeMediaRecorder();
    initializeSpeechRecognition();
  };

  useEffect(() => {
    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.stop();
      }
    };
  }, []);

  const stopRecording = () => {
    if (mediaRecorderRef.current) {
      mediaRecorderRef.current.stop();

      mediaRecorderRef.current.stream
        .getTracks()
        .forEach((track) => track.stop());
    }
    if (recognitionRef.current) {
      recognitionRef.current.stop();
    }
    setIsRecording(false);
    setRecordingComplete(true);
  };

  return {
    isRecording,
    recordingComplete,
    startRecording,
    stopRecording,
    videoUrl,
    transcript,
    videoBlob,
  };
};
