import mongoose from "mongoose";

export const connectDB = async () => {
    try {
        if(mongoose.connection.readyState === 1) return;
        const connect = await mongoose.connect(`${process.env.MONGO_URI}/e-commerce`);
        console.log(`✅ MongoDB Connected.. on ${connect.connection.host}`)
        console.log(mongoose.connection.readyState)
    } catch (error) {
        console.log("❌ MongoDB Connection Error:", error.message)
        process.exit(1)
    }
}