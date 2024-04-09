"use client"
import React, { useState,useEffect } from 'react'
import { addNewAddressFormControls } from '../../utils'
import { updateSingleAddress } from '../../services/AddressService'
import InputComponent from './InputComponent'
import BlackButton from './button'
import { toast } from 'react-toastify'
import { useRouter } from 'next/navigation'

const UpdateAddress = ({address , addressId}) => {
    const [FormValues,SetFormValues] = useState({})
    const updateFormValues = (id,value) => {
        SetFormValues((prevValues)=>({
            ...prevValues,
            [id]:value
        }))
    }

    useEffect(()=>{
        SetFormValues(address)
    },[])
    const router = useRouter()
    const handleClick = async () => {
        const response = await updateSingleAddress(addressId,FormValues)
        console.log(response.data)
        if(response.data){
            toast.success('data Updated',{position:'top-right'})
            router.push('/account')
        }
        else{
            toast.error('try Again')
        }
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