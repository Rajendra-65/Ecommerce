import axios from "axios"
import { Cart } from "../models/Cart"
import { connectDb } from "../utils/connectdb"

export const getProduct = async (productId) => {
    console.log(productId,"Get Product")
    const result = await axios.get(`/api/product-details/${productId}`).then((response) => response.data)
    console.log(result)
    return result
}

export async function addToCart(productId) {
    try {
        // Create a new cart with the provided productId
        connectDb()
        const newCart = new Cart({ cartItem: [productId] });
        newCart.save()
        return newCart
    } catch (error) {
        console.error("Error creating cart:", error);
        throw error;
    }
}
