import { currentUser } from "@clerk/nextjs"
import { NextResponse } from "next/server"


export const dynamic = "force-dynamic"

export async function POST(req){
    try{
        const user = await currentUser()
        if(user){
            const data = await req.json()
            const saveNewOrder = await Order.create(data)
            if(saveNewOrder){
                const result = await Cart.updateOne({}, { $set: { cartItem: [] } })
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