import { NextResponse } from "next/server"
import {Product} from "../../../models/Product"
import { connectDb } from "../../../utils/connectdb"
export const GET = async () => {
    try{
        await connectDb()
        const product = await Product.find()
        return NextResponse.json(product,{status:200,statusText:"Fetched SucessFully"})
    }catch(e){
        console.log(e)
        return NextResponse.json({status:500,message:"Error in fetcing all the product"})
    }
    
}