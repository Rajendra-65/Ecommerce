import { NextResponse } from "next/server";
import {Cart} from "../../../../models/Cart"
export async function POST(request,{params}){
    const {productId} = params
    try{
        // This ensure cart is exist
        const existingCart = await Cart.findOne();

        if (existingCart) {
        // If cart exists, add productId to the cartItem array
            if(!existingCart.cartItem.includes(productId)){
                existingCart.cartItem.push(productId);
                await existingCart.save();
                return NextResponse.json(existingCart, { status: 200, statusText: 'OK' });
        }else{
            // If productId is already in the cart, return a response
            return NextResponse.json({message:'Product is already in the cart'})
        }
        } else {
        // If no cart exists, create a new cart and save it
            const newCart = new Cart({ cartItem: [productId] });
            const savedCart = await newCart.save();
            return NextResponse.json(savedCart, { status: 200, statusText: 'OK' });
        }
        } catch (error) {
            console.error('Error updating cart:', error);
            throw error;
        }
}