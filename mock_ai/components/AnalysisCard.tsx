import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";

interface AnalysisCardProps {
  title: string;
  content: string | string[];
  type: "question" | "analysis";
}

const AnalysisCard = ({
  title,
  content,
  type,
}: AnalysisCardProps) => {
  const isQuestion = type === "question";

  return (
    <Card className="bg-[#0a0b24] border-[#2e2f61] mb-4 rounded-lg shadow-lg transition-transform hover:scale-102 max-w-2xl mx-auto">
      <CardHeader className="pb-2">
        <CardTitle className="text-[#7fceff] text-2xl font-semibold">
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent>
        {isQuestion ? (
          <p className="text-[#f0f0f0] text-lg leading-relaxed">
            {content as string}
          </p>
        ) : Array.isArray(content) ? (
          content.length > 0 ? (
            content.map((text, i) => (
              <div
                key={i}
                className="bg-[#131538] p-4 rounded-lg mb-4 last:mb-0"
              >
                <p className="text-[#f0f0f0]">{text}</p>
              </div>
            ))
          ) : (
            <p className="text-[#f0f0f0]">No analysis available</p>
          )
        ) : (
          <p className="text-[#f0f0f0]">Invalid content format</p>
        )}
      </CardContent>
    </Card>
    // <>
    //   {analysis.length > 0 ? (
    //     analysis.map((text, i) => (
    //       <article
    //         key={i}
    //         className="bg-[#0A0A24] p-4 border border-blue-300 rounded-lg my-2 mx-2 shadow-sm hover:bg-blue-100 transition ease-in-out duration-200"
    //       >
    //         <h2 className="text-lg font-semibold text-center py-2 my-2 text-blue-900">
    //           {title}
    //         </h2>
    //         <p className="p-2 font-sans text-blue-700">{text}</p>
    //       </article>
    //     ))
    //   ) : (
    //     <p>No analysis available</p>
    //   )}
    // </>
  );
};

export default AnalysisCard;
