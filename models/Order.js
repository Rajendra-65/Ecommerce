import mongoose from "mongoose"

const OrderSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', // Reference to the User model
        required: true
    },
    orderItems:[
        {
            qty:{type:Number,required:true},
            product:{
                type:mongoose.Schema.Types.ObjectId,
                ref:"Product",
            },
        },
    ],
    shippingAddress : {

        Name:{type:String,required:true},
        Address:{type:String,required:true},
        City:{type:String,required:true},
        Country:{type:String,required:true},
        PostalCode:{type:String,required:true}
    },
    paymentMethod:{type:String,required:true,default:'Stripe'},
    totalPrice:{type:Number,required:true},
    isPaid:{type:Boolean,required:true},
    paidAt:{type:Date,required:true},
    isProcessing:{type:Boolean,required:true},

},{timestamps:true})


const Order = mongoose.models?.Order || mongoose.model("Order",OrderSchema)

export default Order