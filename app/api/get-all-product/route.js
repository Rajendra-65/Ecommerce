import { NextResponse } from "next/server"
import {Product} from "../../../models/Product"
export const GET = async () => {
    try{
        const product = await Product.find()
        return NextResponse.json(product,{status:200,statusText:"Fetched SucessFully"})
    }catch(e){
        console.log(e)
        return NextResponse.json({status:500,message:"Error in fetcing all the product"})
    }
    
}