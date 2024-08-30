"use client";
import React, { useState } from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "../ui/Tabs";
import { Button } from "../ui/Button";
import Link from "next/link";

const HeroTabs = () => {
  const [activeTab, setActiveTab] = useState("jobseekers");

  return (
    <Tabs
      defaultValue="jobseekers"
      className="w-full max-w-[400px]"
      onValueChange={(value) => setActiveTab(value)}
    >
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="jobseekers">Job Seekers</TabsTrigger>
        <TabsTrigger value="businesses">Businesses</TabsTrigger>
      </TabsList>
      <TabsContent value="jobseekers">
        <Link href="/interview">
          <Button className="w-full bg-[#ff3b9a] hover:bg-[#ff3b9a]/90">
            Start Practicing Now
          </Button>
        </Link>
      </TabsContent>
      <TabsContent value="businesses">
        <Button className="w-full bg-[#5ebbff] text-[#0a0b2e] hover:bg-[#5ebbff]/90">
          Streamline Your Hiring
        </Button>
      </TabsContent>
    </Tabs>
  );
};
``;

export default HeroTabs;
