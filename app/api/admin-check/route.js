import { currentUser } from "@clerk/nextjs"
import { NextResponse } from "next/server"


export const GET = async () => {
    try{
        const user = await currentUser()
        const userEmail = user.emailAddresses[0].emailAddress
        if(userEmail === "rajendrbehera9@gmail.com"){
            return NextResponse.json(true,{success:true,message:"The user is a admin User"})
        }else{
            return NextResponse.json(false,{success:false,message:"The user is not an admin User"})
        }
    }catch(e){
        console.log("error in the admin-check Route",e)
        return NextResponse.json({success:false,message:"Error in the try block"})
    }
}