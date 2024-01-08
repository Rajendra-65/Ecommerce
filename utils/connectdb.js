import mongoose from "mongoose"
export const connectDb = async () => {
    try {
        await mongoose.connect(process.env.MONGO_DB_URL);
    } catch (error) {
        console.error("Connection Failed:", error);
    }
}