import mongoose, { Schema } from "mongoose";

const productSchema = new Schema({
    imageUrl:{
        type:String,
        required:true,
    },
    availableSizes:{
        type: [String],  // Array of available sizes
        default: [],
    },
    name:{
        type:String,
        required:true
    },
    price:{
        type:Number,
        required:true
    },
    category:{
        type:String,
        required:true,
    },
    description:{
        type:String,
        required:true,
    },
    deliveryInfo:{
        type:String
    },
    onSale:{
        type:String
    },
    priceDrop:{
        type:Number
    }
})

export const Product = mongoose.models.Product || mongoose.model("Product",productSchema)