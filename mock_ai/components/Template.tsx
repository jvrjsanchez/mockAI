import CallToAction from "./CallToAction";
import HeroSection from "./Hero/HeroSection";
import Testimonials from "./Testimonials/Testimonials";
import WhyChooseSection from "./WhyChooseUs/WhyChooseSection";

import HowItWorksSection from "./HowItWorksSection";

export default function Template() {
  return (
    <div className="flex flex-col min-h-screen items-center bg-[#0a0b2e] text-white">
      <main className="flex-1">
        <HeroSection />
        <WhyChooseSection />
        <HowItWorksSection />

        <Testimonials />

        <CallToAction
          title="Ready to Transform Your Interview Experience?"
          subTitle="Whether you're preparing for your next career move or
              looking to streamline your hiring process, Mockai has
              you covered."
          btnText="Get Started"
          enticeText="Start your free trial today. No credit card required."
        />
      </main>
    </div>
  );
}
