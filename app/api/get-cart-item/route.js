import {NextResponse} from "next/server"
import {Cart} from "../../../models/Cart"
import { currentUser } from "@clerk/nextjs"
import { User } from "../../../models/user"
export async function GET(request){
    try{
        let fetchedUser
        let cart
        const user = await currentUser()
        const userEmail = user.emailAddresses[0].emailAddress
        try{
            fetchedUser= await User.findOne({email:userEmail})
        }catch(e){
            console.log(e)
        }
        try{
            cart = await Cart.findOne({user:fetchedUser._id})
        }catch(e){
            console.log(e)
        }
        if(!cart){
            return NextResponse.json({ statusText: "NotOk" }, { status: 404 });
        }
        const cartItem = cart.cartItem
        return NextResponse.json({status:200,statusText:"ok",data:cartItem})
    }catch(error){
        console.log('error in the route',error)
        return NextResponse.json({statusText:"NotOk"})       
    }
}