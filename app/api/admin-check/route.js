import { currentUser } from "@clerk/nextjs"
import { NextResponse } from "next/server"
import {adminEmails} from "../../../utils/index"
import { connectDb } from "../../../utils/connectdb"
export const GET = async () => {
    try{
        await connectDb()
        let flag = null
        const user = await currentUser()
        const userEmail = user.emailAddresses[0].emailAddress
        console.log(userEmail)
        for(let i=0;i<adminEmails.length;i++){
            if(userEmail === adminEmails[i]){
                flag = 1
                break
            }
        }
        console.log(flag)
        if(flag){
            return NextResponse.json({success:true,message:"The user is a admin User",data:true})
        }else{
            return NextResponse.json({success:false,message:"The user is not an admin User",data:false})
        }
    }catch(e){
        return NextResponse.json({success:false,message:"Error in the try block"})
    }
}
