import mongoose, { Schema } from "mongoose";

const UserSchema = new Schema({
    userId: String,
    email: {
        type: String,
        unique: true,
        required: [true, "Email Required !!"],
    },
    admin:{
        type:Boolean,
    }
});

export const User = mongoose.models?.User || mongoose.model("User", UserSchema);
