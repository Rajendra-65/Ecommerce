import {Product} from '../../../../models/Product'
import {NextResponse} from "next/server"
import mongoose from 'mongoose'
import { connectDb } from '../../../../utils/connectdb'

export async function GET(request,{params}){
    try{
        await connectDb()
        const {productId} = params
        if (!mongoose.Types.ObjectId.isValid(productId)) {
            return NextResponse.json("Invalid product ID", { statusText: "ok" });
        }
        const product = await Product.findById(new mongoose.Types.ObjectId(productId))
        if (!product) {
            return NextResponse.json("Product not found", { statusText: "ok" });
        }
        return NextResponse.json({status:200,statusText:"ok",data:product})
    }catch(error){
        console.log('Error in getting the Product',error)
        return NextResponse.json("product not Found",{statusText:"ok"})
    }
}