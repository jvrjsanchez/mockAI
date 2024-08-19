import { useState, useEffect } from "react";
import { Feedback } from "@/types";

const useFetchFeedback = (uploaded: boolean, audioUrl: string) => {
  const [analysis, setAnalysis] = useState<string[]>([]);
  const [feedback, setFeedback] = useState<Feedback | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (uploaded) {
      setIsLoading(true);
      fetch("/service/generate_ai_response", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: "test@example.com" }),
        cache: "force-cache",
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error("Failed to fetch results");
          }
          return response.json();
        })
        .then((data) => {
          setAnalysis(data);
          const feedbackDetails = extractFeedbackDetails(
            data.response
          );
          setFeedback(feedbackDetails);
        })
        .catch((error) => {
          console.error("Error fetching results:", error);
          setError(error.message);
        })
        .finally(() => {
          setIsLoading(false);
        });
    }
  }, [uploaded, audioUrl]);

  const extractFeedbackDetails = (response: string) => {
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

  return { feedback, analysis, isLoading, error };
};

export default useFetchFeedback;
