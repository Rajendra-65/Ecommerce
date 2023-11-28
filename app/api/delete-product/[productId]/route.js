import { NextResponse } from "next/server"
import {Product} from "../../../../models/Product"
export async function POST(request,{params}){
    try{
        const {productId} = params
        const deletedProduct = await Product.findByIdAndDelete(productId)
            console.log(deletedProduct)
            return NextResponse.json(deletedProduct,{status:200,statusText:"ok"})
    }catch(error){
        console.log(error)
    }
}