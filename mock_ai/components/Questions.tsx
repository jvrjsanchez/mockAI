import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Play } from "lucide-react";

interface Question {
  question: string[];
  title: string;
}

interface QuestionsProps {
  questions: Question[];
  selectedQuestion: Question | null;
  onSelectQuestion: (question: Question) => void;
  setNotification: (notification: string | null) => void;
}

export function Questions({
  questions,
  selectedQuestion,
  onSelectQuestion,
  setNotification,
}: QuestionsProps) {
  function handleQuestionClick(q: Question) {
    console.log("Selected question:", q);
    onSelectQuestion(q);
    setNotification(null);
  }

  return (
    <Card className="bg-[#0a0b24] border-[#2e2f61]">
      <CardContent className="p-0">
        <ScrollArea className="h-[400px] pr-4">
          {questions.map((q) => (
            <div
              key={q.id}
              className={`p-4 cursor-pointer transition-all duration-200 ${
                selectedQuestion?.id === q.id
                  ? "bg-[#131538] border-l-4 border-[#ff6db3]"
                  : "hover:bg-[#131538] border-l-4 border-transparent"
              }`}
              onClick={() => handleQuestionClick(q)}
            >
              <div className="flex items-center justify-between">
                <h3 className="text-[#f0f0f0] text-base font-medium pr-4">
                  {q.question}
                </h3>
                <PlayIcon
                  selected={selectedQuestion?.id === q.id}
                  aria-hidden="true"
                />
              </div>
            </div>
          ))}
        </ScrollArea>
      </CardContent>
    </Card>
  );
}

interface PlayIconProps {
  selected: boolean;
}

function PlayIcon({ selected }: PlayIconProps) {
  return (
    <div
      className={`rounded-full p-2 transition-all duration-200 ${
        selected
          ? "bg-[#ff6db3] text-[#050614]"
          : "bg-[#7fceff] text-[#050614]"
      }`}
    >
      <Play size={16} className={selected ? "animate-pulse" : ""} />
    </div>
  );
}

// import React from "react";
// import { Question } from "@/types";

// interface QuestionsProps {
//   questions: Question[];
//   selectedQuestion: Question | null;
//   onSelectQuestion: (question: Question) => void;
//   setNotification: (notification: string | null) => void;
// }

// export function Questions({
//   questions,
//   selectedQuestion,
//   onSelectQuestion,
//   setNotification,
// }: QuestionsProps) {
//   function handleQuestionClick(q: Question) {
//     console.log("Selected question:", q);
//     onSelectQuestion(q);
//     setNotification(null);
//   }
//   console.log("Questions:", questions);

//   return (
//     <div className="divide-y divide-muted">
//       {questions.map((q) => (
//         <div
//           key={q.id}
//           className={`px-6 py-4 hover:bg-muted cursor-pointer ${
//             selectedQuestion === q
//               ? "bg-blue-100 border-l-4 border-blue-500"
//               : ""
//           }`}
//         >
//           <div className="flex items-center justify-between">
//             <div onClick={() => handleQuestionClick(q)}>
//               <h3 className="text-base font-medium">{q.question}</h3>
//             </div>
//             <button className="text-primary">
//               <PlayIcon
//                 selected={selectedQuestion === q}
//                 className={
//                   selectedQuestion === q
//                     ? "h-5 w-5 text-blue-500 animate-pulse"
//                     : "h-5 w-5"
//                 }
//               />
//             </button>
//           </div>
//         </div>
//       ))}
//     </div>
//   )
// }

// interface PlayIconProps extends React.SVGProps<SVGSVGElement> {
//   selected: boolean;
// }

// function PlayIcon({ selected, ...props }: PlayIconProps) {
//   return (
//     <svg
//       {...props}
//       xmlns="http://www.w3.org/2000/svg"
//       width="24"
//       height="24"
//       viewBox="0 0 24 24"
//       fill={selected ? "accent" : "none"}
//       stroke={selected ? "blue" : "currentColor"}
//       strokeWidth="2"
//       strokeLinecap="round"
//       strokeLinejoin="round"
//     >
//       <polygon points="6 3 20 12 6 21 6 3" />
//     </svg>
//   );
// }
