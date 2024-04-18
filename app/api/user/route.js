import { currentUser } from "@clerk/nextjs";
import { NextResponse } from "next/server";
import {User} from "../../../models/User"
import {connectDb} from "../../../utils/connectdb"

export const  GET = async () => {
    try{
        await connectDb()
        const user = await currentUser()
        const userEmail = user.emailAddresses[0].emailAddress
        const userDetails = await User.findOne({email:userEmail})
        return NextResponse.json({status:200,statusText:"successfully Posted to the client",data:userDetails})
    }catch(error){
        console.log(error)
        return NextResponse.json({status:"NOT Ok",message:"Error in sending to the client page"})
    }
} 