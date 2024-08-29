export type Feedback = {
  filler_word_count: {
    like: number;
    so: number;
    uh: number;
    um: number;
    "you know": number;
  };
  long_pauses: number;
  pause_durations: number[];
};

export type Question = {
  id: number;
  question: string;
};
