import {NextResponse} from "next/server"
import {Cart} from "../../../models/Cart"
export async function GET(request){
    try{
        const cart = await Cart.findOne()
        if(!cart){
            return NextResponse.json({ statusText: "NotOk" }, { status: 404 });
        }
        const cartItem = cart.cartItem
        return NextResponse.json(cartItem,{status:200,statusText:"ok"})
    }catch(error){
        console.log('error in the route',error)
        return NextResponse.json({statusText:"NotOk"})       
    }
}