import React from "react";
import { Input } from "./ui/Input";
import { Button } from "./ui/Button";

interface CallToActionProps {
  title: string;
  subTitle: string;
  btnText: string;
  enticeText: string;
}
const CallToAction = ({
  title,
  subTitle,
  btnText,
  enticeText,
}: CallToActionProps) => {
  return (
    <section className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-r from-[#0a0b2e] via-[#1e0b41] to-[#380e54]">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col items-center space-y-4 text-center">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
              {title}
            </h2>
            <p className="mx-auto max-w-[600px] text-[#a3a8c3] md:text-xl">
              {subTitle}
            </p>
          </div>
          <div className="w-full max-w-sm space-y-2">
            <form className="flex space-x-2">
              <Input
                className="flex-1 bg-white/10 border-white/20 text-white placeholder:text-white/50"
                placeholder="Enter your email"
                type="email"
              />
              <Button className="bg-[#ff3b9a] text-white hover:bg-[#ff3b9a]/90">
                {btnText}
              </Button>
            </form>
            <p className="text-xs text-[#a3a8c3]">{enticeText}</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CallToAction;
