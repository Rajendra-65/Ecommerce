"use client"
import axios from 'axios'
import BlackButton from '../components/button'
import React,{useEffect, useState} from 'react'
import {getCartItem ,getProduct} from '../../services/ProductService'
import Image from 'next/image'
import { useRouter, useSearchParams } from 'next/navigation'
import { loadStripe } from '@stripe/stripe-js'
import callStripeSession from "../../services/stripe/index"
import {UserDetails} from "../../services/userDetails"
import { createNewOrder } from '../../services/OrderServices'

let ItemArray = []
let checkoutFormData
const page = () => {
  const [firstEffectComplete,setFirstEffectComplete] = useState(false)
  const [products,setProducts] = useState([])
  const [addresses, setAddresses] = useState([])
  const [addressClick,setAddressClick] = useState(null)
  const [totalPrice,setTotalPrice] = useState(null)
  const [isDisable,setIsDisable] = useState(false)
  const [isOrderProcessing,setIsOrderProcessing] = useState(false)
  const [orderSuccess,setOrderSuccess] = useState(false)
  const [user,setUser] = useState(null)
  const router = useRouter()
  const params = useSearchParams()
  const publishableKey = 'pk_test_51OQuRxSF54Ms4ZBVju3x7dQCrgEtXEQfKzzx5iXB4DtFXTbeuyQo9tqmEEJS8EY3DuwOp9kv0x44SXPE0p6GiyrK006rVqcYDu'
  const stripePromise = loadStripe(publishableKey)
  const ImageStyle = {
    borderRadius: "0.5rem",
  };

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await getCartItem();
        ItemArray = [...response]
        setFirstEffectComplete(true)
        console.log(response);
        console.log(ItemArray);
      } catch (error) {
        console.log("error in fetching the cart Products", error);
      }
    };
    fetchProduct();
  }, []);

  useEffect(() => {
    const fetchProduct = async () => {
      if (firstEffectComplete) {
        const fetchedProducts = [];
        for (const item of ItemArray) {
          try {
            const result = await getProduct(item);
            fetchedProducts.push(result);
          } catch (error) {
            console.log("error in getting single product details", error);
          }
        }
        setProducts(fetchedProducts)
      }
    };
  
    fetchProduct();
  }, [firstEffectComplete]);

  useEffect(()=>{
    fetchAddress()
    console.log(addresses)
  },[])

  useEffect(() => {
  console.log('State Updated:', addressClick);
  }, [addressClick]);

  useEffect(() => {
    const newTotalPrice = products.reduce((acc, product) => {
      return acc + product.price;
    }, 0);
    setTotalPrice(newTotalPrice);
  }, [products]);

  useEffect(()=>{
    const fetchUser = async () => {
      const res = await UserDetails()
      setUser(res)
    }
    fetchUser()
  },[])

  useEffect(() => {
    async function createFinalOrder () {
      const isStripe = JSON.parse(localStorage.getItem('stripe'))
      if(isStripe && params.get('status') === 'success' && products && products.length >0){
        setIsOrderProcessing(true)
        const getCheckoutFormData = JSON.parse(localStorage.getItem('checkoutFormData'))
        console.log(getCheckoutFormData)
        const createFinalCheckoutFormData = {
          user:user?._id,
          shippingAddress:getCheckoutFormData,
          orderItems:products.map(item => ({
            qty:1,
            product:item._id
          })),
          paymentMethod:'Stripe',
          totalPrice:products.reduce((acc, product) => {
            return acc + product.price;
          }, 0),
          isPaid:true,
          isProcessing:true,
          paidAt:new Date()

        }
        const res = await createNewOrder(createFinalCheckoutFormData)
        console.log(res)
        if(res.success){
          setIsOrderProcessing(false)
          setOrderSuccess(true)
          console.log("Order success")
        }else{
          setIsOrderProcessing(false)
          setOrderSuccess(false)
          console.log("order Failed")
        }
      }
    }
    createFinalOrder()
  },[params.get('status'),products])

  const fetchAddress = async () => {
    try {
      const response = await axios.get("/api/get-address")
      const data = response.data
      console.log(data)
      setAddresses(data)
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleAddressClick = (index) => {
    setAddressClick((prevSelectedAddress) =>
      prevSelectedAddress === index ? null : index
    );
    checkoutFormData = addresses[index]
    setIsDisable(true)
  };
  const handleCheckOut = async () => {
    //checkout handler is here 
    
    //stripe customer creation .......

    const stripe = await stripePromise
    const createLineItems = products.map(item => ({
      price_data : {
        currency:'inr',
        product_data :{
          images : [item.imageUrl],
          name:item.name
        },
        unit_amount : item.price * 100
      },
      quantity:1
    }))

    try{
      const res = await callStripeSession(createLineItems,checkoutFormData)
      setIsOrderProcessing(true)
      localStorage.setItem('stripe',true)
      localStorage.setItem('checkoutFormData',JSON.stringify(checkoutFormData))
      const {error} = await stripe.redirectToCheckout({
        sessionId:res.id,
      })
      console.log(error)
    }catch(error){
      console.log(error)
    }
  }

  console.log(checkoutFormData)
  
  useEffect(()=>{
    if(orderSuccess){
      setTimeout(()=>{
        setOrderSuccess(false)
        router.push('/orders')
      },[3000])
    }
  },[orderSuccess])

  if(orderSuccess){
    return <section className="h-screen bg-gray-200">
            <div className='mx-auto px-4 sm:px-6 lg:px-8'>
              <div className="mx-auto mt-8 max-w-screen-xl px-4 sm:px-6 lg:px-8">
                <div className='bg-white shadow'>
                  <div className='px-4 py-8 sm:py-10 flex flex-col ga-5'>
                    <h1 className="font-bold text-lg">
                      Your Payment is Successful and You Will be Redirected To Orders Page In 3 Seconds.....
                    </h1>
                  </div>
                </div>
              </div>
            </div>
          </section>
  }

  if(isOrderProcessing){
    return (
      <div className="flex items-center font-bold">
        Hold On Loading the details
      </div>
    )
  }
  return (
    <div className='flex mx-5 my-4 w-[100%] overflow-x-hidden'>
      <div className='flex-row w-[50%] mr-2 mb-2'>
        <h1 className='mb-3'>Cart Summary</h1>
        <div className='flex flex-col w-[100%]  my-5 z-50 shadow-2xl  shadow-zinc-300 border rounded-sm border-slate-200 h-[calc(100vh-100px)] border-x-2 border-y-2 overflow-y-auto'>
          {
            products.length > 0 ? Object.entries(products).map(([productId, product],index) => (
              <div 
                key={productId} 
                className="relative "
              >
                <div
                  className="my-5 mx-5 mb-5 flex flex-col"
                >
                  <div className="flex flex-col w-full h-[200px]">
                    <Image
                      alt={product.description}
                      src={product.imageUrl}
                      height={80}
                      width={80}
                      style={ImageStyle}
                    />
                    <h1 className="flex font-bold text-center ml-3 absolute top-[32px] left-[90px] w-[256px] sm:w-auto "
                    style={{ top: `calc(160 * ${index} + 160px)` }}
                    >
                      {product.name}
                    </h1>
                  </div>
                  <div className="flex flex-col sm:flex-row absolute right-[34px] top-[32px]"
                  style={{ top: `calc(160 * ${index} + 160px)` }}
                  >
                    <h1 className="font-bold mr-2">{product.price}</h1>
                  </div>
                </div>
                <div className='w-full h-[1px] bg-slate-400'/>
              </div> 
            )):<h1>Nothing To Show</h1>
          }
        </div>
      </div>
      <div className='flex w-[50%] mr-2'>
          <div className='flex flex-col w-[100%] mr-[17px]'>
            <div className='mb-2 flex-row'>
              <h1 className='font-semibold'>Shipping Address Details</h1>
              <h1 className='font-semibold'>Complete Your Order By Selecting Below</h1>
            </div>
            <div className='flex flex-col w-[100%]  my-5 z-50 shadow-2xl  shadow-zinc-300 border rounded-sm border-slate-200 h-[calc(100vh-100px)] border-x-2 border-y-2 overflow-y-auto'>
              <div className='border rounded-md '>
                <div>
                  <div className='flex flex-col w-full'>
                    {addresses.map(( address, index) => (
                      <div
                        key={address._id}
                        className={`ml-3 mt-3 mb-3 mr-5 flex flex-col border border-slate-200 shadow-2xl z-50 rounded sm:w-[95%]`}
                        style={{
                          border: index === addressClick ? '1px solid black' : '',
                        }}
                        onClick={() => handleAddressClick(index)}
                      >
                        <div className={`flex flex-col`}>
                          <h1 className="ml-3 mt-1 mb-1"><span className='font-bold'>Name</span>: {address.Name}</h1>
                          <h1 className="ml-3 mt-1 mb-1"><span className='font-bold'>Address</span>: {address.Address}</h1>
                          <h1 className="ml-3 mt-1 mb-1"><span className='font-bold'>City</span>: {address.City}</h1>
                          <h1 className="ml-3 mt-1 mb-1"><span className='font-bold'>Country</span>: {address.Country}</h1>
                          <h1 className="ml-3 mt-1 mb-1"><span className='font-bold'>PostalCode</span>: {address.PostalCode}</h1>
                        </div>
                        <BlackButton className='ml-[13px] mr-[13px] mb-[13px]'>
                            Select New Address
                        </BlackButton>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              <BlackButton className='mt-2 ml-[13px] mr-[13px] mb-[13px]'
                onClick={ () => {router.push('/account')}}
              >Add New Address</BlackButton>
              <div className='flex flex-col'>
                {
                  products.length > 0 ?
                    <div className="flex flex-col">
                      <div className="flex justify-between mt-1 mb-1">
                        <h1 className="font-bold">Total Price</h1> 
                        <h1 className="font-bold">₹{totalPrice}</h1>
                      </div>
                      <div className='w-full h-[1px] bg-slate-400'/>
                      <div className="flex justify-between mt-1 mb-1">
                        <h1 className="font-bold">Shipping Charge</h1>
                        <h1 className="font-bold">₹0</h1>
                      </div>
                      <div className='w-full h-[1px] bg-slate-400'/>
                      <div className="flex justify-between mt-1 mb-1">
                        <h1 className="font-bold">Total Cart Cost</h1>
                        <h1 className="font-bold">₹{totalPrice}</h1>
                      </div>
                    <div className='w-full h-[1px] bg-slate-400'/>
                    <div className="flex w-full mt-1 mb-1">
                      <BlackButton 
                        className={`w-full ml-[13px] mr-[13px] mb-[13px] ${addressClick ? '' : 'opacity-50'}`} 
                        disabled={!isDisable}
                        onClick={handleCheckOut}
                      >Check It Out</BlackButton>
                    </div>
                    </div> 
                  : null
                }
              </div>
            </div>
          </div>
      </div>
    </div>
  )
}

export default page