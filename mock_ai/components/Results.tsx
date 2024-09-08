"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import { useUser } from "@auth0/nextjs-auth0/client";
import { Button } from "./ui/Button";
import { Progress } from "./ui/progress";
import { useRouter } from "next/navigation";
import { Info } from "lucide-react";
import { useToast } from "@/hooks/useToast";
import { ToastAction } from "./ui/toast";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Checkbox } from "./ui/checkbox";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Skeleton } from "./ui/skeleton";
import { Save, LogOut, Play, Loader2 } from "lucide-react";

interface Result {
  question: string;
  transcript: string;
  filler_words: number;
  long_pauses: number;
  pause_durations: number;
  interview_date: string;
  ai_feedback?: string;
}

const Results = () => {
  const { user, isLoading: userLoading } = useUser();
  const [results, setResults] = useState<Result[]>([]);
  const [saveResults, setSaveResults] = useState(false);
  const [analysisLoading, setAnalysisLoading] = useState(false);
  const [resultsLoading, setResultsLoading] = useState(true);
  const [email, setEmail] = useState(user?.email);

  const { toast } = useToast();

  const router = useRouter();

  useEffect(() => {
    setEmail(user?.email);
  }, [user?.email]);

  useEffect(() => {
    if (email) {
      fetchResults();
    }
  }, [email]);

  const fetchResults = async () => {
    setResultsLoading(true);
    try {
      const response = await axios.get("/service/get_results", {
        params: { user: email },
        headers: { "Content-Type": "application/json" },
      });
      const fetchedResults = [response.data];
      setResults(fetchedResults);
      console.log("Fetched results:", fetchedResults);
      fetchAIAnalysis(fetchedResults);
    } catch (error) {
      console.error("Error fetching results:", error);
    } finally {
      setResultsLoading(false);
    }
  };

  const fetchAIAnalysis = async (fetchedResults: Result[]) => {
    if (email) {
      setAnalysisLoading(true);
      try {
        const response = await axios.post(
          "/service/generate_ai_response",
          { user: email },
          { headers: { "Content-Type": "application/json" } }
        );
        const analysisData = Array.isArray(response.data.response)
          ? response.data.response
          : [response.data.response];
        const updatedResults = fetchedResults.map(
          (result, index) => ({
            ...result,
            ai_feedback: analysisData[index] || "",
          })
        );
        setResults(updatedResults);
        console.log(
          "Updated results with AI feedback:",
          updatedResults
        );
      } catch (error) {
        console.error("Error fetching analysis:", error);
      } finally {
        setAnalysisLoading(false);
      }
    }
  };

  const handleSaveToggle = () => {
    setSaveResults(!saveResults);
  };

  const handleSaveResults = async () => {
    if (results.length === 0) {
      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong..",
        description: "There was a problem saving your results.",
        action: (
          <ToastAction altText="Try again">Try again</ToastAction>
        ),
      });
      return;
    }

    if (saveResults) {
      const payload = {
        user: email,
        results: results.map((result) => ({
          question_id: result.question_id,
          question: result.question,
          transcript: result.transcript,
          score: result.score,
          filler_word_count: result.filler_words,
          long_pauses: result.long_pauses,
          pause_durations: result.pause_durations,
          ai_feedback: result.ai_feedback || "",
        })),
      };

      console.log("Saving results payload:", payload);

      try {
        await axios.post("/service/save_results", payload);
        toast({
          className: "bg-[#7fceff] text-[#050614]",
          title: "Saved",
          description: "Your results have been saved successfully.",
        });
      } catch (error) {
        console.error("Error saving results:", error);
      }
    } else {
      console.log("Save results is not enabled.");
    }
  };

  const handleStartNewInterview = () => {
    router.push("/interview");
  };

  const handleSignOut = () => {
    router.push("/api/auth/logout");
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-[#050614] text-white p-6 flex items-center justify-center">
        <Card className="bg-[#0a0b24] border-[#2e2f61] w-full max-w-md">
          <CardHeader>
            <CardTitle className="text-[#7fceff]">
              Your Interview Results
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-[#f0f0f0] mb-4">
              Sorry, but you must be signed in to review your results.
            </p>
            <Button
              asChild
              className="w-full bg-[#7fceff] text-[#050614] hover:bg-[#7fceff]/90"
            >
              <a href="/api/auth/login">
                Sign In to Review Your Results
              </a>
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#050614] text-white p-6">
      <h1 className="text-3xl font-bold mb-6 text-center">
        Your Interview Feedback Powered by mockAI
      </h1>

      {resultsLoading || userLoading ? (
        <Card className="bg-[#0a0b24] border-[#2e2f61] mb-6">
          <CardContent className="p-4">
            <Skeleton className="h-4 w-full mb-2" />
            <Skeleton className="h-4 w-3/4" />
          </CardContent>
        </Card>
      ) : results.length > 0 ? (
        results.map((result, index) => (
          <Card
            key={index}
            className="bg-[#0a0b24] border-[#2e2f61] mb-6"
          >
            <CardHeader>
              <CardTitle className="text-[#7fceff]">Report</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="bg-[#1a1c3d] rounded-lg p-6 border-b border-[#2e2f61]">
                  <h3 className="text-xl font-bold text-[#7fceff] mb-2">
                    Question
                  </h3>
                  <p className="text-[#f0f0f0]">{result.question}</p>
                </div>

                <div className="bg-[#1a1c3d] rounded-lg p-6 border-b border-[#2e2f61]">
                  <h3 className="text-xl font-bold text-[#7fceff] mb-2">
                    Transcript
                  </h3>
                  <p className="text-[#f0f0f0]">
                    {result.transcript}
                  </p>
                </div>

                <div className="bg-[#131538] rounded-lg p-6 transition-all hover:shadow-lg hover:shadow-[#7fceff]/20 border-b border-[#2e2f61]">
                  <h3 className="text-xl font-bold text-[#7fceff] mb-2">
                    Filler Words
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {Object.entries(
                      JSON.parse(result.filler_words)
                    ).map(([word, count], index) => (
                      <div
                        key={index}
                        className="bg-[#202341] rounded-lg p-4 flex justify-between items-center transition-all hover:shadow-lg hover:shadow-[#7fceff]/20"
                      >
                        <span className="text-[#ff6db3] font-bold bg-[#ff6db3]/20 py-1 px-3 rounded-md">
                          {word}
                        </span>
                        <span className="text-[#7fceff] font-bold">
                          {count}
                        </span>
                        <Progress
                          value={
                            (count /
                              Math.max(
                                ...Object.values(
                                  JSON.parse(result.filler_words)
                                )
                              )) *
                            100
                          }
                          className="w-full h-2 bg-[#2e2f61] ml-2"
                          indicatorClassName="bg-gradient-to-r from-[#7fceff] to-[#ff6db3]"
                        />
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-[#1a1c3d] rounded-lg p-6 border-b border-[#2e2f61]">
                  <h3 className="text-xl font-bold text-[#7fceff] mb-2">
                    Long Pauses
                  </h3>
                  <p className="text-[#f0f0f0]">
                    {result.long_pauses}
                  </p>
                </div>

                <div className="bg-[#1a1c3d] rounded-lg p-6 border-b border-[#2e2f61]">
                  <h3 className="text-xl font-bold text-[#7fceff] mb-2">
                    Pause Durations
                  </h3>
                  <p className="text-[#f0f0f0]">
                    {result.pause_durations}
                  </p>
                </div>

                <div className="bg-[#1a1c3d] rounded-lg p-6">
                  <h3 className="text-xl font-bold text-[#7fceff] mb-2">
                    Interview Date
                  </h3>
                  <p className="text-[#f0f0f0]">
                    {result.interview_date}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))
      ) : (
        <Card className="bg-[#0a0b24] border-[#2e2f61] mb-6">
          <CardContent>
            <div className="flex flex-col items-center justify-center py-10">
              <div className="text-6xl mb-4">
                <Info style={{ color: "#7fceff" }} />
              </div>

              <p className="text-[#f0f0f0] text-lg mb-2">
                Oops, it looks like there are no results available
                right now.
              </p>

              <p className="text-[#7fceff] text-sm mb-6">
                Try starting a new interview to get your feedback!
              </p>

              <Button
                onClick={handleStartNewInterview}
                className="bg-[#ff6db3] text-[#050614] hover:bg-[#ff6db3]/90"
              >
                <Play className="mr-2 h-4 w-4" /> Start New Interview
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      <Card className="bg-[#0a0b24] border-[#2e2f61] mb-6">
        <CardHeader>
          <CardTitle className="text-[#7fceff] flex justify-between items-center">
            Mock AI Analysis
            {analysisLoading && (
              <Loader2 className="h-4 w-4 animate-spin" />
            )}
          </CardTitle>
        </CardHeader>
        <CardContent>
          {analysisLoading ? (
            <p className="text-[#f0f0f0]">
              Analyzing your answers...
            </p>
          ) : (
            <ScrollArea className="h-[200px] w-full rounded-md border p-4">
              {results.map((result, index) => (
                <div key={index} className="mb-4">
                  <h3 className="font-semibold mb-2">
                    Question {index + 1}
                  </h3>
                  <p className="text-[#f0f0f0]">
                    {result.ai_feedback || "No analysis available."}
                  </p>
                </div>
              ))}
            </ScrollArea>
          )}
        </CardContent>
      </Card>

      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-2">
          <Checkbox
            id="saveResults"
            checked={saveResults}
            onCheckedChange={handleSaveToggle}
          />
          <label
            htmlFor="saveResults"
            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
            Save Results
          </label>
        </div>
        <Button
          onClick={handleSaveResults}
          className="bg-[#7fceff] text-[#050614] hover:bg-[#7fceff]/90"
          disabled={!saveResults}
        >
          <Save className="mr-2 h-4 w-4" /> Save Results
        </Button>
      </div>

      <div className="flex justify-between">
        {results.length > 0 && (
          <div className="flex justify-between">
            <Button
              onClick={handleStartNewInterview}
              className="bg-[#ff6db3] text-[#050614] hover:bg-[#ff6db3]/90"
            >
              <Play className="mr-2 h-4 w-4" /> Start New Interview
            </Button>
            <Button
              onClick={handleSignOut}
              variant="outline"
              className="text-[#ff6db3] border-[#ff6db3] hover:bg-[#ff6db3]/10"
            >
              <LogOut className="mr-2 h-4 w-4" /> Sign Out
            </Button>
          </div>
        )}
        <Button
          onClick={handleSignOut}
          variant="outline"
          className="text-[#ff6db3] border-[#ff6db3] hover:bg-[#ff6db3]/10"
        >
          <LogOut className="mr-2 h-4 w-4" /> Sign Out
        </Button>
      </div>
    </div>
  );
};

export default Results;

// "use client";
// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { useUser } from "@auth0/nextjs-auth0/client";
// import AnalysisCard from "./AnalysisCard";

// const Results = () => {
//   const { user } = useUser();
//   const [results, setResults] = useState<any[]>([]); // Treat results as an array
//   const [saveResults, setSaveResults] = useState(false);
//   const [analysisLoading, setAnalysisLoading] = useState(false);
//   const [email, setEmail] = useState(user?.email);

//   useEffect(() => {
//     setEmail(user?.email);
//   }, [user?.email]);

//   // Fetch results and handle both object and array response
//   useEffect(() => {
//     if (email) {
//       axios
//         .get("/service/get_results", {
//           params: { user: user?.email },
//           headers: { "Content-Type": "application/json" },
//         })
//         .then((response) => {
//           // Check if response is an array or object
//           const fetchedResults = Array.isArray(response.data)
//             ? response.data
//             : [response.data]; // If it's an object, convert it to an array

//           setResults(fetchedResults); // Save fetched results in state
//           console.log("Fetched results:", fetchedResults);

//           // Fetch AI analysis after fetching results
//           fetchAIAnalysis(fetchedResults);
//         })
//         .catch((error) => {
//           console.error("Error fetching results:", error);
//         });
//     }
//   }, [email]);

//   // Fetch AI analysis and update results state with ai_feedback
//   const fetchAIAnalysis = (fetchedResults) => {
//     if (email) {
//       setAnalysisLoading(true);

//       axios
//         .post(
//           "/service/generate_ai_response",
//           { user: user?.email },
//           {
//             headers: { "Content-Type": "application/json" },
//           }
//         )
//         .then((response) => {
//           const analysisData =
//             typeof response.data.response === "string"
//               ? [response.data.response]
//               : Array.isArray(response.data.response)
//               ? response.data.response
//               : [];

//           // Update each result with its corresponding ai_feedback
//           const updatedResults = fetchedResults.map(
//             (result, index) => ({
//               ...result,
//               ai_feedback: analysisData[index] || "", // Assign corresponding analysis or empty string
//             })
//           );

//           setResults(updatedResults); // Update the results state with ai_feedback
//           console.log(
//             "Updated results with AI feedback:",
//             updatedResults
//           );
//         })
//         .catch((error) => {
//           console.error("Error fetching analysis:", error);
//         })
//         .finally(() => setAnalysisLoading(false));
//     }
//   };

//   const handleSaveToggle = () => {
//     setSaveResults(!saveResults); // Toggle the saveResults state
//   };

//   const handleSaveResults = () => {
//     if (results.length === 0) {
//       alert(
//         "No results available to save. Please ensure you have completed the interview."
//       );
//       console.warn(
//         "Attempted to save results, but the results array is empty."
//       );
//       return;
//     }

//     if (saveResults) {
//       const payload = {
//         user: user?.email,
//         results: results.map((result) => ({
//           question_id: result.question_id,
//           question: result.question,
//           transcript: result.transcript,
//           score: result.score,
//           filler_word_count: result.filler_words,
//           long_pauses: result.long_pauses,
//           pause_durations: result.pause_durations,
//           ai_feedback: result.ai_feedback || "", // Include ai_feedback
//         })),
//       };

//       console.log("Saving results payload:", payload);

//       axios
//         .post("/service/save_results", payload)
//         .then(() => {
//           alert("Results saved successfully.");
//         })
//         .catch((error) => {
//           console.error("Error saving results:", error);
//         });
//     } else {
//       console.log("Save results is not enabled.");
//     }
//   };

//   const handleStartNewInterview = () => {
//     window.location.href = "/interview";
//   };

//   const handleSignOut = () => {
//     window.location.href = "/api/auth/logout";
//   };

//   if (!user) {
//     return (
//       <div className="hero">
//         <div className="flex-1 pt-36 padding-x">
//           <h1 className="text-2xl font-bold">
//             Your Interview Results Powered by mockAI
//           </h1>
//           <p className="text-lg mt-4">
//             Sorry, but you must be signed in to review your results.
//           </p>
//           <button className="bg-primary-blue text-white mt-10 rounded-full">
//             <a href="/api/auth/login">
//               Sign In to Review Your Results
//             </a>
//           </button>
//         </div>
//       </div>
//     );
//   } else {
//     return (
//       <div className="hero">
//         <div className="flex-1 pt-36 padding-x">
//           <h1 className="text-2xl font-bold">
//             Your Interview Feedback Powered by mockAI
//           </h1>
//           {results.length > 0 ? (
//             results.map((result, index) => (
//               <div
//                 key={index}
//                 className="result-card text-black p-2 m-2"
//               >
//                 <h2 className="text-xl font-bold">
//                   {result.question}
//                 </h2>

//                 <p>
//                   <strong>Transcript:</strong> {result.transcript}
//                 </p>
//                 <p>
//                   <strong>Filler Words:</strong> {result.filler_words}
//                 </p>
//                 <p>
//                   <strong>Long Pauses:</strong> {result.long_pauses}
//                 </p>
//                 <p>
//                   <strong>Pause Durations:</strong>{" "}
//                   {result.pause_durations}
//                 </p>
//                 <p>
//                   <strong>Interview Date:</strong>{" "}
//                   {result.interview_date}
//                 </p>
//               </div>
//             ))
//           ) : (
//             <p>No results available</p>
//           )}
//           {analysisLoading && (
//             <p className="animate-ping text-center">
//               Analyzing your answer...
//             </p>
//           )}
//           <AnalysisCard
//             title="Mock AI Analysis"
//             content={results.map((result) => result.ai_feedback)}
//             type="analysis"
//           />
//           <div className="flex items-center mt-4">
//             <label className="mr-2 text-lg font-medium">
//               Save Results
//             </label>
//             <input
//               type="checkbox"
//               checked={saveResults}
//               onChange={handleSaveToggle} // Toggle save state
//               className="w-6 h-6"
//             />
//           </div>
//           <button
//             onClick={handleSaveResults}
//             className="bg-primary-blue text-white mt-4 rounded-full p-2"
//           >
//             Save Results
//           </button>
//           <div className="flex justify-between mt-6">
//             <button
//               onClick={handleStartNewInterview}
//               className="bg-green-500 text-white rounded-full p-2"
//             >
//               Start New Interview
//             </button>
//             <button
//               onClick={handleSignOut}
//               className="bg-red-500 text-white rounded-full p-2"
//             >
//               Sign Out
//             </button>
//           </div>
//         </div>
//       </div>
//     );
//   }
// };

// export default Results;
