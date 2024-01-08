import { NextResponse } from "next/server"
import {Product} from "../../../models/Product"
export const GET = async () => {
    try{
        const AllProducts = await Product.find({ category: "women" });
        return NextResponse.json({success:true,message:"data fetched successfully",data:AllProducts})
    }catch(e){
        console.log(e)
        return NextResponse.json({success:false,message:"Error in the get route of kids"})
    }
}