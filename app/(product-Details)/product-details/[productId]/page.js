"use client"
import React,{useEffect, useState} from 'react'
import {useParams} from 'next/navigation'
import BlackButton from "../../../components/button"
import axios from "axios"
import Image from 'next/image'
import {toast} from 'react-toastify'
import { getProduct } from '../../../../services/ProductService'
import Details from './Details'

const Page =() => {
    const params = useParams()
    const [product,setProduct] = useState(null)
    const {productId} = params
    const [isMounted, setIsMounted] = useState(false);
    const styles = {
        border:"2px solid black",
        borderRadius:"0.25 rem"
    }
    const style1 ={
        border:"2px solid black",
        borderRadius:"0.25 rem"
    }
    useEffect(()=>{
        setIsMounted(true)
    },[])
    useEffect(()=>{
        const fetchProduct = async () => {
            try{
                const fetchedProduct = await getProduct(productId)
                setProduct(fetchedProduct.data)
                
            }catch(error){
                toast.error("SuccessFully Deleted",{position:'top-right'})
            }
        }
        fetchProduct()
    },[])
    return (
        <div>
            {product && <Details product={product} />}
        </div>
    )
}

export default Page