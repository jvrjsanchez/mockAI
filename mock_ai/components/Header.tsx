"use client";
import Link from "next/link";
import Image from "next/image";
import { useUser } from "@auth0/nextjs-auth0/client";
import { useState } from "react";

const Header = () => {
  const { user, error, isLoading } = useUser();
  const [isAccordionOpen, setIsAccordionOpen] = useState(false);

  const handleAccordionClick = () => {
    setIsAccordionOpen(!isAccordionOpen);
  };

  const closeAccordion = () => {
    setIsAccordionOpen(false);
  };

  return (
    <header className="px-4 lg:px-6  flex items-center">
      <Link className="flex items-center justify-center" href="#">
        <Image
          className="rounded-lg shadow-lg bg-white z-10 m-1 w-20 h-16 sm:w-24 sm:h-20"
          src="/mockAILogo.jpeg"
          alt="Mockai Logo"
          width={80}
          height={65}
        />
        <span className="sr-only">Mockai</span>
      </Link>
      <nav className="ml-auto flex gap-4 sm:gap-6">
        <Link
          className="text-sm font-medium hover:text-[#ff3b9a] transition-colors"
          href="#"
        >
          Features
        </Link>
        <Link
          className="text-sm font-medium hover:text-[#ff3b9a] transition-colors"
          href="#"
        >
          Pricing
        </Link>
        <Link
          className="text-sm font-medium hover:text-[#ff3b9a] transition-colors"
          href="#"
        >
          About
        </Link>
        <Link
          className="text-sm font-medium hover:text-[#ff3b9a] transition-colors"
          href="#"
        >
          Contact
        </Link>
      </nav>
    </header>
  );
};

export default Header;
