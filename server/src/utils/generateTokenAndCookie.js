import jwt from "jsonwebtoken";


export const generateTokenAndCookies = (user, res) => {
    const token = jwt.sign({userId: user._id}, process.env.SECRET_KEY, {expiresIn: "12h"});
    res.cookie("token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production" ? false : true,
        sameSite: process.env.NODE_ENV === "production" ? "None" : "strict",
        maxAge: 12 * 60 * 60 * 1000,
    });
    return token;
}