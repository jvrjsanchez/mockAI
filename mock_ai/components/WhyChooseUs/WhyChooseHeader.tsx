import React from "react";

interface WhyChooseHeaderProps {
  title: string;
}

const WhyChooseHeader = ({ title }: WhyChooseHeaderProps) => (
  <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-center mb-12">
    {title}
  </h2>
);

export default WhyChooseHeader;
