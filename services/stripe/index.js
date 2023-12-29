
const  callStripeSession = async(FormData,checkoutFormData) => {
    try{
        const combinedFormData = {
            FormData: FormData,
            checkoutFormData: checkoutFormData
        };

        const res = await fetch('/api/stripe',{
            method:"POST",
            headers:{
                'Content-Type' : 'application/json',
            },
            body : JSON.stringify(combinedFormData)
        })
        const data = await res.json()
        console.log(data)
        return data
    }catch(error){
        console.log(error)
    }
}

export default callStripeSession