import { NextResponse } from "next/server"
import { currentUser } from "@clerk/nextjs"
import { adminEmails } from "../../../../../utils/index"
import Order from "../../../../../models/Order"
import { User } from "../../../../../models/User"
import { connectDb } from "../../../../../utils/connectdb"

export async function GET(req){
    try{
        let flag = null
        let getAllOrders
        const user = await currentUser()
        const userEmail = user.emailAddresses[0].emailAddress
        await connectDb()
        for( let i =0;i<adminEmails.length;i++){
            if(adminEmails[i] === userEmail){
                flag = 1
                break
            }
        }
        if(flag){
            try{
                try{
                    getAllOrders = await Order.find({})
                }catch(e){
                }
                
                if(getAllOrders){

                    return NextResponse.json({
                        success:true,
                        message:"Order successfully Fetched...",
                        data:getAllOrders
                    })
                }
                else{
                    return NextResponse.json({
                        success:false,
                        message:"Failed to fetch the orders ! Please try again after Some Times...."
                    })
                }
            }
            catch(e){
                return NextResponse.json({success:false})
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
