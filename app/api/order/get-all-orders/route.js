import { currentUser } from "@clerk/nextjs";
import { NextResponse } from "next/server";


export async function GET(req){
    try{
        const user = await currentUser()
        if(user){
            const extractAllOrders = await Order.populate('orderItems.product')
            if(extractAllOrders){
                return NextResponse.json({
                    success:true,
                    data:extractAllOrders
                })
            } else {
                return NextResponse.json({
                    success:true,
                    message: 'Failed to Process Order ! try again after someTimes'
                })
            }
        }else{

        }
    }catch(e){
        return NextResponse.json({
            success:false,
            message:"Something went wrong! Please Try again later",
        })
    }
}