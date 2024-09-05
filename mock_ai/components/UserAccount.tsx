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
