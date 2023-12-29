import mongoose,{Schema} from "mongoose";
console.log("code reached t the cart")


const cartSchema = new Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', // Reference to the User model
        required: true
    },
    cartItem:{
        type:[String],
        default:[]
    }
})

export const Cart = mongoose.models?.Cart || mongoose.model("Cart",cartSchema)