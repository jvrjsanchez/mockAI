import React from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "../ui/Tabs";
import WhyChooseTabContent from "./WhyChooseTabContent";
import {
  ArrowRight,
  CheckCircle,
  Users,
  Building,
  FileSearch,
  BarChart,
} from "lucide-react";

const WhyChooseTabs = () => (
  <Tabs
    defaultValue="jobseekers"
    className="w-full max-w-[800px] mx-auto"
  >
    <TabsList className="grid w-full grid-cols-2 mb-8">
      <TabsTrigger value="jobseekers">For Job Seekers</TabsTrigger>
      <TabsTrigger value="businesses">For Businesses</TabsTrigger>
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
            icon: <Users className="h-12 w-12 text-[#5ebbff] mb-4" />,
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

export default WhyChooseTabs;
