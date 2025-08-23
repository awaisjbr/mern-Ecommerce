import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        require: true,

    },
    items: [

    ],
    address: {
        type: Object,
        require: true,
    },
    amount: {
        type: Number,
        require: true,
    },
    status: {
        type: String,
        require: true,
        default: "Order Placed"
    },
    paymentMethod: {
        type: String,
        require: true,
    },
    payment: {
        type: Boolean,
        require: true,
        default: false
    }
},{timestamps: true});

export const orderModel = mongoose.model("Order", orderSchema);