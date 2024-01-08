import mongoose,{Schema} from "mongoose";


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