import jwt from "jsonwebtoken"
import { userModel } from "../models/user.model.js";

export const userAuth = async (req, res, next) => {
    const {token} = req.cookies;
    if(!token){
        return res.status(500).json({success:false, message: "Not authorized" })
    }
    try {
        const tokenDecode = jwt.verify(token, process.env.SECRET_KEY);
        if(tokenDecode.userId){
            req.body.loginId = tokenDecode.userId;
        }else{
            return res.status(500).json({success:false, message: "Not authorized" });
        }
        next()
    } catch (error) {
        res.status(500).json({success: false, message: error.message})
    }
}

export const adminRoute = async (req, res, next) => {
    const {loginId} = req.body;

    const user = await userModel.findById(loginId).select("-password");
    if(loginId && user.role === "admin"){
        next();
    }else{
        return res.status(403).json({success: false, message: "Access denied - Admin only"})
    }
   
}