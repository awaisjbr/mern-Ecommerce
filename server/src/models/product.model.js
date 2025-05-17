import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "category",
        required: true,
    },
    image: {
        type: String,
        required: true
    },
    subImages: {
        type: [String],
    },
    sizes: {
        type: Array,
        default: []
    },
    isFeatured: {
        type: Boolean,
        default: false
    }
},{timestamps: true});

export const productModel = mongoose.model("Product", productSchema);



// const productSchema = new mongoose.Schema({
//     name: {
//         type: String,
//         required: true,
//         trim: true
//     },
//     description: {
//         type: String,
//         required: true,
//     },
//     price: {
//         type: Number,
//         required: true,
//         min: 0
//     },
//     image: {
//         type: String,
//         required: true
//     },
//     subImages: {
//         type: [String],
//     },
//     category: {
//         type: String,
//         required: true
//     },
//     subCategory: {
//         type: String,
//         required: true
//     },
//     sizes: {
//         type: Array,
//         required: true
//     },
//     bestSeller: {
//         type: Boolean,
//         default: false
//     },
// },{timestamps: true});

