import { currentUser } from "@clerk/nextjs";
import { NextResponse } from "next/server";
import {User} from "../../../models/user"
import connectDb from "../../../utils/connectdb"

export const  GET = async () => {
    try{
        const user = await currentUser()
        const userEmail = user.emailAddresses[0].emailAddress
        console.log(userEmail)
        const userDetails = await User.findOne({email:userEmail})
        console.log(userDetails)
        return NextResponse.json(userDetails,{status:200,statusText:"successfully Posted to the client"})
    }catch(error){
        console.log(error)
        return NextResponse.json({status:"NOT Ok",message:"Error in sending to the client page"})
    }
} 