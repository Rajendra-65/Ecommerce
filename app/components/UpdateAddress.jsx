"use client"
import React, { useState,useEffect } from 'react'
import { addNewAddressFormControls } from '../../utils'
import { updateSingleAddress } from '../../services/AddressService'
import InputComponent from './InputComponent'
import BlackButton from './button'

const UpdateAddress = ({address , addressId}) => {
    const [FormValues,SetFormValues] = useState({})

    console.log(address.City)
    const updateFormValues = (id,value) => {
        SetFormValues((prevValues)=>({
            ...prevValues,
            [id]:value
        }))
    }

    useEffect(()=>{
        SetFormValues(address)
    },[])

    const handleClick = async () => {
        // const {fullName,address,city,country,postalCode} = FormValues
        console.log(addressId,'of the page handleClick UpdateAddress')
        const response = await updateSingleAddress(addressId,FormValues)
        console.log(response)
        console.log('submit clicked')
    }

    return (
        <div className='flex flex-col w-[100%]'>
                <div className='h-auto flex flex-col mt-3 mb-3 overflow-x-hidden'>
                    {addNewAddressFormControls.map((form)=>(
                        <InputComponent
                            key={form.id}
                            id={form.id}
                            label={form.label}
                            value={FormValues[form.id] || ''}
                            placeholder={form.placeholder}
                            onChange={(value) => updateFormValues(form.id, value)}
                        />
                    ))}
                </div>
                <BlackButton onClick = {() => {handleClick()}}>Submit</BlackButton>
        </div>
    )
}

export default UpdateAddress