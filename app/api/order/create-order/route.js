import { currentUser } from "@clerk/nextjs"
import { NextResponse } from "next/server"
import Order from "../../../../models/Order"
import { Cart } from "../../../../models/Cart"
import { connectDb } from "../../../../utils/connectdb"

export async function POST(req){
    try{
        let saveNewOrder
        let result
        await connectDb()
        const user = await currentUser()
        if(user){
            const data = await req.json()
            try{
                saveNewOrder = await Order.create(data)
            }
            catch(e){
                console.log(e)
                throw new Error("Error in Saving to cart")
            }
            if(saveNewOrder){
                try{
                    result = await Cart.updateOne({}, { $set: { cartItem: [] } })
                }
                catch(e){
                    console.log(e)
                    throw new Error("Error in updating the cart please place the order again")
                }
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