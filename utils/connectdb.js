import mongoose from "mongoose"
export const connectDb = async () => {
    try {
        console.log("code reached to the top of the connection")
        await mongoose.connect(process.env.MONGO_DB_URL);
        console.log("Database Connection Successfully");
    } catch (error) {
        console.error("Connection Failed:", error);
    }
}