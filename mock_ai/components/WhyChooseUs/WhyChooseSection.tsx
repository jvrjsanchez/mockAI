import React from "react";
import WhyChooseHeader from "./WhyChooseHeader";
import WhyChooseTabs from "./WhyChooseTabs";

const WhyChooseSection = () => (
  <section className="w-full py-12 md:py-24 lg:py-32 bg-[#0f1033]">
    <div className="container px-4 md:px-6">
      <WhyChooseHeader title="Why Choose MockAI?" />
      <WhyChooseTabs />
    </div>
  </section>
);

export default WhyChooseSection;
