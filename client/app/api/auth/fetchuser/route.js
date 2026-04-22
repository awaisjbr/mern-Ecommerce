import { connectDB } from "@/lib/db";
import { userModel } from "@/models/user.model";
import { NextResponse } from "next/server";


export async function GET(req){
    try {
        await connectDB();
        const user = await userModel.findOne({})
    } catch (error) {
        console.error("Error fetching user",error);
        return NextResponse.json({success: false, message: "No user found"})
    }
}