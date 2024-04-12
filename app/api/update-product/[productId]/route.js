import { NextResponse } from "next/server"
import { Product } from "../../../../models/Product"
import {toast} from "react-toastify"
import { connectDb } from "../../../../utils/connectdb"
import mongoose from "mongoose"
export async function GET (request,{params}){
    try{
        await connectDb()
        const {productId} = params
        const existingProduct = await Product.findById(new mongoose.Types.ObjectId(productId))
        return NextResponse.json(existingProduct,{status:200,statusText:"ok"})
    }catch(error){
        console.log(error)
        return NextResponse.json("Error at Finding",{status:500,statusText:"Not Okay"})
    }
}