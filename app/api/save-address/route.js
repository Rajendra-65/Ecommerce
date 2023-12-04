import { NextResponse } from "next/server"
import { Address } from "../../../models/Address"
export async function POST(request,{params}){
    try{
        const {fullName,address,city,country,postalCode} = request.json()
        const Result = new Address({
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