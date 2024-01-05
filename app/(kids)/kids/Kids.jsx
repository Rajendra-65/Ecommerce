import React from "react";
import ProductComponent from "../../components/ProductComponent";
import Image from "next/image";
import BlackButton from "../../components/button";

const imageStyle = {
  width: '100%',
  height: '75%',
  objectFit: 'cover',
  cursor:'pointer'
}

const Kids = ({ AllProducts }) => {
  {console.log(AllProducts)}
  return (
    <div className='flex flex-row mx-[25px] my-[10px] w-full ml-[61px] flex-wrap items-start'>
        {AllProducts.map((product,i) => (
        <>
            {console.log(product)}
            <div 
                className="flex flex-col h-[500px] w-[300px] mx-3 my-3  relative"
                key={i}
            >
                    <Image 
                        alt={product.name}
                        src={product.imageUrl}
                        className="object-cover"
                        priority={true}
                        width={200}
                        height={200}
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
    </div>
  );
};

export default Kids;
