import { FC } from "react";
import { Feedback } from "@/types";

interface FillerCountProps {
  feedback: Feedback;
}

const FillerCount: FC<FillerCountProps> = ({ feedback }) => {
  return (
    <div className="mt-8">
      <h2 className="text-xl font-bold text-gray-800 mb-4">
        Filler Words and Pause count:
      </h2>
      <ul className="list-disc pl-5 space-y-2">
        <li className="text-gray-700">
          Like:{" "}
          <span className="font-semibold">
            {feedback.filler_word_count.like}
          </span>
        </li>
        <li className="text-gray-700">
          So:{" "}
          <span className="font-semibold">
            {feedback.filler_word_count.so}
          </span>
        </li>
        <li className="text-gray-700">
          Uh:{" "}
          <span className="font-semibold">
            {feedback.filler_word_count.uh}
          </span>
        </li>
        <li className="text-gray-700">
          Um:{" "}
          <span className="font-semibold">
            {feedback.filler_word_count.um}
          </span>
        </li>
        <li className="text-gray-700">
          You know:{" "}
          <span className="font-semibold">
            {feedback.filler_word_count["you know"]}
          </span>
        </li>
        <li className="text-gray-700">
          Long pauses:{" "}
          <span className="font-semibold">
            {feedback.long_pauses}
          </span>
        </li>
        <li className="text-gray-700">
          Pause durations:{" "}
          <span className="font-semibold">
            {feedback.pause_durations.length === 0
              ? 0
              : feedback.pause_durations.join(", ")}
          </span>
        </li>
      </ul>
    </div>
  );
};
export default FillerCount;