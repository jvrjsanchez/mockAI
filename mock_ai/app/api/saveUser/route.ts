import { sql } from "@vercel/postgres";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const email = searchParams.get("email");

  try {
    if (!email) {
      return NextResponse.json(
        { status: "error", message: "Email is required" },
        { status: 400 }
      );
    }

    await sql`INSERT INTO Users (email) VALUES (${email}) ON CONFLICT DO NOTHING;`;

    return NextResponse.json(
      { status: "success", message: "User added" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Database error:", error);
    return NextResponse.json(
      { status: "error", message: "Database error" },
      { status: 500 }
    );
  }
}
