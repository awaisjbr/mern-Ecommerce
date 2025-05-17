import mongoose from "mongoose";

export const connectDB = async () => {
    try {
        const connection = await mongoose.connect(`${process.env.MONGO_URI}/e-commerce`);
        console.log(`✅ MongoDB Connected.. on ${connection.connection.host}` );
    } catch (error) {
        console.log("❌ MongoDB Connection Error:", error.message);
        process.exit(1);
    }
}