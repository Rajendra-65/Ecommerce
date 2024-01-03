import { NextResponse } from "next/server"
import Order from "../../../../../models/Order"
import { UserDetails } from "../../../../../services/userDetails"

export const GET = async (req,{params})=>{
    try{
        const {id} = params
        console.log(id)
        let order
        try{
            const fetchedDetails = await UserDetails()
            const id = fetchedDetails._id
            order = await Order.find({ user: id}).populate(
                "orderItems.product"
            );
        }catch(e){
            console.log(e)
        }
        console.log(order)
        return NextResponse.json(order,{message:"Successfully fetched Order",success:true})

    }catch(e){
        console.log(e)
        return NextResponse.json({message:"Error in OrderDetails Route",success:"false"})
    }
}