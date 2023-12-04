import mongoose,{Schema} from "mongoose"
const AddressSchema = new Schema({
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