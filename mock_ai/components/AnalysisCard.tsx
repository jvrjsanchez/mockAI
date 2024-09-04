interface AnalysisCardProps {
  analysis: string[];
  title: string;
}

const AnalysisCard = ({ analysis = [], title }: AnalysisCardProps) => {
  console.log(analysis);
  return (
    <>
      {analysis.length > 0 ? (
        analysis.map((text, i) => (
          <article
            key={i}
            className="bg-blue-50 p-4 border border-blue-300 rounded-lg my-2 mx-2 shadow-sm hover:bg-blue-100 transition ease-in-out duration-200"
          >
            <h2 className="text-lg font-semibold text-center py-2 my-2 text-blue-900">
              {title}
            </h2>
            <p className="p-2 font-sans text-blue-700">{text}</p>
          </article>
        ))
      ) : (
        <p>No analysis available</p>
      )}
    </>
  );
};

export default AnalysisCard;
