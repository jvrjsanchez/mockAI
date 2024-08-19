import { NextRequest, NextResponse } from "next/server";
import { getSession } from "@auth0/nextjs-auth0/edge";

export async function middleware(req: NextRequest) {
  const res = new NextResponse();

  try {
    const { user } = (await getSession(req, res)) || {};
    const URL = process.env.NEXT_PUBLIC_VERCEL_URL

    if (user) {
      const response = await fetch(
        process.env.NEXT_PUBLIC_VERCEL_URL
        ? "http://localhost:3001/service/add_user"
        : "/service/add_user",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          cache: "force-cache",
          body: JSON.stringify({
            email: user.email,
          }),
        }
      );

      const responseFromFlask = await response.json();

      console.log("Response from Flask:", responseFromFlask);

      if (responseFromFlask.message === "Request received") {
        return NextResponse.next();
      }
    }
    return NextResponse.next();
  } catch (error) {
    console.error("Error in middleware:", error);
    return new NextResponse("Internal Server Error", {
      status: 500,
    });
  }
}

export const config = {
  matcher: "/interview",
};
