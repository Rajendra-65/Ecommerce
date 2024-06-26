"use client"
import React,{useState,useEffect} from 'react'
import {getWomenProducts,addToCart} from "../../../services/ProductService"
import BlackButton from '../../components/button'
import { useRouter } from 'next/navigation'
import { checkAdmin } from '../../../services/AdminServices'
import Image from 'next/image'
import { toast } from 'react-toastify'

const Women = () => {
  const [AllProducts,setAllProducts] = useState([])
  const [isAdminView,setIsAdminView] = useState(false)
  const [firstEffect,setFirstEffect] = useState(false)
    
    useEffect(()=>{
        const checkForAdmin = async () => {
            const res = await checkAdmin()
            if(res.data){
                setIsAdminView(true)
                
            }
            setFirstEffect(true)
        }
        checkForAdmin()
    },[])
  useEffect(()=>{
      const fetchWomenProduct = async () => {
          const res = await getWomenProducts()
          setAllProducts(res.data)
      }
      fetchWomenProduct()
  },[firstEffect])
const router = useRouter()
const handleDetailsClick = (productId) => {
    router.push(`/product-details/${productId}`)
}

const handleCartClick = async (productId) => {
try{
    const newCart = await addToCart(productId)
    if(newCart){
        toast.success("added to Cart",{position:"top-right"})
    }
}catch(error){
    toast.error("Unable to added to cart try again",{position:"top-right"})
}
}

const handleDeleteClick = async (productId) => {
try{    
    const response = await axios.post(`/api/delete-product/${productId}`)
    if(response.statusText === "ok"){
        router.refresh()
        toast.success("product deleted",{position:"top-right"})
    }else{
        toast.error("product no  deleted",{position:"top-right"})
    }
}catch(error){
    toast.error("Error in the api route try again",{position:"top-right"})
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

return (
  <>
      {
          AllProducts ? (<div className='flex flex-row mx-[25px] my-[10px] w-full ml-[61px] flex-wrap items-start gap-[30px] place-content-center mt-[66px]' key="jkl">
          {AllProducts.map((product,i) => (
          <>
              <div 
                  className="flex flex-col h-[500px] w-[300px] mx-3 my-3  relative border-[1px] border-black"
                  key={product._id}
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
          </div>) : (<h1>Hold On Loading....</h1>)
      }
  </>
);
}

export default Women