'use client'
import React,{use, useEffect,useState} from "react";
import Image from "next/image";
import BlackButton from "../../components/button";
import {getKidProducts} from "../../../services/ProductService"
import { useRouter } from "next/navigation";
import { addToCart } from "../../../services/ProductService";
import { toast } from 'react-toastify'
import {checkAdmin} from "../../../services/AdminServices"


const Kids = () => {
    const [AllProducts,setAllProducts] = useState(null)
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
        const fetchKidProduct = async () => {
            const res = await getKidProducts()
            setAllProducts(res.data)
        }
        fetchKidProduct()
    },[firstEffect])

    const router = useRouter()
const handleDetailsClick = (productId) => {
    router.push(`/product-details/${productId}`)
}

const handleCartClick = async (productId) => {
    try{
        const newCart = await addToCart(productId)
        toast.success('Added to cart',{position:"top-right"})
    }catch(error){
        toast.error('Error in Adding to cart',{position:'top-right'})
    }
}

const handleDeleteClick = async (productId) => {
    try{    
        const response = await axios.post(`/api/delete-product/${productId}`)
        if(response.statusText === "ok"){
            router.refresh()
            toast.success("SuccessFully Deleted",{position:'top-right'})
        }else{
            toast.error("fail to delete try again",{position:'top-right'})

        }
    }catch(error){
        toast.error("try again please",{position:'top-right'})

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
    borderBottom:"1px solid black"
}

    return (
            <>
            {
                AllProducts && firstEffect ? (<div className='flex flex-row mx-[25px] my-[10px] w-full ml-[61px] flex-wrap items-start gap-[30px] place-content-center mt-[66px]'>
            {AllProducts.map((product,i) => (
            <>
                <div 
                    className="flex flex-col h-[500px] w-[300px] mx-3 my-3  relative border-[1px] border-black"
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
                </div>) : (<h1>Hold On Loading....</h1>)
            }
            </>
        
    );
};

export default Kids;
