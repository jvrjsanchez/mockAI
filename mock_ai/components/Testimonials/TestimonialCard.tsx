import React from "react";
import { Star } from "lucide-react";

interface TestimonialCardProps {
  text: string;
  author: string;
  rating: number;
}

const TestimonialCard: React.FC<TestimonialCardProps> = ({
  text,
  author,
  rating,
}) => {
  return (
    <div className="bg-[#1a1b4b] p-6 rounded-lg shadow-md">
      <div className="flex items-center mb-4">
        {[...Array(5)].map((_, index) => (
          <Star
            key={index}
            fill={index < rating ? "gold" : "none"}
            className="h-5 w-5"
          />
        ))}
      </div>
      <p className="text-[#a3a8c3] mb-4">{text}</p>
      <p className="font-bold">{author}</p>
    </div>
  );
};

export default TestimonialCard;
