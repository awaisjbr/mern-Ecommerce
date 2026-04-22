import { NextResponse } from "next/server";
import jwt from "jsonwebtoken"
import { connectDB } from "@/lib/db";
import { cookies } from "next/headers";
import { userModel } from "@/models/user.model";

export async function GET(req){
    try {
        await connectDB();
        const token = req.cookies.get("token")?.value;
        if(!token){
            return NextResponse.json({success: false, message: "Unauthorize user"})
        }
        const decodeToken = jwt.verify(token, process.env.SECRET_KEY);
        if(!decodeToken.id){
            return NextResponse.json({success: false, message: "No Token found"})
        }
        const user = await userModel.findById(decodeToken.id);
        return NextResponse.json({success: true,user})
    } catch (error) {
        console.error("Auth middleware error", error)
        return NextResponse.json({success: false, message: error.message})
    }
}