import { NextResponse } from "next/server"
import {Address} from "../../../../models/Address"

export const GET = async ({params}) => {    
    try{
        console.log(params)
        const {addressId}= params
        console.log(addressId)
        const address = Address.findById(addressId)
        return NextResponse.json(address,{statusText:"Ok"})
    }catch(error){
        console.log('error in getting the address in the route',error)
        return NextResponse.json('error in route',error)
    }
}