import mongoose, { Schema } from "mongoose";

const UserSchema = new Schema({
    userId: String,
    email: {
        type: String,
        unique: true,
        required: [true, "Email Required !!"],
    },
});

export const User = mongoose.models?.User || mongoose.model("User", UserSchema);