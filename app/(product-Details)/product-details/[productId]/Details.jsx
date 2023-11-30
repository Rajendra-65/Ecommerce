import React from 'react'
import Image from 'next/image'
import BlackButton from '../../../components/button'
const Details = ({product}) => {
  const imageStyle = {
    border:"2px solid black",
    borderRadius:"0.25rem",
    marginBottom:"4px"
  }
  const imageStyle1 = {
    border:"2px solid black",
    borderRadius:"0.25rem",
    marginBottom:"4px",
    width:"100%"
  }
  return (
    <div className='flex flex-row w-[100%] h-[100vh] justify-between'>
      <div className='ml-7 mt-5 mb-5 w-[50%] flex-col'>
        <div className='mr-5 flex flex-col'>
            <Image
              src={product.imageUrl}
              height={60}
              width={40}
              style={imageStyle}
            />
            <Image
              src={product.imageUrl}
              height={60}
              width={40}
              style={imageStyle}
            />
        </div>
        <div className='mr-5'>
          <Image
            src={product.imageUrl}
            height={400}
            width={400}
            style={imageStyle1}
          />
        </div>
      </div>
      <div className='w-[50%] mt-[120px] mr-5'>
        <div className='w-full mr-5'>
          <h1 className='font-bold mb-3'>{product.name}</h1>
          <div className="flex flex-row justify-between mb-5">
              <div>
                <h1 className='font-bold mt-1'>₹ {product.price}</h1>
              </div>
              <BlackButton>Add To Cart</BlackButton>
          </div>
          <div className='flex flex-col items-start'>
            <h1 className='mt-3  mb-2'>Free shipping worldwide</h1>
            <h1 className='mt-1 mb-1'>Cancel Anytime</h1>
          </div>
          <div className='mt-2 flex flex-row'>
            <h1 className='font-bold mb-3'>Description</h1>
            <p className='mt-3 w-full flex items-start'>{product.description}</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Details