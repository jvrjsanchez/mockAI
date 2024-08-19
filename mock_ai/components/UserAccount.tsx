"use client";
import { useUser } from "@auth0/nextjs-auth0/client";
import { useState, useEffect } from "react";
import Link from "next/link";
import axios from "axios";
import React from "react";

const UserAccount = () => {
  const { user, error, isLoading } = useUser();
  const [feedbacks, setFeedbacks] = useState<any[]>([]);
  const [selectedFeedback, setSelectedFeedback] = useState<any>(null);

  useEffect(() => {
    if (user) {
      axios
        .get("/service/get_all_results", {
          params: { user: user.email },
          headers: { "Content-Type": "application/json" },
        })
        .then((response) => {
          setFeedbacks(response.data);
          setSelectedFeedback(response.data[0]);
        })
        .catch((error) =>
          console.error("Error fetching feedbacks:", error)
        );
    }
  }, [user]);

  const handleFeedbackChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const feedbackId = parseInt(event.target.value, 10);
    const feedback = feedbacks.find(
      (feedback) => feedback.id === feedbackId
    );
    setSelectedFeedback(feedback);
  };

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>{error.message}</div>;

  if (!user) {
    return (
      <div className="hero">
        <div className="flex-1 pt-36 padding-x">
          <h1 className="text-2xl font-bold">
            mockAI User Account Page
          </h1>
          <p className="text-lg mt-4">
            Sorry, but you must be signed in to view your account.
          </p>
          <button className="bg-primary-blue text-white mt-10 rounded-full">
            <a href="/authService/auth/login">
              Sign In to Start Your Interview
            </a>
          </button>
        </div>
      </div>
    );
  } else {
    return (
      <div className="hero">
        <div className="flex-1 pt-36 padding-x">
          <h1 className="text-2xl font-bold">
            mockAI User Account Page
          </h1>
        </div>
        <div className="flex-1 bg-white pt-36 padding-x rounded-lg shadow-md">
          <>
            <img
              src={user.picture}
              alt={user.name}
              className="rounded-full h-24 w-24 mx-auto"
            />
            <h1 className="text-2xl font-bold text-center mt-4">
              {user.name}
            </h1>
            <p className="text-lg text-center mt-2">{user.email}</p>
            {feedbacks.length > 0 && (
              <div className="mt-4">
                <label
                  htmlFor="feedbackSelect"
                  className="block text-lg font-medium text-gray-700"
                >
                  Select Previous Feedback
                </label>
                <select
                  id="feedbackSelect"
                  name="feedback"
                  className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                  onChange={handleFeedbackChange}
                  value={selectedFeedback?.id || ""}
                >
                  {feedbacks.map((feedback) => (
                    <option key={feedback.id} value={feedback.id}>
                      {feedback.question} - Score: {feedback.score} -
                      Date: {feedback.interview_date}
                    </option>
                  ))}
                </select>
                {selectedFeedback && (
                  <div className="mt-4">
                    <h2 className="text-xl font-bold">
                      {selectedFeedback.interview_date}
                    </h2>
                    <p>
                      <strong>Score:</strong> {selectedFeedback.score}
                    </p>
                    <p>
                      <strong>Transcript:</strong>{" "}
                      {selectedFeedback.transcript}
                    </p>
                    <p>
                      <strong>Filler Words:</strong>{" "}
                      {selectedFeedback.filler_words}
                    </p>
                    <p>
                      <strong>Long Pauses:</strong>{" "}
                      {selectedFeedback.long_pauses}
                    </p>
                    <p>
                      <strong>Pause Durations:</strong>{" "}
                      {selectedFeedback.pause_durations}
                    </p>
                    <p>
                      <strong>AI Feedback:</strong>{" "}
                      {selectedFeedback.ai_feedback}
                    </p>
                    <p>
                      <strong>Interview Date:</strong>{" "}
                      {selectedFeedback.interview_date}
                    </p>
                  </div>
                )}
              </div>
            )}
            <div className="flex flex-col space-y-4 mt-6">
              <Link
                href="/interview"
                className="bg-primary-blue text-white rounded-full py-2 text-center"
              >
                Start Your Interview
              </Link>
              <a
                href="/authService/auth/logout"
                className="bg-primary-blue text-white rounded-full py-2 text-center"
              >
                Sign Out
              </a>
            </div>
          </>
        </div>
      </div>
    );
  }
};

export default UserAccount;
