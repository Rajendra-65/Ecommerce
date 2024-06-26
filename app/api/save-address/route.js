import { NextResponse } from "next/server"
import { Address } from "../../../models/Address"
import { currentUser } from "@clerk/nextjs"
import { User } from "../../../models/User"
import { connectDb } from "../../../utils/connectdb"
export async function POST(request,{params}){
    try{
        await connectDb()
        const {fullName,address,city,country,postalCode} = await request.json()
        const presentUser = await currentUser()
        const customer_email = presentUser.emailAddresses[0].emailAddress
        const userDetails = await User.findOne({ email: customer_email });
        const userId = userDetails._id
        const Result = new Address({
            user:userId,
            Name:fullName,
            Address:address,
            City:city,
            Country:country,
            PostalCode:postalCode
        })
        await Result.save()
        return NextResponse.json(Result,{status:200,statusText:'OK'})
    }catch(error){
        console.log('error in saving into database',error)
        return NextResponse.json('error in saving',{statusText:'NOTOK'})
    }
}