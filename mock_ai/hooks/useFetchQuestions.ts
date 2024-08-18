import { useState, useEffect } from "react";
import { Question } from "@/types";
import { fetchQuestions } from "@/app/actions";

const useFetchQuestions = () => {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response: Question[] = await fetchQuestions();
        setQuestions(response);
      } catch (error) {
        setError("Failed to fetch questions");
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  return { questions, isLoading, error };
};

export default useFetchQuestions;
