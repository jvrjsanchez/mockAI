"use client";
import { upload } from "@vercel/blob/client";
import { FFmpeg } from "@ffmpeg/ffmpeg";
import { fetchFile } from "@ffmpeg/util";

import { useRef, useState, useEffect } from "react";
import { useUser } from "@auth0/nextjs-auth0/client";
import { v4 as uuid } from "uuid";
import axios from "axios";

declare global {
  interface Window {
    webkitSpeechRecognition: any;
  }
}

interface UseVideoRecorderReturn {
  isRecording: boolean;
  recordingComplete: boolean;
  audioBlob: Blob | null;
  startRecording: () => void;
  stopRecording: () => void;
  videoUrl: string | null;
  videoBlob: Blob | null;
  uploadedVideoUrl: string | null;
  saveVideoUrl: () => Promise<void>;
  uploadAudio: (user, question) => Promise<void>;
  transcript: string | null;
}

export const useVideoRecorder = (
  videoRef: React.RefObject<HTMLVideoElement>,
  selectedQuestion: string
): UseVideoRecorderReturn => {
  const [isRecording, setIsRecording] = useState(false);
  const [recordingComplete, setRecordingComplete] = useState(false);
  const [videoUrl, setVideoUrl] = useState<string | null>(null); // For the temporary front-end URL
  const [videoBlob, setVideoBlob] = useState<Blob | null>(null); // The video Blob itself
  const [transcript, setTranscript] = useState("");
  const [audioBlob, setAudioBlob] = useState<Blob | null>(null); // Blob for extracted audio
  const [uploadedVideoUrl, setUploadedVideoUrl] = useState<
    string | null
  >(null);
  const [isUploading, setIsUploading] = useState(false);
  const [hasUploaded, setHasUploaded] = useState(false);
  const [readyToUploadVideo, setReadyToUploadVideo] = useState(false);

  const id_unique = uuid();

  const { user } = useUser();

  const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

  // For Media Recorder
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const videoChunksRef = useRef<Blob[]>([]);
  const streamRef = useRef<MediaStream | null>(null);

  // For Speech Recognition
  const recognitionRef = useRef<any>(null);

  async function initializeMediaRecorder() {
    videoChunksRef.current = [];
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: true,
      });
      streamRef.current = stream;
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;

      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        videoRef.current.play();
      }

      const handleDataAvailable = (event) => {
        videoChunksRef.current.push(event.data);
      };

      const handleStop = async () => {
        const videoBlob = new Blob(videoChunksRef.current, {
          type: "video/webm",
        });

        setVideoBlob(videoBlob); // Ensure videoBlob is set properly
        const videoUrl = URL.createObjectURL(videoBlob);
        setVideoUrl(videoUrl); // Set a front-end URL for preview

        console.log("Video Blob:", videoBlob); // Should output a Blob object
        console.log("Video URL:", videoUrl);

        // Extract audio from video
        const extractedAudioBlob = await handleAudioExtraction(
          videoBlob
        );
        console.log("Extracted audioBlob:", extractedAudioBlob); // Debugging log
        setAudioBlob(extractedAudioBlob); // Set audio Blob for upload

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

  const stopRecording = async () => {
    if (mediaRecorderRef.current) {
      mediaRecorderRef.current.stop();

      mediaRecorderRef.current.stream
        .getTracks()
        .forEach((track) => track.stop());
    }
    if (recognitionRef.current) {
      recognitionRef.current.stop();
    }

    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => track.stop());
      streamRef.current = null;
    }

    setIsRecording(false);
    setRecordingComplete(true);
  };

  async function handleAudioExtraction(file: Blob) {
    const ffmpeg = new FFmpeg();
    await ffmpeg.load({ log: true });

    await ffmpeg.writeFile(
      `${id_unique}.webm`,
      await fetchFile(file)
    );
    await ffmpeg.exec([
      "-i",
      `${id_unique}.webm`,
      "-vn", // means no video.
      "-acodec",
      "libmp3lame",
      "-ac",
      "1",
      "-ar",
      "16000",
      "-f",
      "mp3",
      `${id_unique}.mp3`,
    ]);

    // This reads the converted file from the file system
    const fileData = await ffmpeg.readFile(`${id_unique}.mp3`);
    // This creates a new file from the raw data
    const output = new Blob([fileData.buffer], { type: "audio/mp3" });

    return output;
  }

  const generateUniqueFilename = (
    baseName: string,
    extension: string
  ) => {
    const timestamp = Date.now();
    const randomString = Math.random().toString(36).substring(2, 15);
    return `${baseName}_${timestamp}_${randomString}.${extension}`;
  };

  const saveVideoUrl = async () => {
    if (!videoBlob) {
      console.error("No video to upload.");
      return;
    }

    if (isUploading || hasUploaded) {
      console.log("Upload already in progress or completed.");
      return;
    }

    setIsUploading(true);

    const mimeType = videoBlob.type;
    let extension = "webm"; // Default to 'webm'

    if (mimeType === "video/x-matroska") {
      extension = "mkv"; // Use 'mkv' for Matroska
    } else if (mimeType === "video/mp4") {
      extension = "mp4"; // Example for mp4 videos
    }

    const fileNameUnique = generateUniqueFilename(
      "recorded_video",
      extension
    );

    const formData = new FormData();
    formData.append("file", videoBlob, fileNameUnique);

    try {
      console.log("Uploading video to Vercel Blob Store...");
      // const uploadedResponse = await axios.put(
      //   baseUrl ? `${baseUrl}/api/video/upload` : `/api/video/upload`,

      //   formData,
      //   {
      //     headers: { "Content-Type": "multipart/form-data" },
      //   }
      // );
      const uploadedResponse = await upload(
        fileNameUnique,
        videoBlob,
        {
          access: "public",
          handleUploadUrl: "/api/video/upload",
          multipart: true,
        }
      );

      const videoUrl = uploadedResponse.url;

      setUploadedVideoUrl(videoUrl);

      if (uploadedResponse.url) {
        const saveResponse = await axios.post(
          baseUrl
            ? `${baseUrl}/service/save_video_url`
            : "/service/save_video_url",
          {
            user: user?.email,
            video_url: videoUrl,
            question: selectedQuestion,
          },
          {
            headers: { "Content-Type": "application/json" },
          }
        );
        console.log(
          "Video URL saved successfully:",
          saveResponse.data
        );
        setHasUploaded(true);
      } else {
        console.error(
          "Failed to upload video_url to service/save_video_url."
        );
      }
    } catch (error) {
      console.error("Error saving video URL:", error);
    } finally {
      setIsUploading(false);
    }
  };

  const uploadAudio = async (user, question) => {
    console.log("FIRED");
    if (!audioBlob) {
      console.error("No audio to upload.");
      return;
    }

    // I am extracting the audio from the video
    const file = await handleAudioExtraction(audioBlob);

    const formData = new FormData();
    formData.append("audio", file, `${id_unique}.mp3`);
    formData.append("user", user.email);
    formData.append("question", question);

    try {
      const response = await axios.post(
        baseUrl
          ? `${baseUrl}/service/upload_audio`
          : "/service/upload_audio",
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );
      console.log("Audio uploaded successfully:", response.data);
    } catch (error) {
      console.error("Error uploading audio:", error);
    }
  };

  useEffect(() => {
    if (videoBlob && !hasUploaded && selectedQuestion.trim() !== "") {
      setReadyToUploadVideo(true);
    }
  }, [videoBlob, selectedQuestion]);

  useEffect(() => {
    if (readyToUploadVideo && !hasUploaded) {
      saveVideoUrl();
    }
  }, [readyToUploadVideo, hasUploaded]);

  useEffect(() => {
    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.stop();
      }
      if (streamRef.current) {
        streamRef.current
          .getTracks()
          .forEach((track) => track.stop());
      }
    };
  }, []);

  return {
    isRecording,
    recordingComplete,
    startRecording,
    stopRecording,
    videoUrl, // Front-end temporary video URL
    uploadedVideoUrl, // URL after uploading
    transcript,
    audioBlob, // Extracted audio Blob
    saveVideoUrl, // Function to save video URL
    uploadAudio, // Function to call to upload the audio
    videoBlob,
  };
};
