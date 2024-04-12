import { NextResponse } from "next/server"
import {Product} from "../../../../models/Product"
import { connectDb } from "../../../../utils/connectdb"
export async function POST(request,{params}){
    try{
        await connectDb()
        const {productId} = params
        const deletedProduct = await Product.findByIdAndDelete(productId)
            return NextResponse.json(deletedProduct,{status:200,statusText:"ok"})
    }catch(error){
        console.log(error)
    }
}