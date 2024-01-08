import { NextResponse } from "next/server"
import {Address} from "../../../../models/Address"
import mongoose from "mongoose"

export const GET = async (request,{params}) => {    
    try{
        const {addressId}= params
        const address = await Address.findById(new mongoose.Types.ObjectId(addressId))
        return NextResponse.json(address,{statusText:"Ok"})
    }catch(error){
        console.log('error in getting the address in the route',error)
        return NextResponse.json('error in route',error)
    }
}