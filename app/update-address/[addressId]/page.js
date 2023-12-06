"use client"
import React from 'react'
import UpdateAddress from '../../components/updateAddress'
import { useParams } from 'next/navigation'
import { getSingleAddress } from '../../../services/AddressService'
const page = () => {
    const params = useParams()
    const {addressId} = params
    console.log(addressId)
    const address = getSingleAddress(addressId)
    return (
        <div className='mx-5 my-5 z-50 border border-slate-200 shadow-2xl'>
            <div>
                <UpdateAddress address={address} addressId={addressId}/>
            </div>
        </div>
    )
}

export default page