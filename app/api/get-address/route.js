import { NextResponse } from "next/server"
import {Address} from "../../../models/Address"

export const GET = async () => {
    try{
        let AllAddress = []
        const address = await Address.find()
        // console.log(address)
        return NextResponse.json(address,{status:200,statusText:"Ok"})
    }catch(error){
        return NextResponse.json("error in getting the address",{statusText:"Not Okay"})
        console.log(error)
    }
}