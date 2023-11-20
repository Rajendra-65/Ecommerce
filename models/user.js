import mongoose, { Schema } from "mongoose";

const UserSchema = new Schema({
    username: String,
    email: {
        type: String,
        unique: true,
        required: [true, "Email Required !!"],
    },
    password: {
        type: String,
        required: true,
    },
    Role:String
});

export const User = mongoose.models.User || mongoose.model("User", UserSchema);