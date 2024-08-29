function AIFeedback({ feedbackData }) {
    return (
      <div className="bg-gray-100 p-4 rounded-lg shadow-md">
        <h3 className="text-lg font-bold text-gray-800">AI Feedback</h3>
        <div className="mt-4 prose prose-sm">
          {feedbackData && <p>{feedbackData.response}</p>}
        </div>
      </div>
    );
  }
  
  export default AIFeedback;