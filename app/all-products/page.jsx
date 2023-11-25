import React from 'react'
import ProductComponent from '../components/ProductComponent'
import { Product } from '../../models/Product'
let AllProducts =[]
const page = async () => {
  try {
    AllProducts = await Product.find()
    AllProducts = AllProducts.map(product => product.toObject())
  } catch (error) {
    console.error('Error fetching products:', error);
  }
  
  return (
    <div className='flex flex-row mx-[25px] my-[10px] w-full ml-[61px] flex-wrap items-start'>
      {AllProducts.map((product,i) => (
        <ProductComponent key={product._id} product={product} />
      ))}
    </div>
  )
}

export default page