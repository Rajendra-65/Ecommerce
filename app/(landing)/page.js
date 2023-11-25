"use client"
import Image from 'next/image'
import { useEffect, useState } from 'react'
import { useUser } from '@clerk/nextjs'
import { toast } from 'react-toastify'

export default function Home() {
  const {user} = useUser()
  const [isMounted,setIsMounted] = useState(false)
  useEffect(()=>{
    setIsMounted(true)
  },[])
  return (
    <div className='bg-slate-200 h-[calc(100vh-66px)]'>
      <h1>Hello NextJs</h1>
    </div>
  )
}
