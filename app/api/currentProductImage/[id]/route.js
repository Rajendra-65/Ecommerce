import mongoose from "mongoose"
import { NextResponse } from "next/server"
import { Product } from "../../../../models/Product"

export const GET = async (req,{params}) => {
    try{
        const {id} = params
        let product 
        try{
            const objectId = new mongoose.Types.ObjectId(id)
            product = await Product.findById(objectId)
        }catch(e){
            console.log(e)
            throw new Error ("Error in Finding the Product")
        }
        console.log(product)
        const imageUrl = product.imageUrl
        return NextResponse.json(imageUrl,{success:true,message:"Url fetched SuccessFully"})
    }catch(e){
        console.log(e)
        return NextResponse.json({success:false,message:"Url not fetched SuccessFully"})
    }
}