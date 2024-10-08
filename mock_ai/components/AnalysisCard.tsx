import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Skeleton } from "./ui/skeleton";

interface AnalysisCardProps {
  title: string;
  content: string | string[];
  type: "question" | "analysis";
  isLoading?: boolean;
}

const AnalysisCard = ({
  title,
  content,
  type,
  isLoading = false,
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
        {isLoading ? (
          <div
            className={`space-y-4 transition-opacity duration-500 ${
              isLoading ? "opacity-100" : "opacity-0"
            }`}
          >
            <Skeleton className="h-3 w-3/4" />
            <Skeleton className="h-3 w-1/2" />
            <Skeleton className="h-3 w-3/4" />
            <Skeleton className="h-3 w-1/2" />
            <Skeleton className="h-3 w-1/2" />
            <Skeleton className="h-3 w-2/3" />
          </div>
        ) : (
          <div
            className={`transition-opacity duration-500 ${
              isLoading ? "opacity-0" : "opacity-100"
            }`}
          >
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
                <p className="text-[#f0f0f0]">
                  No analysis available
                </p>
              )
            ) : (
              <p className="text-[#f0f0f0]">Invalid content format</p>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default AnalysisCard;
