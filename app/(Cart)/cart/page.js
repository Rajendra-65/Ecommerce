"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { getCartItem, getProduct } from "../../../services/ProductService";
let ItemArray = [];
let products = [];
const page = () => {
  // const [ItemArray,setItemArray] = useState([])
  // const [products,setProducts] = useState([])
  const [isMounted, setIsMounted] = useState(false);
  const [firstEffectComplete, setFirstEffectComplete] = useState(false);
  const ImageStyle = {
    borderRadius: "0.5rem",
  };

  useEffect(() => {
    setIsMounted(true);
  }, []);

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

  useEffect(() => {
    if (firstEffectComplete) {
      const fetchProduct = async () => {
        console.log(ItemArray);
        for (const item of ItemArray) {
          try {
            const result = await getProduct(item);
            products = [...products, result];
            console.log(products);
            console.log("Type of products:", typeof products);
          } catch (error) {
            console.log("error in getting single product details", error);
          }
        }
      };
      fetchProduct();
    }
  }, [ItemArray, firstEffectComplete]);

  return (
    <div className="mx-5 my-5 z-50 shadow-2xl  shadow-zinc-300 border rounded-sm border-slate-200 w-[calc(100%-40px)] h-[calc(100vh-100px)] border-x-2 border-y-2">
      {console.log(products)}

      {!products && <h1>Hello</h1>}
    </div>
  );
};

export default page;
