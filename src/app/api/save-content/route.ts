// src/app/api/save-content/route.ts
import { db } from "@/utils/dbConnect";
import { AiOutPut } from "@/utils/AiSchema";
import { NextResponse } from "next/server";

// POST request to save the data in the database
export async function POST(request: Request) {
  try {
    // Parse the incoming request body
    const body = await request.json();
    const { data, aiOutput, templateSlug, user } = body;

    // Validate that required fields are present
    if (!user?.primaryEmailAddress || !aiOutput || !templateSlug) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Insert the data into the `AiOutPut` table
    const result = await db.insert(AiOutPut).values({
      formData: data,
      aiResponce: aiOutput,
      templateSlug: templateSlug,
      createdBy: user.primaryEmailAddress.emailAddress, // Assuming this is where user email is stored
      createdAt: new Date().toISOString(), // Set the current timestamp
    });

    // Return success response
    return NextResponse.json(
      { message: "Data saved successfully", result },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error saving content:", error);
    return NextResponse.json(
      { message: "Failed to save content", error },
      { status: 500 }
    );
  }
}
