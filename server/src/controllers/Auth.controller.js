import bcrypt from "bcryptjs";
import { userModel } from "../models/user.model.js";
import jwt from "jsonwebtoken"
import { generateTokenAndCookies } from "../utils/generateTokenAndCookie.js";
import { transporter } from "../config/nodemailer.js";


export const registerUser = async (req, res) => {
   const {username, email, password} = req.body;
  
   try {
        if(!username || !email || !password){
            return res.status(500).json({success:false, message: "All feilds are required"});
        };
        if(password.length < 6){
            return res.status(500).json({success:false, message: "Password should be 6 charters"});
        }
        const userExists = await userModel.findOne({email});
        if(userExists){
            return res.status(500).json({success:false, message: "User email already exists"});
        };
        const hashPassword = await bcrypt.hash(password, 10);
        const verificationOTP = Math.floor(Math.random() * 900000 + 100000).toString();
        const verificationOtpExpiresAt = Date.now() + 10 * 60 * 1000;  //OTP valid for 10 minutes
        const newUser = new userModel({username, email, password: hashPassword, verificationOTP, verificationOtpExpiresAt});
        newUser.profilePic = `https://avatar.iran.liara.run/public/boy?username=${(newUser.username).split(" ").join("")}` ;
        generateTokenAndCookies(newUser, res);
        await newUser.save();
        await transporter.sendMail({
            from: "awaisjbr@gmail.com",
            to: "awaisjbr@gmail.com",
            subject: "Account Activation",
            text: `Welcome! your account has been created with email id: ${email}. Please verify your account with otp ${verificationOTP}. It is valid for 10 minutes. `
        });

        res.status(201).json({success: true, message: "User register successfully, OTP sent to email valid for 10 minutes"})
   } catch (error) {
    res.status(500).json({success: false, message: error.message})
   }
};

export const verifyEmail = async (req, res) => {
  const {loginId, verificationOTP} = req.body;
  try {
    const user = await userModel.findById(loginId);
    if(!user){
        return res.status(500).json({success: false, message: "user not authorized"});
    };

    if(verificationOTP === "" || verificationOTP !== user.verificationOTP || user.verificationOtpExpiresAt < Date.now()){
        return res.status(500).json({success: false, message: "Invalid or expired token"});
    }

    user.verificationOTP = undefined;
    user.verificationOtpExpiresAt = undefined;
    user.isVerified = true;
    
    res.clearCookie("token", {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
    });
    await user.save();

    res.status(200).json({success: true, message: "Account verified successfully."})
  } catch (error) {
    res.status(500).json({success: false, message: error.message})
  }
}

export const loginUser = async (req, res) => {
    const {email, password} = req.body;
    if(!password || !email){
        return res.status(500).json({success:false, message: "All feilds are required"})
    }
    try {
        const user = await userModel.findOne({email});
        if (!user) {
            return res.status(500).json({success:false, message: "Invalid email / User not found"})
        }
        const isMatchPsssword = await bcrypt.compare(password, user.password);
        if(!isMatchPsssword){
            return res.status(500).json({success:false, message: "Incorrect password"})
        }
        generateTokenAndCookies(user, res);
        user.lastLoggedIn = Date.now();
        await user.save();

        res.status(200).json({success:true, message: `Welcome to ShopCart ${user.username}`,user: {...user._doc, password:undefined}})
    } catch (error) {
        res.status(500).json({success: false, message: error.message})
    }
}

export const checkAuth = async (req, res) => {
   const {loginId} = req.body;
   try {
    const user = await userModel.findById(loginId).select("-password");
    if(!user){
        return res.status(500).json({success:false, message: "user not authorized"})
    }
    res.status(200).json({success:true,user} )
   } catch (error) {
    res.status(500).json({success: false, message: error.message})
   }
}

export const logout = async (req, res) => {
  try {
    res.clearCookie("token", {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: process.env.NODE_ENV === "production" ? "None" : "Lax"
    });
    res.status(200).json({ success: true, message: "User logged out successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const forgotPassword = async (req, res) => {
    const {email} = req.body;
    try {
        if(!email){
            return res.status(500).json({success: false, message: "Please enter valid email"});
        };
        const user = await userModel.findOne({email}).select("-password");
        if(!user){
            return res.status(500).json({success: false, message: "User not found"});
        }
        user.verificationOTP = Math.floor(Math.random() * 900000 + 100000).toString();
        user.verificationOtpExpiresAt = Date.now() + 10 * 60 * 1000  //OTP valid for 10 minutes
        generateTokenAndCookies(user, res);
        await user.save();
        res.status(200).json({success: true, message: "OTP Successfully send to email valid for 10 minutes"})
    } catch (error) {
        res.status(500).json({success: false, message: error.message}) 
    }
}

export const resetPassword = async (req, res) => {
    const {loginId, verificationOTP, password} = req.body;
    try {
        if(!verificationOTP || !password){
            return res.status(500).json({success: false, message: "All feilds are required"});
        }
        const user = await userModel.findById(loginId);
        if(!user){
            return res.status(500).json({success: false, message: "user not authorized"});
        }
        if(verificationOTP === "" || verificationOTP !== user.verificationOTP || user.verificationOtpExpiresAt < Date.now()){
            return res.status(500).json({success: false, message: "Invalid or expired OTP"});
        }
        const hashPassword = await bcrypt.hash(password, 10);
        user.password = hashPassword;
        user.verificationOTP = undefined;
        user.verificationOtpExpiresAt = undefined;
        await user.save();

        res.clearCookie("token", {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
        });
        res.status(200).json({success: true, message: "Password has been changed successfully."})
    } catch (error) {
        res.status(500).json({success: false, message: error.message});
    }
}