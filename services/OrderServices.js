import axios from "axios"

export const createNewOrder = async (formData) => {

    try{
        console.log(formData)
        const res = await axios.post(
            '/api/order/create-order',
            JSON.stringify(formData),
            {headers : {
                "Content-Type":"application/json"
            }
        })
        return res.data
    } catch(e) {
        console.log('error in the createOrderService',e)
    }

}

export const getAllOrdersForUser = async (id) => {
    try{
        const res = await axios.get(`/api/order/get-all-orders/${id}`)
        return res.data
    } catch(e){
        console.log('error in the Allorders for user route',e)
        return
    }
}

export const getOrderDetails = async (id) => {
    try{
        const res = await axios.get(`/api/product-details/${id}`)
        return res.data
    } catch(e){
        console.log('error in the Allorders for user route',e)
        return
    }
} 

export const currentProductImage = async (id) => {
    const res = await axios.get(`/api/currentProductImage/${id}`)
    return res.data
}