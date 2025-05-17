import express from "express";
import {registerUser, checkAuth, loginUser, verifyEmail, logout, forgotPassword, resetPassword} from "../controllers/Auth.controller.js"
import { userModel } from "../models/user.model.js";
import { userAuth } from "../middlewares/userAuth.js";
export const router = express.Router();

router.get("/users",userAuth , async(req, res) => {
    try {
        const {loginId} = req.body;
        const users = await userModel.find({_id: {$ne: loginId}}).select("-password");
        res.status(200).json({success:true, users})
    } catch (error) {
        res.status(500).json({success: false, message: error.message});
    }
})
router.post("/register", registerUser);
router.post("/verifyEmail", userAuth, verifyEmail);
router.post("/login", loginUser);
router.get("/checkAuth",userAuth, checkAuth);
router.post("/logout",userAuth, logout);
router.post("/forgot-password", forgotPassword);
router.post("/reset-password",userAuth,  resetPassword);