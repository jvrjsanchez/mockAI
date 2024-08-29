import { Separator } from "./ui/seperator";

interface FillerWords {
  long_pauses: number;
  pause_durations: string[];
  filler_word_count: Record<string, number>;
  fillerWords: FillerWords;
}

export function Stats({ fillerWords }: FillerWords) {
  return (
    <div className="bg-gradient-to-br from-primary to-secondary rounded-md shadow-lg flex flex-col items-center justify-center p-8">
      <div className="space-y-6 w-full max-w-md">
        <div className="flex flex-col items-center justify-between">
          <h3 className="text-2xl font-bold text-primary-foreground">
            Filler Words
          </h3>
          <div className="flex flex-col items-center gap-4 mt-4">
            <div className="flex items-center gap-2 text-primary-foreground">
              <span>Long Pauses:</span>
              <span className="font-bold text-2xl">
                {fillerWords.long_pauses}
              </span>
            </div>
            <Separator className="w-full bg-primary-foreground/50" />
            <div className="flex items-center gap-2 text-primary-foreground">
              <span>Pause Durations:</span>
              <span className="font-bold text-2xl">
                {fillerWords.pause_durations.length === 0
                  ? 0
                  : fillerWords.pause_durations.join(", ")}
              </span>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-6 sm:grid-cols-3 md:grid-cols-5">
          {Object.entries(fillerWords.filler_word_count).map(
            ([word, count], i: number) => (
              <div
                key={word}
                className="flex flex-col items-center gap-3"
              >
                <div className="bg-primary px-3 py-1 rounded-full text-nowrap text-primary-foreground font-semibold text-base animate-pulse ">
                  {word}
                </div>
                <span className="font-bold text-xl text-primary-foreground">
                  {count}
                </span>
              </div>
            )
          )}
        </div>
      </div>
    </div>
  );
}