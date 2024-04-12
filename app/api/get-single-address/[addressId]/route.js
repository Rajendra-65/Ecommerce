import { NextResponse } from "next/server"
import {Address} from "../../../../models/Address"
import mongoose from "mongoose"
import { connectDb } from "../../../../utils/connectdb"
export const GET = async (request,{params}) => {    
    try{
        await connectDb()
        const {addressId}= params
        const address = await Address.findById(new mongoose.Types.ObjectId(addressId))
        return NextResponse.json(address,{statusText:"Ok"})
    }catch(error){
        console.log('error in getting the address in the route',error)
        return NextResponse.json('error in route',error)
    }
}