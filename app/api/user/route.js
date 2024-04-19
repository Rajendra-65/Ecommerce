import { currentUser } from "@clerk/nextjs";
import { NextResponse } from "next/server";
import {User} from "../../../models/User"
import {connectDb} from "../../../utils/connectdb"
import { adminEmails } from "../../../utils";
export const dynamic = 'force-dynamic'
export const  GET = async () => {
    try{
        await connectDb()
        let admin = false
        const user = await currentUser()
        const userEmail = user.emailAddresses[0].emailAddress
        const userDetails = await User.findOne({email:userEmail})
        admin = userDetails.admin
        return NextResponse.json({status:200,statusText:"successfully Posted to the client",data:userDetails,admin:admin})
    }catch(error){
        console.log(error)
        return NextResponse.json({status:"NOT Ok",message:"Error in sending to the client page"})
    }
} 