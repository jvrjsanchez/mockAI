"use client";

import React from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "../ui/Tabs";
import WhyChooseTabContent from "./WhyChooseTabContent";
import { useState } from "react";
import {
  ArrowRight,
  CheckCircle,
  Users,
  Building,
  FileSearch,
  BarChart,
} from "lucide-react";

const WhyChooseTabs = () => {
  const [activeTab, setActiveTab] = useState("jobseekers");

  return (
    <Tabs
      defaultValue="jobseekers"
      className="w-full max-w-[800px] mx-auto"
      onValueChange={(value) => setActiveTab(value)}
    >
      <TabsList className="grid  p-1 grid-cols-2 mb-8">
        <TabsTrigger
          value="jobseekers"
          className="py-1 px-4 w-19 text-center"
        >
          For Job Seekers
        </TabsTrigger>
        <TabsTrigger
          value="businesses"
          className="py-1 px-4 w-19 text-center"
        >
          For Businesses
        </TabsTrigger>
      </TabsList>
      <TabsContent value="jobseekers">
        <WhyChooseTabContent
          items={[
            {
              icon: (
                <CheckCircle className="h-12 w-12 text-[#5ebbff] mb-4" />
              ),
              title: "Realistic Simulations",
              description:
                "Experience interviews that feel just like the real thing, powered by advanced AI.",
            },
            {
              icon: (
                <ArrowRight className="h-12 w-12 text-[#ff3b9a] mb-4" />
              ),
              title: "Instant Feedback",
              description:
                "Get immediate, actionable insights to improve your interview performance.",
            },
            {
              icon: (
                <Users className="h-12 w-12 text-[#5ebbff] mb-4" />
              ),
              title: "Personalized Learning",
              description:
                "Tailored practice sessions based on your industry and experience level.",
            },
          ]}
        />
      </TabsContent>
      <TabsContent value="businesses">
        <WhyChooseTabContent
          items={[
            {
              icon: (
                <Building className="h-12 w-12 text-[#5ebbff] mb-4" />
              ),
              title: "Efficient Screening",
              description:
                "Automate initial interviews to save time and resources in your hiring process.",
            },
            {
              icon: (
                <FileSearch className="h-12 w-12 text-[#ff3b9a] mb-4" />
              ),
              title: "Standardized Evaluation",
              description:
                "Ensure fair and consistent assessment of all candidates with AI-driven interviews.",
            },
            {
              icon: (
                <BarChart className="h-12 w-12 text-[#5ebbff] mb-4" />
              ),
              title: "Data-Driven Insights",
              description:
                "Gain valuable analytics on candidate performance and hiring trends.",
            },
          ]}
        />
      </TabsContent>
    </Tabs>
  );
};

export default WhyChooseTabs;
