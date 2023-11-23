import Image from 'next/image'
import React from 'react'
import BlackButton from "../components/button"
const isAdminView = true

const handleUpdateClick = (productId) => {
    
}
const handleDeleteClick = (productId) => {

}
const ProductComponent = ({product}) => {
    const aspectRatio = product.width / product.height;
    const imageStyle = {
        width: '100%',
        height: '75%',
        objectFit: 'cover',
    }
  return (
    <div className="flex flex-col h-[500px] w-[300px] mx-3 my-3 relative">
            <Image 
                alt={product.name}
                src={product.imageUrl}
                className="object-cover"
                width={200}
                height={200}
                style={imageStyle}
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
                <BlackButton>Add To Cart</BlackButton>
            }
            
        </div>
    </div>
  )
}

export default ProductComponent