"use client"
import Image from 'next/image'
import { useEffect, useState } from 'react'
import { useUser } from '@clerk/nextjs'
import { toast } from 'react-toastify'
import { useRouter } from 'next/navigation'
import BlackButton from "../components/button"
export default function Home() {
  const {user} = useUser()
  const [isMounted,setIsMounted] = useState(false)
  const router = useRouter()
  useEffect(()=>{
    setIsMounted(true)
  },[])
  const ImageStyle = {
    width:"100%",
    height:"100%",
    objectFit:"cover",
  }
  return (
    
    <div className='bg-slate-200 h-[calc(100vh-66px)]  md:flex'>
      <div className='flex w-[100%] md:w-[50%]'>
        <Image
          src="/ecommerceImage.jpg"
          width={200}
          height={200}
          style={ImageStyle}
        />
      </div>
      <div className='flex flex-col w-[100%] md:w-[50%]'>
        <div className='flex flex-col block w-full items-center '>
          <h1 className='font-bold '>Sale 20% Off </h1>
          <h1 className='font-bold '>on Everything</h1>
        </div>
        <div className='mt-3'>
        <p className='font-medium ml-[2px] w-full'> Whether you&apos;re seeking the latest fashion trends, upgrading your tech gadgets, or enhancing your living space, Ecommercery is your one-stop-shop. Explore an array of carefully curated items, benefit from exclusive deals, and enjoy the convenience of secure and swift delivery. Elevate your online shopping journey with Ecommercery - where style, quality, and convenience converge.</p>

        </div>
        <div className='mt-3 flex items-center m-auto'>
          <BlackButton onClick={()=>router.push('/all-products')}>VISIT SHOP</BlackButton>
        </div>
      </div>
    </div>
  )
}
