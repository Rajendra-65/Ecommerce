import { NextResponse } from "next/server"
import {Address} from "../../../models/Address"

export const GET = async () => {
    try{
        const address = await Address.find()
        // console.log(address)
        if(address){
            return NextResponse.json(address,{status:200,statusText:"Ok"})
        }else{
            return NextResponse.json({status:200,statusText:"Ok"})
        }
    }catch(error){
        console.log(error)
        return NextResponse.json("error in getting the address",{statusText:"Not Okay"})
    }
}