import type { Metadata } from "next";
import "./globals.css";
import { Inter } from "next/font/google";
import { UserProvider } from "@auth0/nextjs-auth0/client";
import { cn } from "@/lib/utils";
import { Header, Footer } from "@/components/";

const fontHeading = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-heading",
});

const fontBody = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-body",
});
export const metadata: Metadata = {
  title: "MockAI",
  description: "Level up your interviewing skills.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <UserProvider>
        <head>
          <link
            rel="icon"
            href="/icon.jpeg"
            type="image/jpeg"
            sizes="32x32"
          />
        </head>

        <body
          id="main"
          className={cn(
            "antialiased",
            fontHeading.variable,
            fontBody.variable
          )}
        >
          {" "}
          <div className="min-h-screen flex flex-col  bg-[#0a0b2e] text-white">
            <Header />
            <main className="flex-grow">{children}</main>
            <Footer />
          </div>
        </body>
      </UserProvider>
    </html>
  );
}
