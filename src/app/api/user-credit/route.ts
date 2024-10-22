// src/app/api/user-credit/route.ts
import { db } from "@/utils/dbConnect";
import { AiOutPut } from "@/utils/AiSchema";
import { eq } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";

// Named export for POST method
export async function POST(req: NextRequest) {
  try {
    // Parse request body
    const { email } = await req.json();
    console.log(`emal`, email);
    // Check if email is provided
    if (!email) {
      return NextResponse.json(
        { error: "User email is required" },
        { status: 400 }
      );
    }

    // Fetch user's AI output based on email
    const result = await db
      .select()
      .from(AiOutPut)
      .where(eq(AiOutPut.createdBy, email));

    // Calculate credit score based on response lengths
    let score = 0;
    result.forEach((element) => {
      score += element?.aiResponce.length;
    });
    console.log(result, `ima result`);
    // Return the credit score as a response
    return NextResponse.json({ credit: score }, { status: 200 });
  } catch (error) {
    // Handle errors
    return NextResponse.json(
      { error: "Failed to fetch credit score" },
      { status: 500 }
    );
  }
}
