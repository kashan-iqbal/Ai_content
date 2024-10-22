// src/app/api/user-credit/route.ts
import { db } from "@/utils/dbConnect";
import { AiOutPut } from "@/utils/AiSchema";
import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";

// Named export for GET method
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const email = searchParams.get("email");

  if (!email) {
    return NextResponse.json(
      { error: "User email is required" },
      { status: 400 }
    );
  }

  try {
    const result = await db
      .select()
      .from(AiOutPut)
      .where(eq(AiOutPut.createdBy, email));

    let score = 0;
    result.forEach((element) => {
      score += element?.aiResponce.length;
    });
    console.log(result);
    return NextResponse.json({ credit: score }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch credit score" },
      { status: 500 }
    );
  }
}
