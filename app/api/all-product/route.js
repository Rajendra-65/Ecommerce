import { NextResponse } from "next/server"
import { Product } from "../../../models/Product"
import { connectDb } from "../../../utils/connectdb"

export const GET = async () => {
    try{
        await connectDb()
        const AllProducts = await Product.find()
        return NextResponse.json(AllProducts,{status:200,statusText:'ok'})
    }catch(error){
        return NextResponse.json({error:'Internal Server Error'})
    }
}