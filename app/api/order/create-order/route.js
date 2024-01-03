import { currentUser } from "@clerk/nextjs"
import { NextResponse } from "next/server"
import Order from "../../../../models/Order"
import { Cart } from "../../../../models/Cart"
export const dynamic = "force-dynamic"
export async function POST(req){
    try{
        let saveNewOrder
        let result
        console.log("CreateOrder page reached.....")
        const user = await currentUser()
        if(user){
            const data = await req.json()
            console.log(data)
            try{
                saveNewOrder = await Order.create(data)
            }
            catch(e){
                console.log(e)
                throw new Error("Error in Saving to cart")
            }
            console.log(saveNewOrder)
            if(saveNewOrder){
                try{
                    result = await Cart.updateOne({}, { $set: { cartItem: [] } })
                }
                catch(e){
                    console.log(e)
                    throw new Error("Error in updating the cart please place the order again")
                }
                console.log(result)
                return NextResponse.json({
                    success:true,
                    message:'Products are on the Way!'
                })
            }else{
                return NextResponse.json({
                    success:false,
                    message:"Failed to create a order ! Please try again",
                })
            }
        }else{
            return NextResponse.json({
                success:false,
                message:"You are not authenticated please authenticate First"
            })
        }
    }catch(error){
        return NextResponse.json({
            success:false,
            message:"Something Went Wrong"
        })
    }
}