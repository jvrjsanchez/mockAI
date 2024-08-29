import React from "react";
import TestimonialCard from "./TestimonialCard";

const testimonials = [
  {
    text: "Mockai helped me land my dream job! The realistic practice and feedback were invaluable.",
    author: "- Sarah K., Software Engineer",
  },
  {
    text: "Mockai has revolutionized our hiring process. We've reduced time-to-hire by 40% and improved candidate quality.",
    author: "- John D., HR Director",
  },
  {
    text: "The personalized feedback helped me identify and improve my weaknesses. Highly recommended for job seekers!",
    author: "- Emily R., Marketing Manager",
  },
];

const Testimonials = () => {
  return (
    <section className="w-full py-12 md:py-24 lg:py-32 bg-[#0f1033]">
      <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-center mb-12">
        What Our Users Say
      </h2>
      <div className="container px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <TestimonialCard
              key={index}
              text={testimonial.text}
              author={testimonial.author}
              rating={5}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
