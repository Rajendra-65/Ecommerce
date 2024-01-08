"use client"
import React, { useState, useEffect } from "react";
import BlackButton from "../../components/button";
import { auth } from "@clerk/nextjs";
import { deleteAddress } from "../../../services/AddressService";
import AddressForm from "../../components/AddressForm";
import axios from "axios";
import { useRouter } from "next/navigation";
import {UserDetails} from "../../../services/userDetails"
let AllAddress = []
let count = 0
const Account = () => {
  const router = useRouter()
  const [addresses, setAddresses] = useState([]);
  const [addressClick, setAddressClick] = useState(false);
  const [user,setUser] = useState(null)
  const [mounted,setIsMounted] = useState(false)
  const [firstEffect,setFirstEffect] = useState(false)
  useEffect(() => {
    setIsMounted(true);
  }, []);

  // For fetching the Address from the database....

  useEffect(()=>{
    console.log("Second Effect Reached")
    fetchAddress()
    console.log(addresses)
  },[firstEffect])
  
  useEffect( () => {
    const fetchedRoute = async () => {
      console.log("First Effect Reached")
      const fetchedUser = await UserDetails()
      setUser(fetchedUser.data)
      setFirstEffect(true)
    }
    fetchedRoute()
  },[])

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

  const updateHandler = async (addressId) => {
    console.log(addressId)
      router.push(`/update-address/${addressId}`)
  }

  const deleteHandler = async (addressId) => {
    console.log(addressId)
    const result = await deleteAddress(addressId)
    console.log(result)
    window.location.reload()
  }

  const handleAddressFormSubmit = () => {
    // Set dependencyValue to true
    window.location.reload()
  };

  return (
    <>
    {addresses? (<>
      <div className=" mx-5 my-5 w-[calc(100vw-40px)] h-full border border-slate-100 shadow-2xl z-50 ">
        <div className="mt-5 ml-3 mb-3 flex flex-col">
          <h1 className="font-bold mb-1">Email:<span className="font-normal">{user?.email}</span></h1>
          <h1 className="font-bold mb-1">userId:<span className="font-normal">{user?.userId}</span></h1>
          <BlackButton onClick={()=>router.push('/orders')}>View Your Orders</BlackButton>
        </div>
        <div className="flex flex-row ml-3 w-[100%]">
          <h1 className="font-bold">Your Addresses:</h1>
          {addresses.length === 0 ? (
            <div className="flex flex-col">
              <h1 className="font-semibold mb-1">
                No Addresses found, please add a new Address
              </h1>
              <BlackButton onClick={() => setAddressClick(true)}>
                Add New Address
              </BlackButton>
            </div>
          ) : (
            <div className="w-[100%]">
              {addresses.map(( address, index) => (
                <div
                  key={address._id}
                  className={`ml-3 mt-3 mb-3 mr-5 flex flex-col border border-slate-200 shadow-2xl z-50 rounded sm:w-[95%]`}
                >
                  <div className={`flex flex-col`}>
                    <h1 className="ml-3 mt-1 mb-1"><span className='font-bold'>Name</span>: {address.Name}</h1>
                    <h1 className="ml-3 mt-1 mb-1"><span className='font-bold'>Address</span>: {address.Address}</h1>
                    <h1 className="ml-3 mt-1 mb-1"><span className='font-bold'>City</span>: {address.City}</h1>
                    <h1 className="ml-3 mt-1 mb-1"><span className='font-bold'>Country</span>: {address.Country}</h1>
                    <h1 className="ml-3 mt-1 mb-1"><span className='font-bold'>PostalCode</span>: {address.PostalCode}</h1>
                    <div className='flex flex-row justify-between'>
                      <BlackButton className='ml-3 mt-1 mb-1 mr-3' onClick={()=>updateHandler(address._id)}>Update</BlackButton>
                      <BlackButton className = 'ml-3 mt-1 mb-1 mr-3'  onClick={()=>deleteHandler(address._id)}>Delete</BlackButton>
                    </div>
                  </div>
                </div>
              ))}
              <BlackButton onClick={() => setAddressClick(true)} className='ml-[13px]'>
                Add New Address
              </BlackButton>
            </div>
          )}
        </div>
        <div className="w-[100%] h-auto bg-red-100">
          {addressClick && (
            <AddressForm
              onSubmit={handleAddressFormSubmit}
            />
          )}
        </div>
      </div>
      </>) : (<h1>Hold on Loading</h1>)}
    </>
  );
};

export default Account;
