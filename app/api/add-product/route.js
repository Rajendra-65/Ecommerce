import { NextResponse } from "next/server"
import { Product } from "../../../models/Product"
export async function POST (request){
    try{
        if(!request){
            throw new Error ('Request object is undefined or null.')
        }
        if (!request.body) {
            throw new Error('Request body is undefined.');
        }
        const {imageUrl,availableSizes,name,price,category,description,deliveryInfo,onSale,priceDrop} = await request.json()
        const sizes = JSON.parse(availableSizes)
        const product = new Product({
            imageUrl:imageUrl,
            availableSizes:sizes,
            name:name,
            price:price,
            category:category,
            description:description,
            deliveryInfo:deliveryInfo,
            onSale:onSale,
            priceDrop:priceDrop,
        })
        await product.save()
        return NextResponse.json(product,{status:"200",statusText:"Ok"})
    }catch(error){
        console.error(error,"Error in saving the product to the database")
        return NextResponse.json("Error in saving the product to the database",{status:"400",statusText:"Not Ok"})
    }
}