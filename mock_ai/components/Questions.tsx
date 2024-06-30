'use client'
import { useEffect, useState } from 'react';
import axios from 'axios';

interface Question {
  id: number;
  text: string;
}

const Questions = ({ onSelect }: { onSelect: (question: string) => void }) => {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [selectedQuestion, setSelectedQuestion] = useState<string>('');

  useEffect(() => {
    axios.get('/service/get_questions')
      .then(response => setQuestions(response.data))
      .catch(error => console.error('Error fetching questions:', error));
  }, []);

  const handleQuestionClick = (question: string) => {
    setSelectedQuestion(question);
    onSelect(question);
  };

  return (
    <div className="w-1/2 p-4 border-r border-gray-300">
      <h2 className="text-xl font-bold mb-4">Select a Question</h2>
      <ul>
        {questions.map((question) => (
          <li
            key={question.id}
            className={`cursor-pointer p-2 ${selectedQuestion === question.text ? 'bg-gray-200' : ''}`}
            onClick={() => handleQuestionClick(question.text)}
          >
            {question.text}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Questions
