import { NextResponse } from "next/server"
import { Product } from "../../../../models/Product"
import {toast} from "react-toastify"
import { connectDb } from "../../../../utils/connectdb"
import mongoose from "mongoose"
export async function GET (request,{params}){
    try{
        console.log("Code reached to the get route")
        connectDb()
        console.log("Code below the connectDb Function")
        const {productId} = params
        console.log(productId)
        if(!productId){
            console.log("productId not found")
        }
        if(!params){
            console.log("params not found")
        }
        const existingProduct = await Product.findById(new mongoose.Types.ObjectId(productId))
        console.log(existingProduct)
        return NextResponse.json(existingProduct,{status:200,statusText:"ok"})
    }catch(error){
        console.log(error)
        return NextResponse.json("Error at Finding",{status:500,statusText:"Not Okay"})
    }
}