import mongoose from "mongoose";
import { orderModel } from "../models/order.model.js";
import {userModel} from "../models/user.model.js"

export const placeOrder = async (req, res) => {
    const {loginId, address, amount, paymentMethod} = req.body;
    try {
        const userData = await userModel.findById(loginId);
        if(!userData){
            return res.status(400).json({success: false, message: "User not found"})
        }
        const cartData = userData.cartItems;
        if(cartData.length === 0 ){
            return res.status(400).json({success: false, message: "Cart is empty"})
        };


        const newOrder = new orderModel({
            userId: loginId,
            items: cartData,
            address,
            amount,
            paymentMethod,
        })
        await newOrder.save();
        userData.cartItems = [];
        await userData.save();

        res.status(201).json({success: true, message: "Order placed Successfully.."})
    } catch (error) {
        console.log(error);
        res.status(500).json({success: false, message: error.message})
    }
}

export const listOrders = async (req, res) => {
   const {loginId} = req.body;
    try {
        const orders = await orderModel.find({ userId: loginId }).populate("items.product", "product");

        res.status(200).json({success: true, orders})
    } catch (error) {
        console.log(error);
        res.status(500).json({success: false, message: error.message})
    } 
}