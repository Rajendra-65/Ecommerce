import { NextResponse } from "next/server"
import {Product} from "../../../models/Product"
import { connectDb } from "../../../utils/connectdb";
export const GET = async () => {
    try{
        await connectDb()
        const AllProducts = await Product.find({ category: "kids" });
        return NextResponse.json({success:true,message:"data fetched successfully",data:AllProducts})
    }catch(e){
        console.log(e)
        return NextResponse.json({success:false,message:"Error in the get route of kids"})
    }
}