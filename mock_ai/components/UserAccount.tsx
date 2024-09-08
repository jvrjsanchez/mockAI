"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useUser } from "@auth0/nextjs-auth0/client";
import Link from "next/link";

const UserAccount = () => {
  const { user, isLoading } = useUser();
  const [results, setResults] = useState<any[]>([]);
  const [sortBy, setSortBy] = useState<"asc" | "desc">("desc");
  const [selectedFeedback, setSelectedFeedback] = useState<any>(null);

  // Fetch results for the user
  useEffect(() => {
    if (user?.email) {
      axios
        .get("/service/get_all_results", {
          params: { user: user?.email },
          headers: { "Content-Type": "application/json" },
        })
        .then((response) => {
          setResults(
            Array.isArray(response.data) ? response.data : []
          );
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
    if (
      window.confirm("Are you sure you want to delete this result?")
    ) {
      axios
        .delete(`/service/delete_result/${resultId}`, {
          headers: { "Content-Type": "application/json" },
        })
        .then(() => {
          setResults((prevResults) =>
            prevResults.filter((r) => r.id !== resultId)
          );
          alert("Result deleted successfully.");
        })
        .catch((error) => {
          console.error("Error deleting result:", error);
        });
    }
  };

  // Handle feedback selection
  const handleFeedbackChange = (
    e: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const feedbackId = e.target.value;
    const feedback = results.find((r) => r.id === feedbackId);
    setSelectedFeedback(feedback);
  };

  // Loading and user check
  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!user) {
    return (
      <div className="hero">
        <div className="flex-1 pt-36 padding-x">
          <h1 className="text-2xl font-bold">
            mockAI User Account Page
          </h1>
          <p>Please sign in to view your account.</p>
          <button className="bg-primary-blue text-white mt-4 rounded-full p-2">
            <a href="/api/auth/login">Sign In</a>
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="hero">
      <div className="flex-1 pt-36 padding-x">
        {/* User Profile Section */}
        <div className="flex items-center space-x-4">
          {user.picture && (
            <img
              src={user.picture}
              alt="User Profile"
              className="w-16 h-16 rounded-full"
            />
          )}
          <div>
            <h2 className="text-xl font-bold">{user.name}</h2>
            <p className="text-sm text-gray-600">{user.email}</p>
          </div>
        </div>

        <h1 className="text-2xl font-bold mt-8">
          Your Interview Results
        </h1>

        {/* Sort by Date */}
        <div className="flex items-center justify-between mt-4 text-black">
          <p>Sort by Date:</p>
          <select
            value={sortBy}
            onChange={(e) =>
              handleSortChange(e.target.value as "asc" | "desc")
            }
            className="border p-2 rounded-md"
          >
            <option value="asc">Oldest to Newest</option>
            <option value="desc">Newest to Oldest</option>
          </select>
        </div>

        {/* Display results */}
        {results.length > 0 ? (
          <div className="space-y-4 mt-4 text-black">
            {results.map((result) => (
              <div
                key={result.id}
                className="result-card p-4 border rounded-md bg-white shadow-sm"
              >
                <h2 className="text-lg font-bold mb-2">
                  {result.question}
                </h2>
                <div className="text-sm space-y-1">
                  <p>
                    <strong>Score:</strong> {result.score}
                  </p>
                  <p>
                    <strong>Transcript:</strong>{" "}
                    <span className="block truncate">
                      {result.transcript}
                    </span>
                  </p>
                  <p>
                    <strong>Filler Words:</strong>{" "}
                    {result.filler_words}
                  </p>
                  <p>
                    <strong>Long Pauses:</strong> {result.long_pauses}
                  </p>
                  <p>
                    <strong>Pause Durations:</strong>{" "}
                    {result.pause_durations}
                  </p>
                  <p>
                    <strong>AI Feedback:</strong> {result.ai_feedback}
                  </p>
                  <p>
                    <strong>Interview Date:</strong>{" "}
                    {new Date(
                      result.interview_date
                    ).toLocaleDateString()}
                  </p>

                  {/* Check if video is available */}
                  {result.video_url ? (
                    <div className="mt-2">
                      <video
                        controls
                        preload="metadata"
                        src={result.video_url}
                        className="w-full rounded-md"
                      />
                    </div>
                  ) : (
                    <p>No video available for this interview.</p>
                  )}
                </div>

                {/* Delete button */}
                <button
                  onClick={() => handleDelete(result.id)}
                  className="bg-red-500 text-white mt-4 rounded-full px-4 py-2 text-sm"
                >
                  Delete Result
                </button>
              </div>
            ))}
          </div>
        ) : (
          <p className="mt-4">No results available.</p>
        )}

        {/* Start new interview and sign out buttons */}
        <div className="flex flex-col space-y-4 mt-6">
          <Link
            href="/interview"
            className="bg-primary-blue text-white rounded-full py-2 text-center"
          >
            Start New Interview
          </Link>
          <a
            href="/api/auth/logout"
            className="bg-primary-blue text-white rounded-full py-2 text-center"
          >
            Sign Out
          </a>
        </div>
      </div>
    </div>
  );
};

export default UserAccount;
