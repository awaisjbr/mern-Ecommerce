import { connectDB } from "@/lib/db.js";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { userModel } from "@/models/user.model";
import jwt from "jsonwebtoken";

export async function POST(req) {
  try {
    await connectDB();

    const { email, password } = await req.json();

    if (!email || !password) {
      return NextResponse.json({ success: false, message: "All fields are required" },{ status: 400 });
    }

    const normalizedEmail = email.toLowerCase().trim();

    const user = await userModel.findOne({ email: normalizedEmail }).select("+password");

    if (!user) {
      return NextResponse.json({ success: false, message: "User not found" },{ status: 404 });
    }

    if (user.isOAuth) {
      return NextResponse.json({ success: false, message: "Please log in with Google." },{ status: 400 });
    }

    const isMatchPassword = await bcrypt.compare(password, user.password);

    if (!isMatchPassword) {
      return NextResponse.json({ success: false, message: "Wrong password" },{ status: 401 });
    }

    user.lastLoggedIn = Date.now();
    await user.save();

    const token = jwt.sign({ id: user._id }, process.env.SECRET_KEY,{ expiresIn: "1d" });

    const response = NextResponse.json({ success: true, message: "User signed in successfully" },{ status: 200 });

    response.cookies.set("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "Strict" : "Lax",
      maxAge: 60 * 60 * 12, // 12 hours
      path: "/",
    });

    return response;

  } catch (error) {
    console.error("LOGIN ERROR:", error);

    return NextResponse.json(
      { success: false, message: "Login failed" },
      { status: 500 }
    );
  }
}