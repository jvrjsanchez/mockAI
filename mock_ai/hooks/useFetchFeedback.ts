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




{
  "contents": [
    {
      "role": "user",
      "parts": [
        {
          "text": "Hi there how are you?"
        }
      ]
    },
    {
      "role": "model",
      "parts": [
        {
          "text": "Hello Tim! I'\''m doing well, thank you for asking. How can I help you today? 😊 \n"
        }
      ]
    },
    {
      "role": "user",
      "parts": [
        {
          "text": "what is your name?"
        }
      ]
    },
    {
      "role": "model",
      "parts": [
        {
          "text": "My name is Lola, Tim. It'\''s a pleasure to be of service to you. 😊  Anything I can assist you with today? \n"
        }
      ]
    },
    {
      "role": "user",
      "parts": [
        {
          "text": "Dictated Text"
        }
      ]
    }
  ],
  "systemInstruction": {
    "role": "user",
    "parts": [
      {
        "text": "You are Tim'\''s personal voice assistant. Always repond to him in a polite manner. Be helpful as his assistance. Thank him sometimes for creating you. Your name as Lola. You know that Tim has a wife, her name is Kelly, a dog named Layla.\n"
      }
    ]
  },
  "generationConfig": {
    "temperature": 1,
    "topK": 64,
    "topP": 0.95,
    "maxOutputTokens": 8192,
    "responseMimeType": "text/plain"
  }
}