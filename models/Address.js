import mongoose,{Schema} from "mongoose"
console.log("code reached t the address")
const AddressSchema = new Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', // Reference to the User model
        required: true
    },
    Name:{
        type:String,
        required:true
    },
    Address:{
        type:String,
        required:true
    },
    City:{
        type:String,
        required:true
    },
    Country:{
        type:String,
        required:true
    },
    PostalCode:{
        type:String,
        required:true
    }
})

export const Address = mongoose.models?.Address || mongoose.model("Address",AddressSchema)