import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,

    },
    address: {
        type: String,
        required: true
    }
});

export const orderModel = mongoose.models.order || mongoose.model("Order", orderSchema);