"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { getCartItem, getProduct,RemoveFromCart } from "../../../services/ProductService";
import BlackButton from "../../components/button";
let ItemArray = [];
let price = 0
let count = 0
// let products = [];
const page = () => {
  const [products,setProducts] = useState([])
  const [totalPrice,setTotalPrice] = useState(0)
  const [isMounted, setIsMounted] = useState(false);
  const [firstEffectComplete, setFirstEffectComplete] = useState(false);
  const router = useRouter()
  const ImageStyle = {
    borderRadius: "0.5rem",
  };
  // This one check for hydration Problem
  useEffect(() => {
    setIsMounted(true);
  }, []);
  // This one for the fetching the CartItem form Cart Model
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await getCartItem();
        ItemArray = [...response];
        console.log(response);
        console.log(ItemArray);
        setFirstEffectComplete(true);
      } catch (error) {
        console.log("error in fetching the cart Products", error);
      }
    };
    fetchProduct();
  }, []);
  // This one for fetching the individual Product Details
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
  // For calculating the Total Price  
  useEffect(() => {
    const newTotalPrice = products.reduce((acc, product) => {
      return acc + product.price;
    }, 0);
    setTotalPrice(newTotalPrice);
  }, [products]);
  // When Someone Click ON the remove button
  const handleRemoveClick = async (productId) => {
    try{
      console.log("code reached to the handler remove")
      const response = await RemoveFromCart(productId)
      window.location.reload()
    }catch(error){
      console.log(error)
    }
  }
  return (
    <div className="mx-5 my-5 z-50 shadow-2xl  shadow-zinc-300 border rounded-sm border-slate-200 w-[calc(100%-40px)] h-[calc(100vh-100px)] border-x-2 border-y-2 overflow-y-auto">
      {
        products.length > 0 ? Object.entries(products).map(([productId, product],index) => (
          <div 
            key={productId} 
            className="relative "
          >
            <div
              className="my-5 mx-5 mb-5 flex flex-row justify-between"
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
                <h1 className="text-orange-500 mr-2"  onClick={() => handleRemoveClick(product._id)}>Remove</h1>
              </div>
            </div>
            <div className='w-full h-[1px] bg-slate-400'/>
          </div> 
        )):<h1>Nothing To Show</h1>
      }
      <div className="flex flex-col mb-1">
        {
          products.length >0 ?
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
                <BlackButton className="w-full" onClick={ () => {router.push('/checkout')}}>Check It Out</BlackButton>
              </div>
            </div>
              : null
        }
      </div>
    </div>
  );
};

export default page;
