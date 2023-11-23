import { NextResponse } from "next/server"
import { Product } from "../../../models/Product"


export const GET = async () => {
    try{
        console.log("Code reached to the Get Route")
        console.log("Code reached to the Get Route")
        console.log("Code reached to the Get Route")
        console.log("Code reached to the Get Route")
        console.log("Code reached to the Get Route")
        console.log("Code reached to the Get Route")
        const AllProducts = await Product.find()
        return NextResponse.json(AllProducts,{status:200,statusText:'ok'})
    }catch(error){
        console.log("Error in Retrieving The Data",error)
        return NextResponse.json({error:'Internal Server Error'})
    }
}