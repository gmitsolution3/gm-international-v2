
import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import { createUser } from "@/lib/user.service";

export const runtime = 'nodejs';

export async function POST(request: Request) {
  try {
    await connectDB();
    const body = await request.json();
    const { username, email, phone, password, userRole } = body;

    if (!username || !email || !phone || !password || !userRole) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const user = await createUser({ username, email, phone, password, userRole });

    return NextResponse.json({
      message: "User created successfully",
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
        phone: user.phone,
        userRole: user.userRole,
      },
    }, { status: 201 });

  } catch (error: any) {
    console.error("Registration error: ", error);

    if (error.message.includes("already")) {
      return NextResponse.json({ error: error.message }, { status: 409 });
    }
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
