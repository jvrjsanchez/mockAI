import React from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "../ui/Tabs";
import { Button } from "../ui/Button";

const HeroTabs = () => (
  <Tabs defaultValue="jobseekers" className="w-full max-w-[400px]">
    <TabsList className="grid w-full grid-cols-2">
      <TabsTrigger value="jobseekers">Job Seekers</TabsTrigger>
      <TabsTrigger value="businesses">Businesses</TabsTrigger>
    </TabsList>
    <TabsContent value="jobseekers">
      <Button className="w-full bg-[#ff3b9a] text-white hover:bg-[#ff3b9a]/90">
        Start Practicing Now
      </Button>
    </TabsContent>
    <TabsContent value="businesses">
      <Button className="w-full bg-[#5ebbff] text-[#0a0b2e] hover:bg-[#5ebbff]/90">
        Streamline Your Hiring
      </Button>
    </TabsContent>
  </Tabs>
);

export default HeroTabs;
