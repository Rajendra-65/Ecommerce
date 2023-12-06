import axios from "axios"

export const  getSingleAddress = async (addressId) => {
    try{
        const result = await axios.get(`/api/get-single-address/${addressId}`)
        result.then((result)=>result.data)
        return result 
    }catch(error){
        console.log('error in getting the error ',error)
    }
}

export const updateSingleAddress = async (addressId,formValues) => {
    try{
        const {fullName,address,city,country,postalCode} = formValues
        const result = await axios.post(`/api/update-address/${addressId}`,{fullName,address,city,country,postalCode},{headers: { 'Content-Type': 'application/json' }})
        result.then((result)=>result.data)
        return result
    }catch(error){
        console.log('error in Updating single Address',error)
    }
}