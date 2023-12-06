"use client"
import React, { useState } from 'react'
import { addNewAddressFormControls } from '../../utils'
import { updateSingleAddress } from '../../services/AddressService'
import InputComponent from './InputComponent'
import BlackButton from './button'

const UpdateAddress = (address,addressId) => {
    const [FormValues,SetFormValues] = useState({})
    const updateFormValues = (id,value) => {
        SetFormValues((prevValues)=>({
            ...prevValues,
            [id]:value
        }))
    }

    const handleClick = () => {
        // const {fullName,address,city,country,postalCode} = FormValues
        const response = updateSingleAddress(addressId,FormValues)
        console.log(response)
    }

  return (
    <div className='flex flex-col w-[100%]'>
            <div className='h-auto flex flex-col mt-3 mb-3 overflow-x-hidden'>
                {addNewAddressFormControls.map((form)=>(
                    <InputComponent
                        key={form.id}
                        id={form.id}
                        label={form.label}
                        value={address.id}
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