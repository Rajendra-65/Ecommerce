"use client";
import { adminNavOptions, navOptions } from "../../utils/index";
import React, { Fragment, useState, useEffect } from "react";
import BlackButton from "./button";
import { useRouter } from "next/navigation";
import { checkAdmin } from "../../services/AdminServices";
import { UserDetails } from "../../services/userDetails";
import { useClerk } from "@clerk/clerk-react";
import { useAuth } from "@clerk/nextjs";

const Navbar = () => {
  const [user, setUser] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const [isAdminView, setIsAdminView] = useState(false);
  const [openNav, setOpenNav] = useState(false);
  const [windowSize, setWindowSize] = useState(0);
  const { signOut } = useClerk()
  const router = useRouter();

  const mobileNavOptions = isAdminView ? adminNavOptions : navOptions;

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    const fetchAdmin = async () => {
      const userDetails = await UserDetails();
      if (userDetails) {
        setUser(true);
      }
      if(userDetails.admin){
        setIsAdminView(true)
      }
    };
    fetchAdmin();
  }, []);

  useEffect(() => {
    const handleResize = () => {
      setWindowSize(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div className="h-[66px] w-full z-10 shadow-md flex justify-between items-center">
      <div className="self-center">
        <h1
          className="font-bold ml-12 max-[785px]:ml-5 cursor-pointer"
          onClick={() => {
            router.push("/");
          }}
        >
          Ecommercery
        </h1>
      </div>
      <div className="flex self-center gap-2 relative">
        {windowSize <= 768 && (
          <button
            data-collapse-toggle="navbar-sticky"
            type="button"
            className="inline-flex items-center p-2 text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
            aria-controls="navbar-sticky"
            aria-expanded="false"
            onClick={() => setOpenNav(!openNav)}
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
        )}
        <ul className={`hidden md:flex gap-[22px] p-4 md:p-0 font-medium rounded-md bg-white`}>
          {isAdminView ? (
            <Fragment>
              <BlackButton onClick={() => router.push("/all-products")}>Manage All Product</BlackButton>
              <BlackButton onClick={() => router.push("/add-product")}>AddProduct</BlackButton>
            </Fragment>
          ) : (
            navOptions.map((item) => (
              <li
                className="cursor-pointer"
                key={item.id}
                onClick={() => {
                  router.push(`${item.path}`);
                }}
              >
                {item.label}
              </li>
            ))
          )}
        </ul>
        {windowSize <= 768 && (
          <ul
            className={`${
              openNav ? "fixed top-[66px] z-50 right-0 h-full w-[46%] bg-grey-200" : "hidden"
            } font-medium rounded-md bg-grey-200`}
          >
            {mobileNavOptions.map((item) => (
              <li
                key={item.id}
                onClick={() => router.push(`${item.path}`)}
                className="cursor-pointer block py-2 pl-3 pr-4 text-gray-900"
              >
                {item.label}
              </li>
            ))}
          </ul>
        )}
      </div>
      <div className="flex self-center gap-2">
        {!isAdminView ? (
          <Fragment>
            <BlackButton onClick={() => router.push("/account")}>Account</BlackButton>
            <BlackButton onClick={() => router.push("/cart")}>Cart</BlackButton>
          </Fragment>
        ) : null}
        {user ? (
          <BlackButton onClick={() => signOut(() => router.push("/"))}>Logout</BlackButton>
        ) : (
          <BlackButton onClick={() => router.push("/sign-in")}>Register</BlackButton>
        )}
      </div>
    </div>
  );
};

export default Navbar;
