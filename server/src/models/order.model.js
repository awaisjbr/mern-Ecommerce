import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,

    },
    items: [
        {product: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Product",
            required: true
            },
            quantity: {type: Number, required: true},
            size: {type: String, required: true}
        }
    ],
    address: {
        type: Object,
        required: true,
    },
    amount: {
        type: Number,
        required: true,
    },
    status: {
        type: String,
        required: true,
        default: "Order Placed"
    },
    paymentMethod: {
        type: String,
        required: true,
    },
    payment: {
        type: Boolean,
        required: true,
        default: false
    }
},{timestamps: true});

export const orderModel = mongoose.model("Order", orderSchema);