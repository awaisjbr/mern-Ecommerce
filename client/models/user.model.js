import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    username:{
        type: String,
        require: true,
        trim: true,
    },
    email:{
        type: String,
        require: true,
        unique: true,
        lowercase: true,
        trim: true,
    },
    password:{
        type: String,
        require: true,
        minlength: 6,
        select: false
    },
    isVerified: {
        type: Boolean,
        default: false
    },
    isOAuth: { 
        type: Boolean, 
        default: false 
    },
    verificationToken: {
        type: String,
    },
    verificationTokenExpiresAt:{
        type: Date,
    },
    lastLoggedIn:{
        type:Date,
    },
    profilePic: {
        type: String,
        default: ""
    },
    role: {
        type: String,
        enum: ["customer","admin"],
        default: "customer"
    },
    cartItems: [
        { product: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Product"
            },
            quantity: {
                type: Number,
                default: 0
            },
            size: {
                type: String,
            }
        }
    ],

},{timestamps:true});

export const userModel = mongoose.models.User || mongoose.model("User", userSchema);