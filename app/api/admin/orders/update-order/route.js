import { currentUser } from "@clerk/nextjs"
import { connectDb } from "../../../../../utils/connectdb"
import Order from "../../../../../models/Order"
import { NextResponse } from "next/server"
import {adminEmails} from "../../../../../utils/index"



export async function PUT(req){
    try{
        let updateOrder
        let flag = null
        await connectDb()
        const user = await currentUser()
        const data = await req.json()
        const userEmail = user.emailAddresses[0].emailAddress
        for( let i =0;i<adminEmails.length;i++){
            if(adminEmails[i] === userEmail){
                flag = 1
                break
            }
        }
        if(flag){
            const {
                id,
                isProcessing
            } = data
            try{
                updateOrder = await Order.findOneAndUpdate(
                    {_id:id},
                    {
                        isProcessing:isProcessing
                    },
                    {new:true}
                )
            }catch(e){
            }
            
            if(updateOrder){
                return NextResponse.json({
                    success:true,
                    message:"Product Update SuccessFully"
                })
            }else{
                return NextResponse.json({
                    success:false,
                    message:"Product Not Updated SuccessFully"
                })
            }
        }else{
            return NextResponse.json({
                success:false,
                message:"You are not authenticated"
            })
        }
        
    }catch(e){
        return NextResponse.json({
            success:false,
            message:"Something went wrong ! Please try again later"
        })
    }
}