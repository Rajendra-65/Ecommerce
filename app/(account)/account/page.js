"use client"
import React, { useState,useEffect } from 'react'
import BlackButton from "../../components/button"
import { auth } from '@clerk/nextjs'
import AddressForm from '../../components/AddressForm'
const page = () => {
    const [Addresses,setAddresses] = useState([])
    const [AddressClick,setAddressClick] = useState(false)
    const [IsMounted,setIsMounted] = useState()
    useEffect(()=>{
        setIsMounted(true)
    },[])
    return (
        <div className=' mx-5 my-5 w-[calc(100vw-40px)] h-full border border-slate-100 shadow-2xl z-50 '>
            <div className='mt-5 ml-3 mb-3'>
                <BlackButton>View Your Orders</BlackButton>
            </div>
            <div className='flex flex-row ml-3 w-[100%]'>
                    <h1 className='font-bold'>
                        Your Addresses:
                    </h1>
                {Addresses.length != 0 ?
                    <div className='flex flex-col'>
                    <h1 className='font-semibold mb-1'>
                    No Addresses found please add a new Address
                    </h1>
                    <BlackButton onClick={()=> setAddressClick(true)}>Add New Address</BlackButton>
                    </div>
                    : 
                    <div className='w-[100%]'>
                        <div className='ml-3 mt-3 mb-3 flex flex-col border   border-slate-200 shadow-2xl z-50 rounded w-[50%] mt-3'>
                            <h1 className='ml-3 mt-1 mb-1'>At</h1>
                            <h1 className='ml-3 mt-1 mb-1'>Dist</h1>
                            <h1 className='ml-3 mt-1 mb-1'>Post</h1>
                            <h1 className='ml-3 mt-1 mb-1'>Pstation</h1>
                        </div>
                        <BlackButton onClick={()=>setAddressClick(true)}>Add New Address</BlackButton>
                    </div>
                }
            </div>
            <div className='w-[100%] h-auto bg-red-100'>
                {
                    AddressClick ? <AddressForm/> : null
                }
            </div>
        </div>
    )
}

export default page