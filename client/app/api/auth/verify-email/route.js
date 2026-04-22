import { connectDB } from "@/lib/db";
import {NextResponse} from "next/server";
import crypto from "crypto";
import { userModel } from "@/models/user.model";

export async function GET(req){
    try {
        await connectDB();

        const { searchParams } = new URL(req.url);
        const token = searchParams.get("token");
        const email = searchParams.get("email");

        if (!token || !email) {
            return NextResponse.redirect(`${process.env.NEXT_PUBLIC_URL}/verify-error`);
        }

        const hashedToken = crypto.createHash("sha256").update(token).digest("hex");

        const user = await userModel.findOne({
            email: email.toLowerCase().trim(),
            verificationToken: hashedToken,
            verificationTokenExpiresAt: { $gt: Date.now() }
        });

        if (!user) {
            return NextResponse.redirect(`${process.env.NEXT_PUBLIC_URL}/verify-error`);
        }

        if (user.isVerified) {
            return NextResponse.redirect(`${process.env.NEXT_PUBLIC_URL}/already-verified`);
        }

        user.isVerified = true;
        user.verificationToken = undefined;
        user.verificationTokenExpiresAt = undefined;

        await user.save();

        return NextResponse.redirect(`${process.env.NEXT_PUBLIC_URL}/verify-success`);
    } catch (error) {
        console.error("Verify Email Error", error);
        return NextResponse.redirect(`${process.env.NEXT_PUBLIC_URL}/verify-error`);
    }
}