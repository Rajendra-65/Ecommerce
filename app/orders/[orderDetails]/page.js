'use client'
import { useParams } from "next/navigation"
import { UserDetails } from "../../../services/userDetails"
import { getOrderDetails } from "../../../services/OrderServices"
import { useState,useEffect } from "react"
import Image from "next/image"

export default function OrderDetails () {
    const [user,setUser] = useState()
    const [fetchProduct,setFetchProduct] = useState()
    const [firstEffect,setFirstEffect] = useState(false)
    const [ready,isReady] = useState(false)
    const params = useParams()
    const {orderDetails} = params

    useEffect(()=>{
        const fetchUserDetails = async () =>  {
            const user = await UserDetails() 
            setUser(user)
            setFirstEffect(true)
        }
        fetchUserDetails()
    },[])
    
    useEffect(()=>{
        const fetchProductFunction = async () => {
            console.log("Second UseEffect Reached......")
            const fetchedProduct = await getOrderDetails(orderDetails)
            setFetchProduct(fetchedProduct)
            isReady(true)
        }
        if(user && firstEffect){
            fetchProductFunction()
        }
    },[user,firstEffect])

    return <>
    {user && fetchProduct && ready? <div className="py-14 px-4 md:px-6">
        <div className="flex justify-start items-start space-y-2 flex-col">
            <h1 className="text-3xl lg:text-4xl font-bold leading-7 lg:leading-9 text-gray-900">Order #{orderDetails}
            </h1>
            <p className="text-base font-medium leading-6 text-gray-600">
                {
                orderDetails && fetchProduct.createdAt && fetchProduct.createdAt.split('T')[0] } | {orderDetails && fetchProduct.createdAt && fetchProduct.createdAt.split('T')[1].split('.')[0]}
            </p>
        </div>
        <div className="mt-10 flex flex-col justify-center xl:flex-row items-stretch w-full xl:space-x-8 md:space-y-6 xl:space-y-0">
            <div className="flex flex-col justify-start items-start w-full space-y-4 md:space-y-6 xl:space-y-8">
                <div className="flex flex-col justify-start items-start bg-gray-50 px-4 py-4 md:p-6 xl:p-8 w-full">
                    <p className="font-bold text-lg"> Your Order Summary</p>
                    {
                        orderDetails && fetchProduct.orderItems && fetchProduct.orderItems.length ? fetchProduct.orderItems.map((item) => (
                            <div key={item._id} className="mt-4 md:mt-6 flex flex-col md:flex-row justify-start items-start md:items-center md:space-x-6 xl:space-x-8 w-full">
                                <div className="pb-4 md:pb-8 w-full md:w-40">
                                    <Image 
                                        src={item && item.product && item.product.imageUrl}
                                        width={60}
                                        height={60}
                                        className="w-full hidden md:block"
                                    />
                                </div>
                                <div className="border-b border-gray-300 md:flex-row flex-col flex justify-between items-start w-full pb-8 space-y-8 md:space-y-0">
                                    <div className="w-full flex flex-col justify-start items-start space-y-8">
                                        <h3 className="text-xl font-semibold leading-6 text-gray-900">
                                            {item && item.product && item.product.name}
                                        </h3>
                                    </div>
                                    <div className="w-full flex  justify-between items-start space-y-8">
                                        <h3 className="text-xl font-semibold leading-6 text-gray-900">
                                            {item && item.product && item.product.name}
                                        </h3>
                                    </div>
                                </div>
                            </div>
                        )) : null
                    }
                </div>
                <div className="flex justify-center flex-col md:flex-row items-stretch w-full space-y-4 md:space-y-0 md:space-x-5 xl:space-x-8">
                    <div className="flex flex-col px-4 py-6 xl:p-8 w-full bg-gray-50 space-y-6">
                        <h3 className="text-xl font-semibold leading-6 text-gray-900">Summary</h3>
                        <div className="flex justify-center items-center w-full space-y-4 flex-col border-gray-200 border-b pb-4">
                            <div className="flex justify-between w-full">
                                <p className="text-base leading-5 text-gray-800">Subtotal</p>
                                <p className="text-base leading-5 text-gray-500">${orderDetails && fetchProduct.totalPrice}</p>
                            </div>
                            <div className="flex justify-between w-full">
                                <p className="text-base leading-5 text-gray-800">Shipping</p>
                                <p className="text-base leading-5 text-gray-900">${orderDetails && fetchProduct.totalPrice}</p>
                            </div>
                            <div className="flex justify-between w-full">
                                <p className="text-base leading-5 text-gray-800">Subtotal</p>
                                <p className="text-base leading-5 text-gray-900">${orderDetails && fetchProduct.totalPrice}</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="bg-gray-50 w-full xl:w-96 flex justify-between items-center md:items-start px-4 py-6 flex-col">
                    <h3 className="text-xl font-semibold leading-6 text-gray-900">Customer Details</h3>
                    <div className="flex flex-col justify-start items-start flex-shrink-0">
                        <div className="flex justify-center w-full md:justify-start items-center space-x-4 py-8 border-b border-gray-200">
                            <p className="text-base font-semibold leading-4 text-left text-gray-950 ">{user.name}</p>
                            <p className="text-base font-semibold leading-4 text-left text-gray-950 ">{user.email}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        </div>:<h1>Hold On Loading the details</h1>}
        </>
    }
