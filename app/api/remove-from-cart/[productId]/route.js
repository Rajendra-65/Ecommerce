import { NextResponse } from "next/server";
import {Cart} from "../../../../models/Cart"
import { connectDb } from "../../../../utils/connectdb";
export async function POST(request,{params}){
    try{
        await connectDb()
        const {productId} = params
        const cart = await Cart.findOne()
        if(!cart){
            throw new Error("Cart not found")
        }
        const updatedCartItems = cart.cartItem.filter(item => item !== productId);
        if(!updatedCartItems){
            throw new Error('Error in Updating the cart')
        }
        await Cart.updateOne({_id: cart._id },{ $set: {cartItem: updatedCartItems }});
        return NextResponse.json(cart.cartItem,{ status:200,success: true,statusText:"OK"});
    }catch(error){
        console.log('Error in deleting the product in route',error)
        return NextResponse.json('Not Sent',{statusText:"NotOkay"})
    }
}