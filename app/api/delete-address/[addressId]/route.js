import { NextResponse } from "next/server"
import {Address} from "../../../../models/Address"
import mongoose from "mongoose"
export const GET = async (request,{params}) => {
    try{
        const {addressId} = params
        const convertedId = new mongoose.Types.ObjectId(addressId)
        const deletedProduct = await Address.findByIdAndDelete(convertedId)
        return NextResponse.json(deletedProduct,{status:200,statusText:"OK"})
    }catch(error){
        return NextResponse.json('error in deleting the Product',{status:500,statusText:"NotOk"})
        console.log(error)
    }
}