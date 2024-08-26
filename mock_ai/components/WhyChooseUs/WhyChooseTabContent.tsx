import React from "react";

interface TabContentItem {
  icon: React.ReactNode;
  title: string;
  description: string;
}

interface WhyChooseTabContentProps {
  items: TabContentItem[];
}

const WhyChooseTabContent: React.FC<WhyChooseTabContentProps> = ({
  items,
}) => (
  <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
    {items.map((item, index) => (
      <div
        key={index}
        className="flex flex-col items-center text-center"
      >
        {item.icon}
        <h3 className="text-xl font-bold mb-2">{item.title}</h3>
        <p className="text-[#a3a8c3]">{item.description}</p>
      </div>
    ))}
  </div>
);

export default WhyChooseTabContent;
