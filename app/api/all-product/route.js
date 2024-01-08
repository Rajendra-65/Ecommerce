import { NextResponse } from "next/server"
import { Product } from "../../../models/Product"


export const GET = async () => {
    try{
        const AllProducts = await Product.find()
        return NextResponse.json(AllProducts,{status:200,statusText:'ok'})
    }catch(error){
        return NextResponse.json({error:'Internal Server Error'})
    }
}