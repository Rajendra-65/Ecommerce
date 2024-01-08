import { NextResponse } from "next/server"
import {Address} from "../../../models/Address"
import { User } from "../../../models/user"
import { currentUser } from "@clerk/nextjs"
export const GET = async () => {
    try{
        let fetchedUser
        const user = await currentUser()
        const userEmail = user.emailAddresses[0].emailAddress
        try{
            fetchedUser= await User.findOne({email:userEmail})
        }catch(e){
            console.log(e)
        }
        const address = await Address.find({user:fetchedUser._id}).select({ _id: 0, user: 0 });
        if(address){
            return NextResponse.json(address,{status:200,statusText:"Ok"})
        }else{
            return NextResponse.json({status:200,statusText:"Ok"})
        }
    }catch(error){
        console.log(error)
        return NextResponse.json("error in getting the address",{statusText:"Not Okay"})
    }
}