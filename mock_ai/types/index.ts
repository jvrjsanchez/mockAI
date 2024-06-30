import { MouseEventHandler } from "react";

export interface CustomButtonProps {
  href: string;
  title: string;
  containerStyles?: string;
  handleClick?: MouseEventHandler<HTMLButtonElement>;
  btnType?: "button" | "submit";
}

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
