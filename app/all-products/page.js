"use client"
import React, { useState,useEffect } from 'react'
import Image from 'next/image'
import BlackButton from "../components/button"
import { useRouter } from 'next/navigation'
import {getAllProduct , addToCart } from '../../services/ProductService'
import { checkAdmin } from '../../services/AdminServices'
import axios from "axios"
import { toast } from 'react-toastify'
let AllProducts = []
const Page = () => {
    const [products, setProducts] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isAdminView,setIsAdminView] = useState(false)
    const [firstEffect,setFirstEffect] = useState(false)
    const router = useRouter()

    useEffect(() => {
        async function fetchProducts() {
            console.log("s")
            try {
                const fetchedProducts = await getAllProduct();
                setProducts(fetchedProducts);
                
            } catch (error) {
                setError(error);
            } finally {
                setIsLoading(false);
            }
        }    
        fetchProducts();
    }, [firstEffect]);
    
    useEffect(()=>{
        const fetchRole= async()=>{
            const user = await checkAdmin()
            console.log(user)
            if(user.data){
                setIsAdminView(true)
            }
            setFirstEffect(true)
        }
        fetchRole()
    },[])

const handleDetailsClick = (productId) => {
        router.push(`/product-details/${productId}`)
}

const handleCartClick = async (productId) => {
    try{
        const newCart = await addToCart(productId)
        if(newCart){
            toast.success("SuccessFully Added to cart",{position:"top-right"})
        }
    }catch(error){
        toast.error("Error in adding to the cart",{position:"top-right"})
    }
}

const handleDeleteClick = async (productId) => {
    try{    
        const response = await axios.post(`/api/delete-product/${productId}`)
        if(response.statusText === "ok"){
            router.refresh()
            toast.success("SuccessFully Deleted",{position:'top-right'})
        }else{
            toast.error ("failed to Delete",{position:'top-right'})

        }
    }catch(error){
        toast.error("Try Again",{position:'top-right'})

    }
}

const handleUpdateClick = (productId) => {
  router.push(`/update-product/${productId}`)
  // updateProduct(productId)
}

const imageStyle = {
    width: '100%',
    height: '75%',
    objectFit: 'cover',
    cursor:'pointer',
    borderBottom: "1px solid black" 
}

    // const plainProduct = product.toObject ? product.toObject() : product;
return (
    <>{
            firstEffect && products ? (<div className='flex flex-row mx-[25px] my-[10px] w-full ml-[61px] flex-wrap items-start overflow-x-hidden !important gap-[25px] mt-[66px] place-content-center'>
            {products.map((product,i) => (
            <>
                <div 
                    className="flex flex-col h-[600px] w-[300px] mx-3 my-3  relative border-[1px] border-black"
                    key={i}
                >
                        <Image 
                            alt={product.name}
                            src={product.imageUrl}
                            className="object-cover"
                            priority={true}
                            width={200}
                            height={200}
                            style={imageStyle}
                            onClick={() => handleDetailsClick(product._id)}
                        />
                    <div className="flex  flex-col mt-2 mb-2 ml-2">
                        <h1 className="font-bold">₹ {product.price}</h1>
                        <h1 className="text-base">{product.name.length > 20 ? `${product.name.substring(0, 20)}...` : product.name}</h1>
                    </div>
                    <div className='flex flex-col'>
                        {isAdminView ? 
                            (
                                <>
                                    <BlackButton className='mb-2' onClick={()=>{handleUpdateClick(product._id)}}>UPDATE</BlackButton>
                                    <BlackButton onClick={()=>{handleDeleteClick(product._id)}}>DELETE</BlackButton>
                                </>
                            )
                        :
                            <BlackButton onClick={()=>{handleCartClick(product._id)}}>Add To Cart</BlackButton>
                        }
                    </div>
                </div>
            </>
            ))}
            </div>):(<h1>wait Loading...</h1>)
        }
    </>
)
}

export default Page