import mongoose,{Schema} from "mongoose";
import { connectDb } from "../utils/connectdb";

connectDb()
const cartSchema = new Schema({
    cartItem:{
        type:[String],
        default:[]
    }
})

export const Cart = mongoose.models.Cart || mongoose.model("Cart",cartSchema)