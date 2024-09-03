import React from "react";
import HeroContent from "./HeroContent";
import HeroTabs from "./HeroTabs";

const HeroSection = () => (
  <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48 bg-gradient-to-r from-[#0a0b2e] via-[#1e0b41] to-[#380e54]">
    <div className="container mx-auto px-4 md:px-6">
      <div className="flex flex-col items-center space-y-4 text-center">
        <HeroContent />
        <HeroTabs />
      </div>
    </div>
  </section>
);

export default HeroSection;
