'use client'
import { useEffect, useState } from 'react';
import axios from 'axios';

const Questions = ({ onSelectQuestion }: { onSelectQuestion: (question: string) => void }) => {
  const [questions, setQuestions] = useState<string[]>([]);
  const [selectedQuestion, setSelectedQuestion] = useState<string | null>(null);

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const response = await axios.get('/service/get_questions');
        setQuestions(response.data);
      } catch (error) {
        console.error('Error fetching questions:', error);
      }
    };

    fetchQuestions();
  }, []);

  const handleQuestionClick = (question: string) => {
    setSelectedQuestion(question);
    onSelectQuestion(question);
  };

  return (
    <div className="w-1/2 p-4 border-r border-gray-300">
      <h2 className="text-xl font-bold mb-4">Choose an Interview Question</h2>
      <ul>
        {questions.map((question, index) => (
          <li
            key={index}
            className={`cursor-pointer p-2 ${selectedQuestion === question ? 'bg-gray-200' : ''}`}
            onClick={() => handleQuestionClick(question)}
          >
            {question}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Questions
