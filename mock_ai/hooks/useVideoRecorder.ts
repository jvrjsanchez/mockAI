"use client";
import { useRef, useState, useEffect } from "react";
import axios from 'axios'; // For uploading the video to the server

declare global {
  interface Window {
    webkitSpeechRecognition: any;
  }
}

export const useVideoRecorder = () => {
  const [isRecording, setIsRecording] = useState(false);
  const [recordingComplete, setRecordingComplete] = useState(false);
  const [videoUrl, setVideoUrl] = useState<string | null>(null); // For the temporary front-end URL
  const [videoBlob, setVideoBlob] = useState<Blob | null>(null); // The video Blob itself
  const [transcript, setTranscript] = useState("");
  const [audioBlob, setAudioBlob] = useState<Blob | null>(null); // Blob for extracted audio
  const [uploadedVideoUrl, setUploadedVideoUrl] = useState<string | null>(null); // The URL after uploading

  // For Media Recorder
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const videoChunksRef = useRef<Blob[]>([]);

  // For Speech Recognition
  const recognitionRef = useRef<any>(null);

  async function initializeMediaRecorder() {
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

      const handleStop = async () => {
        const videoBlob = new Blob(videoChunksRef.current, {
          type: "video/webm",
        });
        setVideoBlob(videoBlob); // Ensure videoBlob is set properly
        const videoUrl = URL.createObjectURL(videoBlob);
        setVideoUrl(videoUrl); // Set a front-end URL for preview

        // Extract audio from video
        const extractedAudioBlob = await extractAudioFromVideo(videoBlob);
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

  // Function to extract audio from video Blob
  const extractAudioFromVideo = async (videoBlob: Blob) => {
    return new Promise<Blob>((resolve) => {
      const audioContext = new AudioContext();
      const fileReader = new FileReader();
      fileReader.onloadend = async () => {
        const audioBuffer = await audioContext.decodeAudioData(
          fileReader.result as ArrayBuffer
        );
        const offlineAudioContext = new OfflineAudioContext(
          audioBuffer.numberOfChannels,
          audioBuffer.length,
          audioBuffer.sampleRate
        );
        const audioBufferSource = offlineAudioContext.createBufferSource();
        audioBufferSource.buffer = audioBuffer;
        audioBufferSource.connect(offlineAudioContext.destination);
        audioBufferSource.start(0);
        offlineAudioContext.startRendering().then((renderedBuffer) => {
          const audioBlob = new Blob([renderedBuffer.getChannelData(0)], {
            type: "audio/wav",
          });
          resolve(audioBlob); // Return the extracted audio Blob
        });
      };
      fileReader.readAsArrayBuffer(videoBlob);
    });
  };

  const saveVideoUrl = async () => {
    if (!videoBlob) {
      console.error("No video to upload.");
      return;
    }

    const formData = new FormData();
    formData.append("video", videoBlob, "recorded_video.webm");

    try {
      const response = await axios.post(
        '/service/save_video_url', // Upload video URL using the save_video_url route
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );
      const { videoUrl } = response.data; // Assuming the server returns the video URL after uploading
      setUploadedVideoUrl(videoUrl); // Set the video URL after successful upload
    } catch (error) {
      console.error("Error saving video URL:", error);
    }
  };

  const uploadAudio = async () => {
    if (!audioBlob) {
      console.error("No audio to upload.");
      return;
    }

    const formData = new FormData();
    formData.append("audio", audioBlob, "extracted_audio.wav");

    try {
      const response = await axios.post(
        '/service/upload_audio', // Endpoint for uploading audio
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
    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.stop();
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
  };
};
