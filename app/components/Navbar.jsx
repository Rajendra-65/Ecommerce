"use client";
import { adminNavOptions, navOptions, styles } from "../../utils/index";
import React, { Fragment, useState, useEffect } from "react";
import BlackButton from "./button";
import { useRouter,usePathname } from "next/navigation";
import { useAuth } from "@clerk/nextjs";
import Link from "next/link";
import { NextResponse } from "next/server";
import { set } from "mongoose";
const isSignedIn = false;
const user = {
  role: "admin",
};
const Navbar = () => {
  const {isSignedIn} = useAuth()
  const [isMounted, setIsMounted] = useState(false);
  const [isAdminView,setIsAdminView] = useState(false)
  const [openNav,setOpenNav] = useState(false)
  const [windowSize, setWindowSize] = useState(0);
  const router = useRouter()
  useEffect(() => {
    setIsMounted(true);
  }, []);
  useEffect(() => {
    // Update the windowSize state when the window is resized
    const handleResize = () => {
      setWindowSize(window.innerWidth);
    };

    // Add a listener for the "resize" event
    window.addEventListener('resize', handleResize);

    // Clean up the listener when the component unmounts
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);
  return (
    <div className="h-[66px] w-full z-10 shadow-md flex justify-around">
      <div className="self-center">
        <h1 className="font-bold  ml-12 max-[785px]:ml-5" onClick={()=>{router.push('/')}}>Ecommercery</h1>
      </div>
      <div className="flex self-center justify-between px-2 gap-2 ">
        <ul
        className={`flex flex-col p-4 font-medium rounded-e-lg  bg-white ${openNav ? ' absolute mt-[32px] ml-[39px] w-[100%] h-[100%] z-50 min-[767px]:hidden' : 'hidden'
        }`}
      >
          {isAdminView ?adminNavOptions.map((item) => (
                <li
                  className="cursor-pointer block py-2 pl-3 pr-4 text-gray-900 rounded md:p-0"
                  key={item.id}
                  onClick={()=>alert('hello')}
                >
                  <Link
                    href={`${item.path}`}
                  >
                    {item.label}
                  </Link>
                </li>
              ))
            : navOptions.map((item) => (
                  <li
                    className="cursor-pointer block py-2 pl-3 pr-4 text-gray-900 rounded md:p-0"
                    key={item.id}
                  >
                    {item.label}
                  </li>
              
            ))}
        </ul>
          {windowSize > 768 ? (
            <ul
            className={`flex flex-inherit gap-[22px]  p-4 md:p-0 font-medium border rounded-e-lg  bg-white`}
          >
              {isAdminView ?
                <ul className="flex gap-2">
                  <li onClick={()=>router.push('/all-products')}>
                      Manage All Product
                  </li>
                  <li onClick={()=>router.push('/add-product')}>
                      Add Product
                  </li>
                </ul>
                : navOptions.map((item) => (
                      <li
                        className="cursor-pointer block py-2 pl-3 pr-4 text-gray-900 rounded md:p-0"
                        key={item.id}
                      >
                        <Link href={`${item.path}`}>
                          {item.label}
                        </Link>
                      </li>
                ))
              }
            </ul>
          ):null}
      </div>
      <div className="flex self-center gap-2 ">
        {!isAdminView && isSignedIn ? (
          <Fragment>
            <BlackButton>Account</BlackButton>
            <BlackButton>Cart</BlackButton>
          </Fragment>
        ) : null}
        {user?.role === "admin" ? (
          isAdminView ? (
            <BlackButton onClick={()=> {setIsAdminView(false)}}>Client View</BlackButton>
          ) : (
            <BlackButton onClick={() => {setIsAdminView(true)}}>Admin View</BlackButton>
          )
        ) : null}
        {isSignedIn ? (
            <BlackButton onClick={()=>{router.push('/logOut')}}>Logout</BlackButton>
        ) : (
            <BlackButton onClick={()=>{router.push('/sign-in')}}>Register</BlackButton>
            
        )}
        <button
          data-collapse-toggle="navbar-sticky"
          type="button"
          className="inline-flex items-center p-2 text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
          aria-controls="navbar-sticky"
          aria-expanded="false"
          onClick={()=>setOpenNav(!openNav)}
        >
          <span className="sr-only">Open main menu</span>
          <svg
            className="w-6 h-6"
            aria-hidden="true"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
              clipRule="evenodd"
            ></path>
          </svg>
        </button>
      </div>
    </div>
  );
};

export default Navbar;
