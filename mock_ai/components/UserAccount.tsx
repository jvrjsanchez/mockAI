"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useUser } from "@auth0/nextjs-auth0/client";

const UserAccount = () => {
  const { user } = useUser();
  const [results, setResults] = useState<any[]>([]);
  const [sortBy, setSortBy] = useState<"asc" | "desc">("desc");

  // Fetch results for the user
  useEffect(() => {
    if (user?.email) {
      axios
        .get("/service/get_all_results", {
          params: { user: user?.email },
          headers: { "Content-Type": "application/json" },
        })
        .then((response) => {
          setResults(Array.isArray(response.data) ? response.data : []);
        })
        .catch((error) => {
          console.error("Error fetching results:", error);
        });
    }
  }, [user]);

  // Sort the results by interview_date
  const handleSortChange = (sortOrder: "asc" | "desc") => {
    const sortedResults = [...results].sort((a, b) => {
      const dateA = new Date(a.interview_date);
      const dateB = new Date(b.interview_date);
      return sortOrder === "asc" ? dateA - dateB : dateB - dateA;
    });
    setSortBy(sortOrder);
    setResults(sortedResults);
  };

  // Delete a result
  const handleDelete = (resultId: number) => {
    if (window.confirm("Are you sure you want to delete this result?")) {
      axios
        .delete(`/service/delete_result/${resultId}`, {
          headers: { "Content-Type": "application/json" },
        })
        .then(() => {
          setResults((prevResults) => prevResults.filter((r) => r.id !== resultId));
          alert("Result deleted successfully.");
        })
        .catch((error) => {
          console.error("Error deleting result:", error);
        });
    }
  };

  return (
    <div className="hero">
      <div className="flex-1 pt-36 padding-x">
        <h1 className="text-2xl font-bold">Your Interview Results</h1>
        <div className="flex items-center justify-between mt-4">
          <p>Sort by Date:</p>
          <select
            value={sortBy}
            onChange={(e) => handleSortChange(e.target.value as "asc" | "desc")}
            className="border p-2"
          >
            <option value="asc">Oldest to Newest</option>
            <option value="desc">Newest to Oldest</option>
          </select>
        </div>
<<<<<<< Updated upstream
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
              <div className="mt-4 text-black">
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
                      {feedback.interview_date || feedback.question}
                    </option>
                  ))}
                </select>
                {selectedFeedback && (
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
                          {feedback.question} - Score:{" "}
                          {feedback.score} - Date:{" "}
                          {feedback.interview_date}
                        </option>
                      ))}
                    </select>
                    {selectedFeedback && (
                      <div className="mt-4">
                        <h2 className="text-xl font-bold">
                          {selectedFeedback.interview_date}
                        </h2>
                        <p>
                          <strong>Score:</strong>{" "}
                          {selectedFeedback.score}
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
                    href="/api/auth/logout"
                    className="bg-primary-blue text-white rounded-full py-2 text-center"
                  >
                    Sign Out
                  </a>
=======
        {results.length > 0 ? (
          results.map((result) => (
            <div key={result.id} className="result-card mt-4 p-4 border rounded-md">
              <h2 className="text-xl font-bold">{result.question}</h2>
              <p>
                <strong>Score:</strong> {result.score}
              </p>
              <p>
                <strong>Transcript:</strong> {result.transcript}
              </p>
              <p>
                <strong>Filler Words:</strong> {result.filler_words}
              </p>
              <p>
                <strong>Long Pauses:</strong> {result.long_pauses}
              </p>
              <p>
                <strong>Pause Durations:</strong> {result.pause_durations}
              </p>
              <p>
                <strong>Interview Date:</strong> {new Date(result.interview_date).toLocaleString()}
              </p>
              
              {/* Display video player if video_url is available */}
              {result.video_url ? (
                <div className="mt-4">
                  <video width="100%" controls>
                    <source src={result.video_url} type="video/mp4" />
                    Your browser does not support the video tag.
                  </video>
>>>>>>> Stashed changes
                </div>
              ) : (
                <p>No video available for this interview.</p>
              )}

              <button
                onClick={() => handleDelete(result.id)}
                className="bg-red-500 text-white mt-4 rounded-full p-2"
              >
                Delete Result
              </button>
            </div>
          ))
        ) : (
          <p>No results available.</p>
        )}
      </div>
    </div>
  );
};

export default UserAccount;
