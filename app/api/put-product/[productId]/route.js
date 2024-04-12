import { NextResponse } from "next/server"
import { Product } from "../../../../models/Product"
import { connectDb } from "../../../../utils/connectdb"
export async function POST (request,{params}){
    try{
        await connectDb()
        const {productId} = params
        if(!request){
            throw new Error ('Request object is undefined or null.')
        }
        if (!request.body) {
            throw new Error('Request body is undefined.');
        }
        const {imageUrl,availableSizes,name,price,category,description,deliveryInfo,onSale,priceDrop} = await request.json()
        const sizes = JSON.parse(availableSizes)
        const updatedProduct = await Product.findByIdAndUpdate(
            productId,
            {
            imageUrl:imageUrl,
            availableSizes:sizes,
            name:name,
            price:price,
            category:category,
            description:description,
            deliveryInfo:deliveryInfo,
            onSale:onSale,
            priceDrop:priceDrop,
        },
        {new:true}
        )
        
        return NextResponse.json(updatedProduct,{status:"200",statusText:"Ok"})
    }catch(error){
        console.error(error,"Error in saving the product to the database")
        return NextResponse.json("Error in saving the product to the database",{status:"400",statusText:"Not Ok"})
    }
}