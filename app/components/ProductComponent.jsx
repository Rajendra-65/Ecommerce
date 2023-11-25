"use client"
import Image from 'next/image'
import React from 'react'
import BlackButton from "../components/button"
import {updateProduct} from "../../services/AdminServices"
import { useRouter } from 'next/navigation'
const isAdminView = true

const ProductComponent = ({product}) => {
    const router= useRouter()

    const handleUpdateClick = (productId) => {
        alert(productId)
        router.push(`/update-product/${productId}`)
        // updateProduct(productId)
    }

    const handleDeleteClick = (productId) => {
        alert(productId)
    }
    const imageStyle = {
        width: '100%',
        height: '75%',
        objectFit: 'cover',
    }
    const plainProduct = product.toObject ? product.toObject() : product;
  return (
    <div className="flex flex-col h-[500px] w-[300px] mx-3 my-3 relative">
            <Image 
                alt={plainProduct.name}
                src={plainProduct.imageUrl}
                className="object-cover"
                width={200}
                height={200}
                style={imageStyle}
            />
        <div className="flex  flex-col mt-2 mb-2 ml-2">
            <h1 className="font-bold">₹ {plainProduct.price}</h1>
            <h1 className="text-base">{plainProduct.name.length > 20 ? `${plainProduct.name.substring(0, 20)}...` : plainProduct.name}</h1>
        </div>
        <div className='flex flex-col'>
            {isAdminView ? 
                (
                    <>
                        <BlackButton className='mb-2' onClick={()=>{handleUpdateClick(plainProduct._id)}}>UPDATE</BlackButton>
                        <BlackButton onClick={()=>{handleDeleteClick(plainProduct._id)}}>DELETE</BlackButton>
                    </>
                )
            :
                <BlackButton>Add To Cart</BlackButton>
            }
            
        </div>
    </div>
  )
}

export default ProductComponent