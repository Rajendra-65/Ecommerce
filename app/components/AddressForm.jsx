import React, { useState } from 'react'
import { addNewAddressFormControls } from '../../utils'
import InputComponent from "./InputComponent"
import BlackButton from './button'
import axios from 'axios'
const AddressForm = () => {
    const [FormValues,SetFormValues] = useState({})

    const updateFormValues = (id,value) => {
        SetFormValues((prevValues)=>({
            ...prevValues,
            [id]:value
        }))
    }

    const SubmitHandler = () => {
        const {fullName,address,city,country,postalCode} = FormValues
        if(fullName.length === 0 || address.length === 0 || city.length === 0 || country.length === 0 || postalCode.length === 0){
            console.log("check The filed one of them is remaining null")
            return
        }
        const response = axios.post('/api/save-address',{fullName,address,city,country,postalCode}, {headers: { 'Content-Type': 'application/json' }})
        response.then((result)=>{
            console.log(result.data)
        }).catch((error)=>{
            console.log(error,"Error in storing the data")
        })
    }

    return (
        <div className='flex flex-col w-[100%]'>
            <div className='h-auto flex flex-col mt-3 mb-3 overflow-x-hidden'>
                {addNewAddressFormControls.map((form)=>(
                    <InputComponent
                        key={form.id}
                        id={form.id}
                        label={form.label}
                        placeholder={form.placeholder}
                        onChange={(value) => updateFormValues(form.id, value)}
                    />
                ))}
            </div>
            <BlackButton onClick={()=>SubmitHandler()}>Submit</BlackButton>
        </div>
    )
}

export default AddressForm