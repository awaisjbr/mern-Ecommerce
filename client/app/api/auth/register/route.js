import { connectDB } from "@/lib/db.js";
import { NextResponse } from "next/server";
import validator from "validator";
import bcrypt from "bcryptjs";
import crypto from "crypto";
import { userModel } from "@/models/user.model";
import { transporter } from "@/lib/nodemailer";

export async function POST(req) {
  try {
    await connectDB();
    const { username, email, password } = await req.json();
    if (!username || !email || !password) {
      return NextResponse.json({ success: false, message: "All fields are required" },{ status: 400 });
    }

    if (!validator.isEmail(email)) {
      return NextResponse.json({ success: false, message: "Invalid email format" },{ status: 400 });
    }

    if (password.length < 6) {
      return NextResponse.json({ success: false, message: "Password must be at least 6 characters" },{ status: 400 });
    }

    const normalizedEmail = email.toLowerCase();

    const userExists = await userModel.findOne({ email: normalizedEmail });
    if (userExists) {
      return NextResponse.json({ success: false, message: `User already exists with email: ${normalizedEmail}` },{ status: 409 });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const rawToken = crypto.randomBytes(32).toString("hex");
    const verificationToken = crypto.createHash("sha256").update(rawToken).digest("hex");

    const verificationTokenExpiresAt = Date.now() + 10 * 60 * 1000; //Valid for 10 minutes

    const newUser = new userModel({
      username,
      email: normalizedEmail,
      password: hashedPassword,
      verificationToken,
      verificationTokenExpiresAt,
      profilePic: `https://res.cloudinary.com/dofovybxu/image/upload/v1750736205/avatar_dwursb.png`,
    });

    await newUser.save();

    const verifyUrl = `${process.env.NEXT_PUBLIC_URL}/api/auth/verify-email?token=${rawToken}&email=${normalizedEmail}`;
    await transporter.sendMail({
        from: "awaisjbr@gmail.com",
        to: "awaisjbr@gmail.com",
        subject: "Verify your email",
         html: `
        <h2>Welcome, ${username}</h2>
        <p>Your account has been created successfully.</p>
        <p>Please confirm your email:</p>
        <a href="${verifyUrl}" 
           style="background-color:green; padding:10px 15px; color:white; text-decoration:none;">
           Verify Email
        </a>
        <p>This link expires in 10 minutes.</p>
      `, 
    })

    return NextResponse.json({ success: true, message: "User Registered Successfully.." },{ status: 201 });
  } catch (error) {
    console.error("REGISTER ERROR:", error);
    return NextResponse.json(
      { success: false, message: "User registration failed" },
      { status: 500 },
    );
  }
}
