// route.ts
import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import { createB2BUser } from "@/lib/user.service";

export async function POST(request: NextRequest) {
  try {
    await connectDB();
    const body = await request.json();
    

    const {
      userName,
      email,
      phone,
      password,
      b2bProfileId,
      userRole,
      isActive,
      createdBy,
      createdAt,
    } = body;

    // Required field check
    if (!email || !userName || !phone || !password || !b2bProfileId) {
      return NextResponse.json(
        { message: "Missing required fields" },
        { status: 400 }
      );
    }

    const newUser = await createB2BUser({
      userName,
      email,
      phone,
      password,
      b2bProfileId,
      userRole,
      isActive,
      createdBy,
      createdAt: createdAt ? new Date(createdAt) : new Date(),
    });

    return NextResponse.json({ success: true, user: newUser }, { status: 201 });
  } catch (error: any) {
    console.error("Register API error:", error);
    return NextResponse.json(
      { message: error.message || "Something went wrong" },
      { status: 400 }
    );
  }
}
