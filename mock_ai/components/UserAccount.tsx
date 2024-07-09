"use client"
import { useUser } from "@auth0/nextjs-auth0/client"
import { useState, useEffect } from "react";
import Link from "next/link"
import axios from "axios";

const UserAccount = () => {
    const { user, error, isLoading } = useUser()
    const [feedbacks, setFeedbacks] = useState<any[]>([]);
    const [selectedFeedback, setSelectedFeedback] = useState<any>(null);

    useEffect(() => {
        if (user) {
            axios.get("/service/get_all_feedback", {
                params: { user: user.email },
                headers: { "Content-Type": "application/json" }
            })
            .then(response => {
                setFeedbacks(response.data);
                setSelectedFeedback(response.data[0]);
            })
            .catch(error => console.error("Error fetching feedbacks:", error));
        }
    }, [user]);

    const handleFeedbackChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const feedbackId = event.target.value;
        const feedback = feedbacks.find(feedback => feedback.id === parseInt(feedbackId));
        setSelectedFeedback(feedback);
    };

    if (isLoading) return <div>Loading...</div>
    if (error) return <div>{error.message}</div>

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
                <a href="/api/auth/login">
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
                        <img src={user.picture} alt={user.name} className="rounded-full h-24 w-24 mx-auto" />
                        <h1 className="text-2xl font-bold text-center mt-4">{user.name}</h1>
                        <p className="text-lg text-center mt-2">{user.email}</p>
                        <div className="mt-4">
                            <label htmlFor="feedback-select" className="block text-lg font-medium">Select Feedback</label>
                            <select
                                id="feedback-select"
                                className="mt-2 block w-full p-2 border border-gray-300 rounded"
                                onChange={handleFeedbackChange}
                            >
                                {feedbacks.map(feedback => (
                                    <option key={feedback.id} value={feedback.id}>
                                        {new Date(feedback.id).toLocaleString()}
                                    </option>
                                ))}
                            </select>
                        </div>
                        {selectedFeedback && (
                            <div className="mt-4">
                                <h2 className="text-xl font-bold">{selectedFeedback.question}</h2>
                                <p>Score: {selectedFeedback.score}</p>
                                <p>Transcript: {selectedFeedback.transcript}</p>
                                <p>Filler Words: {selectedFeedback.filler_words}</p>
                                <p>Long Pauses: {selectedFeedback.long_pauses}</p>
                                <p>Pause Durations: {selectedFeedback.pause_durations}</p>
                                <p>AI Feedback: {selectedFeedback.ai_feedback}</p>
                            </div>
                        )}
                        <div className="flex flex-col space-y-4 mt-4">
                            <Link href="/interview" className="bg-primary-blue text-white rounded-full py-2 text-center">Start Your Interview</Link>
                            <a href="/api/auth/logout" className="bg-primary-blue text-white rounded-full py-2 text-center">Sign Out</a>
                        </div>
                    </>
                </div>
            </div>
        )
    }
}

export default UserAccount
