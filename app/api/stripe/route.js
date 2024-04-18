import {NextResponse} from 'next/server'
import { currentUser } from '@clerk/nextjs'
const stripe = require('stripe')('sk_test_51OQuRxSF54Ms4ZBVoCSsp7b2CLXinbxnmOVzXIituFbDRkkx1Hs5p6I6hNr4gXl2qJ5vuTcDwsWDzxGxVF1RVfOF00CIt1fOTU')
export const dynamic = 'force-dynamic'
import { connectDb } from '../../../utils/connectdb'
export async function POST(req){
    try{
        await connectDb()
        const user = await currentUser()
        if(user){
            const res = await req.json();
            const { FormData, checkoutFormData } = res;
            const { Name, Address, City, Country, PostalCode } = checkoutFormData;
            const session = await stripe.checkout.sessions.create({
                payment_method_types : ["card"],
                line_items:FormData,
                mode : 'payment',
                shipping_address_collection: {
                    allowed_countries: ['IN'],
                },
                custom_text: {
                    shipping_address: {
                        message: 'Please note that we can\'t guarantee 2-day delivery for PO boxes at this time.',
                    },
                },
                success_url:'https://ecommerce-puce-psi-18.vercel.app/checkout' + '?status=success',
                cancel_url:'https://ecommerce-puce-psi-18.vercel.app/checkout' + "?status=cancel"
            })
            return NextResponse.json({
                success:true,
                id:session.id,
            })
        }else{
            return NextResponse.json({
                success:true,
                message:'You are not authenticated'
            })
        }
        
    }catch(e){
        console.log(e)
        return NextResponse.json({
            status:500,
            success:false,
            message:'Something Went Wrong : Please try again'
        })
    }
}