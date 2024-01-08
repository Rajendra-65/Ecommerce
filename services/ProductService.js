import axios from "axios"

export const getAllProduct = async () => {
    const result = await axios.get(`/api/get-all-product`)
    return result.data
}

export const getProduct = async (productId) => {
    const result = await axios.get(`/api/product-details/${productId}`)
    return result.data
}

export const RemoveFromCart = async(productId) =>{
    try{
        const result = await axios.post(`/api/remove-from-cart/${productId}`).then((response) => response.data)
    return result
    }catch(error){
        console.log(error)
    }
    
}
export async function addToCart(productId) {
    try {
        const result = await axios.post(`/api/add-to-cart/${productId}`)
        return result.data
    } catch (error) {
        console.error("Error creating cart:", error);
        throw error;
    }
}

export async function getCartItem () {
    try{
        const result = await axios.get('/api/get-cart-item').then((response)=>response.data)
        return result
    }catch(error){
        console.log('error in getting the product',error)
    }
}

export const getKidProducts = async () => {
    try{
        const result = await axios.get('/api/get-kid-products')
        return result.data
    }catch(e){
        console.log(e)
    }
}

export const getWomenProducts = async () => {
    try{
        const result = await axios.get('/api/get-women-products')
        return result.data
    }catch(e){
        console.log(e)
    }
}

export const getMenProducts = async () => {
    try{
        const result = await axios.get('/api/get-men-products')
        return result.data
    }catch(e){
        console.log(e)
    }
}