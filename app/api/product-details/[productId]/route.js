import {Product} from '../../../../models/Product'
import {NextResponse} from "next/server"
import mongoose from 'mongoose'

export async function GET(request,{params}){
    try{
        const {productId} = params
        if (!mongoose.Types.ObjectId.isValid(productId)) {
            console.log('Invalid ObjectId format');
            return NextResponse.json("Invalid product ID", { statusText: "ok" });
        }
        const product = await Product.findById(new mongoose.Types.ObjectId(productId))
        if (!product) {
            console.log('Product not found');
            return NextResponse.json("Product not found", { statusText: "ok" });
        }
        console.log('ProductId:', productId)
        return NextResponse.json(product,{status:200,statusText:"ok"})
    }catch(error){
        console.log('Error in getting the Product',error)
        return NextResponse.json("product not Found",{statusText:"ok"})
    }
}