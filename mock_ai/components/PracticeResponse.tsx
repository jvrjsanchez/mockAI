import React from "react";
function MicIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z" />
      <path d="M19 10v2a7 7 0 0 1-14 0v-2" />
      <line x1="12" x2="12" y1="19" y2="22" />
    </svg>
  );
}

interface PracticeResponseProps {
  selectedQuestion: { question: string } | null;
  recordingTime: string;
  isRecording: boolean;
  handleToggleRecording: () => void;
  notification: string | null;
  transcript: string | null;
}

const PracticeResponse: React.FC<PracticeResponseProps> = ({
  selectedQuestion,
  recordingTime,
  isRecording,
  handleToggleRecording,
  notification,
  transcript,
}) => {
  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-base font-medium">
          {selectedQuestion
            ? selectedQuestion.question
            : "Select a question in the list above."}
        </h3>
        <div className="flex items-center gap-2">
          <div className="bg-primary text-primary-foreground px-3 py-1 rounded-full text-sm font-medium">
            {recordingTime}
          </div>
          <button
            className="text-primary"
            onClick={handleToggleRecording}
          >
            <MicIcon
              className={
                isRecording
                  ? "animate-pulse h-6 w-6 text-red-500"
                  : "h-6 w-6 text-popover-foreground"
              }
            />
          </button>
        </div>
      </div>
      {notification && (
        <div className="text-red-500">{notification}</div>
      )}
      <div className="bg-muted rounded-lg p-4">
        <p className="text-muted-foreground">
          {transcript && (
            <span className="text-black">{transcript}</span>
          )}
        </p>
      </div>
    </div>
  );
};

export default PracticeResponse;