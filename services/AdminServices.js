import axios from "axios"

export const updateProduct = async (productId) => {
    console.log(productId)
    const result = await axios.put(`updateProduct/${productId}`).then((response) => response.data)
    return result
}

export const getProduct = async (productId) => {
    const result = await axios.get(`updateProduct/${productId}`).then((response) => response.data)
    return result
}

export const DeleteProduct = async (productId) => {

}

export const checkAdmin = async () => {
    const result = await axios.get('/api/admin-check')
    return result.data
}