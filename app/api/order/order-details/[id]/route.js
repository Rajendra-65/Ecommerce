import { NextResponse } from "next/server"
import Order from "../../../../../models/Order"
import { currentUser } from "@clerk/nextjs"
import { User } from "../../../../../models/user"
import { connectDb } from "../../../../../utils/connectdb"

export const GET = async (req,{params})=>{
    try{
        let order
        try{
            await connectDb()
            const {id} = params
            const user = await currentUser()
            const userEmail = user.emailAddresses[0].emailAddress
            const userDetails = await User.findOne({email:userEmail})
            const uid = userDetails._id
            try{
                order = await Order.findOne({_id:id, user: uid}).populate(
                    "orderItems.product"
                );
            }catch(e){
                console.log("Error in fetching Order",e)
            }
            return NextResponse.json(order,{message:"Successfully fetched Order",success:true})
        }catch(e){
            console.log(e)
        }
        

    }catch(e){
        console.log(e)
        return NextResponse.json({message:"Error in OrderDetails Route",success:"false"})
    }
}