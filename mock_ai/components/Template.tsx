// import CallToAction from "./CallToAction";
// import HeroSection from "./Hero/HeroSection";
// import Testimonials from "./Testimonials/Testimonials";
// import WhyChooseSection from "./WhyChooseUs/WhyChooseSection";

// import HowItWorksSection from "./HowItWorksSection";

// export default function Template() {
//   return (
//     <main className="flex-1">
//       <HeroSection />
//       <WhyChooseSection />
//       <HowItWorksSection />

//       <Testimonials />

//       <CallToAction
//         title="Ready to Transform Your Interview Experience?"
//         subTitle="Whether you're preparing for your next career move or
//               looking to streamline your hiring process, Mockai has
//               you covered."
//         btnText="Get Started"
//         enticeText="Start your free trial today. No credit card required."
//       />
//     </main>
//   );
// }

import { Button } from "./ui/Button";
import { Input } from "./ui/Input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/Tabs";
import {
  ArrowRight,
  CheckCircle,
  Star,
  Users,
  Building,
  FileSearch,
  BarChart,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function LandingPage() {
  return (
    <div>
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 bg-[#ff6db3] text-[#050614] p-2 z-50"
      >
        Skip to main content
      </a>

      <main id="main-content" className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48 bg-gradient-to-r from-[#050614] via-[#1e0b41] to-[#380e54]">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center space-y-4 text-center">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none">
                  AI-Powered Interview Solutions
                </h1>
                <p className="mx-auto max-w-[700px] text-[#f0f0f0] md:text-xl">
                  Revolutionize your hiring process and interview
                  preparation with Mockai's cutting-edge AI
                  technology.
                </p>
              </div>
              <Tabs
                defaultValue="jobseekers"
                className="w-full max-w-[400px]"
              >
                <TabsList
                  className="grid w-full grid-cols-2"
                  aria-label="Choose your role"
                >
                  <TabsTrigger
                    value="jobseekers"
                    className="data-[state=active]:bg-[#ff6db3] data-[state=active]:text-[#050614]"
                  >
                    Job Seekers
                  </TabsTrigger>
                  <TabsTrigger
                    value="businesses"
                    className="data-[state=active]:bg-[#7fceff] data-[state=active]:text-[#050614]"
                  >
                    Businesses
                  </TabsTrigger>
                </TabsList>
                <TabsContent value="jobseekers">
                  <Button className="w-full bg-[#ff6db3] text-[#050614] hover:bg-[#ff6db3]/90 focus:ring-2 focus:ring-[#ff6db3] focus:ring-offset-2 focus:ring-offset-[#050614]">
                    Start Practicing Now
                  </Button>
                </TabsContent>
                <TabsContent value="businesses">
                  <Button className="w-full bg-[#7fceff] text-[#050614] hover:bg-[#7fceff]/90 focus:ring-2 focus:ring-[#7fceff] focus:ring-offset-2 focus:ring-offset-[#050614]">
                    Streamline Your Hiring
                  </Button>
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </section>
        <section
          className="w-full py-12 md:py-24 lg:py-32 bg-[#0a0b24]"
          aria-labelledby="features-heading"
        >
          <div className="container px-4 md:px-6">
            <h2
              id="features-heading"
              className="text-3xl font-bold tracking-tighter sm:text-5xl text-center mb-12"
            >
              Why Choose Mockai?
            </h2>
            <Tabs
              defaultValue="jobseekers"
              className="w-full max-w-[800px] mx-auto"
            >
              <TabsList
                className="grid w-full grid-cols-2 mb-8"
                aria-label="Features for different users"
              >
                <TabsTrigger
                  value="jobseekers"
                  className="data-[state=active]:bg-[#ff6db3] data-[state=active]:text-[#050614]"
                >
                  For Job Seekers
                </TabsTrigger>
                <TabsTrigger
                  value="businesses"
                  className="data-[state=active]:bg-[#7fceff] data-[state=active]:text-[#050614]"
                >
                  For Businesses
                </TabsTrigger>
              </TabsList>
              <TabsContent value="jobseekers">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  <div className="flex flex-col items-center text-center">
                    <CheckCircle
                      className="h-12 w-12 text-[#7fceff] mb-4"
                      aria-hidden="true"
                    />
                    <h3 className="text-xl font-bold mb-2">
                      Realistic Simulations
                    </h3>
                    <p className="text-[#f0f0f0]">
                      Experience interviews that feel just like the
                      real thing, powered by advanced AI.
                    </p>
                  </div>
                  <div className="flex flex-col items-center text-center">
                    <ArrowRight
                      className="h-12 w-12 text-[#ff6db3] mb-4"
                      aria-hidden="true"
                    />
                    <h3 className="text-xl font-bold mb-2">
                      Instant Feedback
                    </h3>
                    <p className="text-[#f0f0f0]">
                      Get immediate, actionable insights to improve
                      your interview performance.
                    </p>
                  </div>
                  <div className="flex flex-col items-center text-center">
                    <Users
                      className="h-12 w-12 text-[#7fceff] mb-4"
                      aria-hidden="true"
                    />
                    <h3 className="text-xl font-bold mb-2">
                      Personalized Learning
                    </h3>
                    <p className="text-[#f0f0f0]">
                      Tailored practice sessions based on your
                      industry and experience level.
                    </p>
                  </div>
                </div>
              </TabsContent>
              <TabsContent value="businesses">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  <div className="flex flex-col items-center text-center">
                    <Building
                      className="h-12 w-12 text-[#7fceff] mb-4"
                      aria-hidden="true"
                    />
                    <h3 className="text-xl font-bold mb-2">
                      Efficient Screening
                    </h3>
                    <p className="text-[#f0f0f0]">
                      Automate initial interviews to save time and
                      resources in your hiring process.
                    </p>
                  </div>
                  <div className="flex flex-col items-center text-center">
                    <FileSearch
                      className="h-12 w-12 text-[#ff6db3] mb-4"
                      aria-hidden="true"
                    />
                    <h3 className="text-xl font-bold mb-2">
                      Standardized Evaluation
                    </h3>
                    <p className="text-[#f0f0f0]">
                      Ensure fair and consistent assessment of all
                      candidates with AI-driven interviews.
                    </p>
                  </div>
                  <div className="flex flex-col items-center text-center">
                    <BarChart
                      className="h-12 w-12 text-[#7fceff] mb-4"
                      aria-hidden="true"
                    />
                    <h3 className="text-xl font-bold mb-2">
                      Data-Driven Insights
                    </h3>
                    <p className="text-[#f0f0f0]">
                      Gain valuable analytics on candidate performance
                      and hiring trends.
                    </p>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </section>
        <section
          className="w-full py-12 md:py-24 lg:py-32 bg-[#050614]"
          aria-labelledby="how-it-works-heading"
        >
          <div className="container px-4 md:px-6">
            <h2
              id="how-it-works-heading"
              className="text-3xl font-bold tracking-tighter sm:text-5xl text-center mb-12"
            >
              How It Works
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="flex flex-col items-center text-center">
                <div
                  className="w-12 h-12 rounded-full bg-[#ff6db3] text-[#050614] flex items-center justify-center text-xl font-bold mb-4"
                  aria-hidden="true"
                >
                  1
                </div>
                <h3 className="text-xl font-bold mb-2">
                  Set Up Your Profile
                </h3>
                <p className="text-[#f0f0f0]">
                  Create your account and specify your goals or hiring
                  needs.
                </p>
              </div>
              <div className="flex flex-col items-center text-center">
                <div
                  className="w-12 h-12 rounded-full bg-[#7fceff] text-[#050614] flex items-center justify-center text-xl font-bold mb-4"
                  aria-hidden="true"
                >
                  2
                </div>
                <h3 className="text-xl font-bold mb-2">
                  AI-Powered Interviews
                </h3>
                <p className="text-[#f0f0f0]">
                  Engage in realistic interview simulations or screen
                  candidates efficiently.
                </p>
              </div>
              <div className="flex flex-col items-center text-center">
                <div
                  className="w-12 h-12 rounded-full bg-[#ff6db3] text-[#050614] flex items-center justify-center text-xl font-bold mb-4"
                  aria-hidden="true"
                >
                  3
                </div>
                <h3 className="text-xl font-bold mb-2">
                  Receive Insights
                </h3>
                <p className="text-[#f0f0f0]">
                  Get detailed feedback, performance analytics, and
                  actionable recommendations.
                </p>
              </div>
            </div>
          </div>
        </section>
        <section
          className="w-full py-12 md:py-24 lg:py-32 bg-[#0a0b24]"
          aria-labelledby="testimonials-heading"
        >
          <div className="container px-4 md:px-6">
            <h2
              id="testimonials-heading"
              className="text-3xl font-bold tracking-tighter sm:text-5xl text-center mb-12"
            >
              What Our Users Say
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <div className="bg-[#131538] p-6 rounded-lg shadow-md">
                <div
                  className="flex items-center mb-4"
                  aria-label="5 out of 5 stars"
                >
                  <Star
                    className="h-5 w-5 text-[#7fceff]"
                    aria-hidden="true"
                  />
                  <Star
                    className="h-5 w-5 text-[#7fceff]"
                    aria-hidden="true"
                  />
                  <Star
                    className="h-5 w-5 text-[#7fceff]"
                    aria-hidden="true"
                  />
                  <Star
                    className="h-5 w-5 text-[#7fceff]"
                    aria-hidden="true"
                  />
                  <Star
                    className="h-5 w-5 text-[#7fceff]"
                    aria-hidden="true"
                  />
                </div>
                <p className="text-[#f0f0f0] mb-4">
                  "Mockai helped me land my dream job! The realistic
                  practice and feedback were invaluable."
                </p>
                <p className="font-bold">
                  - Sarah K., Software Engineer
                </p>
              </div>
              <div className="bg-[#131538] p-6 rounded-lg shadow-md">
                <div
                  className="flex items-center mb-4"
                  aria-label="5 out of 5 stars"
                >
                  <Star
                    className="h-5 w-5 text-[#7fceff]"
                    aria-hidden="true"
                  />
                  <Star
                    className="h-5 w-5 text-[#7fceff]"
                    aria-hidden="true"
                  />
                  <Star
                    className="h-5 w-5 text-[#7fceff]"
                    aria-hidden="true"
                  />
                  <Star
                    className="h-5 w-5 text-[#7fceff]"
                    aria-hidden="true"
                  />
                  <Star
                    className="h-5 w-5 text-[#7fceff]"
                    aria-hidden="true"
                  />
                </div>
                <p className="text-[#f0f0f0] mb-4">
                  "Mockai has revolutionized our hiring process. We've
                  reduced time-to-hire by 40% and improved candidate
                  quality."
                </p>
                <p className="font-bold">- John D., HR Director</p>
              </div>
              <div className="bg-[#131538] p-6 rounded-lg shadow-md">
                <div
                  className="flex items-center mb-4"
                  aria-label="5 out of 5 stars"
                >
                  <Star
                    className="h-5 w-5 text-[#7fceff]"
                    aria-hidden="true"
                  />
                  <Star
                    className="h-5 w-5 text-[#7fceff]"
                    aria-hidden="true"
                  />
                  <Star
                    className="h-5 w-5 text-[#7fceff]"
                    aria-hidden="true"
                  />
                  <Star
                    className="h-5 w-5 text-[#7fceff]"
                    aria-hidden="true"
                  />
                  <Star
                    className="h-5 w-5 text-[#7fceff]"
                    aria-hidden="true"
                  />
                </div>
                <p className="text-[#f0f0f0] mb-4">
                  "The personalized feedback helped me identify and
                  improve my weaknesses. Highly recommended for job
                  seekers!"
                </p>
                <p className="font-bold">
                  - Emily R., Marketing Manager
                </p>
              </div>
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-r from-[#050614] via-[#1e0b41] to-[#380e54]">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                  Ready to Transform Your Interview Experience?
                </h2>
                <p className="mx-auto max-w-[600px] text-[#f0f0f0] md:text-xl">
                  Whether you're preparing for your next career move
                  or looking to streamline your hiring process, Mockai
                  has you covered.
                </p>
              </div>
              <div className="w-full max-w-sm space-y-2">
                <form className="flex space-x-2">
                  <Input
                    className="flex-1 bg-white/10 border-white/20 text-white placeholder:text-white/50"
                    placeholder="Enter your email"
                    type="email"
                  />
                  <Button className="bg-[#ff6db3] text-[#050614] hover:bg-[#ff6db3]/90 focus:ring-2 focus:ring-[#ff6db3] focus:ring-offset-2 focus:ring-offset-[#050614]">
                    Get Started
                  </Button>
                </form>
                <p className="text-xs text-[#f0f0f0]">
                  Start your free trial today. No credit card
                  required.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
