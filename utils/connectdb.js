import mongoose from "mongoose"
import { CreateUser } from "./userCreation";
export const connectDb = async () => {
    try {
        await mongoose.connect(process.env.MONGO_DB_URL);
        // await Createuser()
    } catch (error) {
        console.error("Connection Failed:", error);
    }
}
