"use client"
import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import {getAllOrdersForUser} from "../../services/OrderServices"
import { UserDetails } from '../../services/userDetails'
import BlackButton from "../components/button"
import {Product} from "../../models/Product"
import { currentProductImage } from '../../services/OrderServices'
import { useRouter } from 'next/navigation'
let ImageUrls = []
const Orders = () => {
  const router = useRouter()
  const [AllOrders,setAllOrders] = useState(null)
  // const [imageUrl,setImageUrl] = useState([])
  const [isReady,setIsReady] = useState(false)

  useEffect(()=>{
    fetchUserDetails()
  },[])

  const ImageStyle = {
    maxWidth: "100%",
    borderRadius: "0.75 rem",
    objectFit: "cover"
  }

  async function fetchUserDetails () {
    const user = await UserDetails()
    const fetchedOrders = await getAllOrdersForUser(user?._id)
    setAllOrders(fetchedOrders.data)
  }

  return (
    AllOrders  ? (
      <section className='bg-gray-200'>
        <div className='mx-auto px-4 sm:px-6 lg:px-8'>
          <div className='mx-auto mt-8 max-w-screen-xl px-4 sm:px-6 lg:px-8'>
            <div>
              <div className='px-4 py-6 sm:px-8 sm:py-10'>
                <div className="flow-root">
                  {
                    AllOrders && AllOrders.length ? 
                    <ul className='flex flex-col gap-4'>
                      {
                        AllOrders.map((item) =>(
                          <li key={item._id} className='bg-white shadow p-5 flex flex-col space-y-3 py-6 text-left'>
                            <div className='flex'>
                              <h1 className='font-bold text-lg mb-3 flex-1'>#order:{item._id}</h1>
                              <div className='flex items-center'>
                                <p className='mr-3 text-sm font-medium text-gray-900'>
                                  Total Paid Amount
                                </p>
                                <p className='mr-3 text-2xl font-semibold text-gray-900'>
                                  ₹{item.totalPrice}
                                </p>
                              </div>
                            </div>
                            <div className='flex gap-2'>
                              {
                                item.orderItems.map((orderItem,index) =>(
                                  <div 
                                    className='shrink-0'
                                    key={index}
                                  >
                                    <Image
                                      alt="OrderItem"
                                      width={60}
                                      height={60}
                                      src = {orderItem && orderItem.product && orderItem.product.imageUrl}
                                      style = {ImageStyle}
                                    />
                                  </div>
                                ))
                              }
                            </div>
                            <div className='flex gap-5'>
                              <BlackButton className="disabled:opacity-50 mt-5 mr-5 inline-block bg-block text-white px-5">
                                {item.isProcessing ? 'Order is Processing' : 'Order is Delivered'} 
                              </BlackButton>
                              <BlackButton onClick= {()=>router.push(`/orders/${item._id}`)}className="disabled:opacity-50 mt-5 mr-5 inline-block bg-block text-white px-5">
                                View Order Details
                              </BlackButton>
                            </div>
                          </li>
                        ))
                      }
                    </ul> : <h1>Unable to show the data</h1>
                  }
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    ) : null
  );  
}

export default Orders