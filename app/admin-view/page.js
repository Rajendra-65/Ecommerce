'use client'

import React, { useEffect, useState } from 'react'
import { currentProductImage, getAllOrdersForAllUser, updateStatusOfOrder } from '../../services/OrderServices'
import { UserDetails } from '../../services/userDetails'
import { useRouter } from 'next/navigation'
import BlackButton from '../components/button'
import Image from 'next/image'

const Page = () => {
    const [user, setUser] = useState(null)
    const [allOrderForAllUsers, setAllOrdersForAllUsers] = useState(null)
    const [firstEffect, setFirstEffect] = useState(false)
    const [images, setImages] = useState([])
    const router = useRouter()

    const ImageStyle = {
        maxWidth: "100%",
        borderRadius: "0.75 rem",
        objectFit: "cover"
    }

    const handleUpdateOrderStatus = async (id) => {
        console.log(id)
        console.log("update handler reached...")
        const res = await updateStatusOfOrder({
            id,
            isProcessing:false
        })
        console.log(res)
        if(res.success){
            extractAllOrdersForAllUsers()
        }
    }

    async function extractAllOrdersForAllUsers() {
        const res = await getAllOrdersForAllUser()
        if (res) {
            console.log("SuccessPoint reached ...")
            console.log(res.data)
            setAllOrdersForAllUsers(res.data)
            console.log(allOrderForAllUsers)
        }
    }

    useEffect(()=>{
        if(user!==null && firstEffect){
            console.log("Second Effect Reached...")
            extractAllOrdersForAllUsers()
        }
    },[user,firstEffect])

    useEffect(() => {
        const fetchUser = async () => {
            console.log("First Effect Reached")
            const uDetails = await UserDetails()
            setUser(uDetails)
            setFirstEffect(true)
        }
        fetchUser()
    }, [])

    useEffect(() => {
        console.log("Updated allOrderForAllUsers:", allOrderForAllUsers);
        const fetchImages = async () => {
            const tempImages = [];
            for (let i = 0; i < allOrderForAllUsers.length; i++) {
                const order = allOrderForAllUsers[i];
                const orderImages = [];
                for (let j = 0; j < order.orderItems.length; j++) {
                    const orderItem = order.orderItems[j];
                    const imageUrl = await currentProductImage(orderItem.product);
                    orderImages.push(imageUrl);
                }
                tempImages.push({ orderId: order._id, images: orderImages });
            }
            setImages(tempImages);
        }

        if (allOrderForAllUsers !== null) {
            fetchImages();
        }

    }, [allOrderForAllUsers]);

    return (
        <>
            {allOrderForAllUsers !== null ? (
                <section>
                    <div className='mx-auto px-4 sm:x-6 lg:px-8'>
                        <div>
                            <div className='px-4 py-6 sm:px-8 sm:py-10'>
                                <div className="flow-root">
                                    {
                                        allOrderForAllUsers !== null ? (
                                            <ul className='flex flex-col gap-4'>
                                                {
                                                    allOrderForAllUsers.map((item, index) => (
                                                        <li key={item._id} className='bg-white shadow p-5 flex flex-col space-y-3 py-6 text-left'>
                                                            <div className='flex'>
                                                                <h1 className='font-bold text-lg mb-3 flex-1'>#order:{item._id}</h1>
                                                                <div className='flex items-center'>
                                                                    <p className='mr-3 text-sm font-medium text-gray-900'>
                                                                        Total Paid Amount :
                                                                    </p>
                                                                    <p className=' text-sm font-semibold text-gray-900'>
                                                                        {item?.totalPrice}
                                                                    </p>
                                                                </div>
                                                            </div>
                                                            <div className='flex gap-2'>
                                                                {images[index]?.images.map((imageUrl, imgIndex) => (
                                                                    <div key={imgIndex} className='shrink-0'>
                                                                        <Image
                                                                            alt={`OrderItem ${imgIndex + 1}`}
                                                                            width={60}
                                                                            height={60}
                                                                            src={imageUrl}
                                                                            style={ImageStyle}
                                                                        />
                                                                    </div>
                                                                ))}
                                                            </div>
                                                            <div className='flex gap-5'>
                                                                <BlackButton className="disabled:opacity-50 mt-5 mr-5 inline-block bg-block text-white px-5">
                                                                    {item.isProcessing ? 'Order is Processing' : 'Order is Delivered'}
                                                                </BlackButton>
                                                                <BlackButton onClick={() => 
                                                                handleUpdateOrderStatus(item._id)
                                                                } className="mt-5 mr-5 inline-block bg-block text-white px-5">
                                                                    Update Order Details
                                                                </BlackButton>
                                                            </div>
                                                        </li>
                                                    ))
                                                }
                                            </ul>
                                        ) : (<h1>Unable to show the data</h1>)
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            ) : (
                <h1>Hold On Loading....</h1>
            )}
        </>
    )
}

export default Page;
