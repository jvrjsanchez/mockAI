"use client";

import { useState } from "react";
import axios from "axios";

function useUploadAudio() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const uploadAudio = async (
    audioBlob: Blob | null | undefined,
    onSuccess: (data: any) => void,
    onError: (error: any) => void
  ) => {
    setIsLoading(true);

    if (!(audioBlob instanceof Blob)) {
      setError("Invalid audio file.");
      setIsLoading(false);
      onError("Invalid audio file.");
      return;
    }

    const formData = new FormData();
    formData.append("audio", audioBlob, "audio.wav");

    try {
      const response = await axios.post(
        "/service/upload_audio",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      onSuccess(response.data);
    } catch (error) {
      console.error("Error uploading audio file:", error);
      onError(error);
    } finally {
      setIsLoading(false);
    }
  };

  return { uploadAudio, isLoading, error };
}

export default useUploadAudio;
