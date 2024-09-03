import React from "react";

const HowItWorksSection = () => {
  return (
    <section className="w-full py-12 md:py-24 lg:py-32 bg-[#0a0b2e]">
      <div className="container mx-auto px-4 md:px-6">
        <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-center mb-12">
          How It Works
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="flex flex-col items-center text-center">
            <div className="w-12 h-12 rounded-full bg-[#ff3b9a] text-white flex items-center justify-center text-xl font-bold mb-4">
              1
            </div>
            <h3 className="text-xl font-bold mb-2">
              Set Up Your Profile
            </h3>
            <p className="text-[#a3a8c3]">
              Create your account and specify your goals or hiring
              needs.
            </p>
          </div>
          <div className="flex flex-col items-center text-center">
            <div className="w-12 h-12 rounded-full bg-[#5ebbff] text-[#0a0b2e] flex items-center justify-center text-xl font-bold mb-4">
              2
            </div>
            <h3 className="text-xl font-bold mb-2">
              AI-Powered Interviews
            </h3>
            <p className="text-[#a3a8c3]">
              Engage in realistic interview simulations or screen
              candidates efficiently.
            </p>
          </div>
          <div className="flex flex-col items-center text-center">
            <div className="w-12 h-12 rounded-full bg-[#ff3b9a] text-white flex items-center justify-center text-xl font-bold mb-4">
              3
            </div>
            <h3 className="text-xl font-bold mb-2">
              Receive Insights
            </h3>
            <p className="text-[#a3a8c3]">
              Get detailed feedback, performance analytics, and
              actionable recommendations.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;
