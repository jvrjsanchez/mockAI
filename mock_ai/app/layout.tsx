import type { Metadata } from "next";
import "./globals.css";
import { Inter } from "next/font/google";
import { UserProvider } from "@auth0/nextjs-auth0/client";
import { cn } from "@/lib/utils";
import Header from "@/components/Header";

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
      <UserProvider loginUrl="/auth-service/api/auth/login">
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
          <Header />
          {children}
        </body>
      </UserProvider>
    </html>
  );
}
