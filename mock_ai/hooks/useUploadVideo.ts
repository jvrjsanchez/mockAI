"use client";

import { useState } from "react";
import axios from "axios";

function useUploadVideo() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const uploadVideo = async (
    videoBlob: Blob | null | undefined,
    onSuccess: (data: any) => void,
    onError: (error: any) => void
  ) => {
    setIsLoading(true);

    if (!(videoBlob instanceof Blob)) {
      setError("Invalid video file.");
      setIsLoading(false);
      onError("Invalid video file.");
      return;
    }

    const formData = new FormData();
    formData.append("video", videoBlob, "video.mp4");

    try {
      const response = await axios.post(
        "/service/upload_video",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      onSuccess(response.data);
    } catch (error) {
      console.error("Error uploading video file:", error);
      onError(error);
    } finally {
      setIsLoading(false);
    }
  };

  return { uploadVideo, isLoading, error };
}

export default useUploadVideo;
