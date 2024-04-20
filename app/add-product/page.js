"use client";
import { CldUploadButton, CldUploadWidget } from "next-cloudinary";
import React, { useEffect, useState } from "react";
import { adminAddProductformControls } from "utils/index";
import InputComponent from "../components/InputComponent";
import SelectComponent from "../components/SelectComponent";
import { UploadCloudIcon } from "lucide-react";
import axios from "axios";
import { toast } from "react-toastify";
import { checkAdmin } from "../../services/AdminServices";
import { UserDetails } from '../../services/userDetails'

const Page = () => {
  const [formValues, setFormValues] = useState({});
  const [ImageChosen,setImageChosen] = useState(false)
  const [sizes,setSizes] = useState([])
  const [ready,setIsReady] = useState(false)
  const [isAdminView,setIsAdminView] = useState(false)

  useEffect(() => {
        const fetchAdmin = async () => {
            const userDetails = await UserDetails();
            if (userDetails) {
                setUser(true);
            }
            console.log(userDetails)
            if (userDetails.admin) {
                setIsAdminView(true)
            }
            setFirstEffect(true)
        };
        if (typeof window !== 'undefined') {
            fetchAdmin();
        }
    }, []);

  useEffect(()=>{
    setIsReady(true)
  },[isAdminView])

  const addSize = (newSize) => {
    setSizes((prevSizes)=>[...prevSizes,newSize])
  }

  const submitForm = async () => {
    const requiredFields = ['name','price','description','category', 'deliveryInfo', 'onSale']
    if(sizes.length === 0){
      toast.info('Sizes not selected',{position:'top-right'})
      return
    }

    if(!ImageChosen){
      toast.info('Images not selected',{position:'top-right'})
      return
    }

    for (const field of requiredFields) {
      if (!formValues[field]) {
        toast.info(`${field} not selected`,{position:'top-right'})
        return;
      }
    }
    toast.success("Saved Successfully",{position:'top-right'})
    const {imageUrl,name,price,category,description,deliveryInfo,onSale,priceDrop} = formValues
    const availableSizes = JSON.stringify(sizes)
    const result = axios.post('/api/add-product',{imageUrl,availableSizes,name,price,category,description,deliveryInfo,onSale,priceDrop,
    }, {headers: { 'Content-Type': 'application/json' }})
    result.then((response)=>{
      toast.success("product added successfully",{position:'top-right'})
    }).catch((error)=>{
      toast.error("Failed to add Product",{position:'top-right'})
    })
  }

  const updateFormValues = (id, value) => {
    setFormValues((prevValues) => ({
      ...prevValues,
      [id]: value,
    }));
  };

  const handleUpload = (result) => {
    setImageChosen(true)
    const imageUrl = result?.info?.secure_url
    const id="imageUrl"
    const value=imageUrl
    updateFormValues(id, value)
  }

  return (
    <>
      {ready && isAdminView ? (
      <div className="flex w-full mx-5 my-5 flex-col mr-[68px]">
        {isAdminView ? (
        <>
          <div className="flex m-auto">
            <h2 className="font-bold mr-2">Upload An Image</h2>
            <CldUploadButton
              options={{maxFiles:1}}
              onUpload={handleUpload}
              uploadPreset="xntzsiah"
            >
              <UploadCloudIcon className="text-sky-500"/>
            </CldUploadButton>
          </div>
          <div>
            <h3 className="mb-4 font-semibold text-gray-900 dark:text-white">Available Sizes</h3>
            <ul className="items-center w-full text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg sm:flex dark:bg-gray-700 dark:border-gray-600 dark:text-white">
                <li className="w-full border-b border-gray-200 sm:border-b-0 sm:border-r dark:border-gray-600">
                  <div className="flex items-center ps-3">
                    <input id="S" type="checkbox" value="S" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                    onClick={()=>addSize('S')}
                    />
                    <label htmlFor="S" className="w-full py-3 ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">S</label>
                  </div>
                </li>
                <li className="w-full border-b border-gray-200 sm:border-b-0 sm:border-r dark:border-gray-600">
                    <div className="flex items-center ps-3">
                      <input id="M" type="checkbox" value="M" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                      onClick={()=>addSize('M')}
                      />
                      <label htmlFor="M" className="w-full py-3 ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">M</label>
                    </div>
                </li>
                <li className="w-full border-b border-gray-200 sm:border-b-0 sm:border-r dark:border-gray-600">
                    <div className="flex items-center ps-3">
                        <input id="L" type="checkbox" value="L" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                        onClick={()=>addSize('L')}
                        />
                        <label htmlFor="L" className="w-full py-3 ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">L</label>
                    </div>
                </li>
                <li className="w-full dark:border-gray-600">
                    <div className="flex items-center ps-3">
                      <input id="XL" type="checkbox" value="XL" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                      onClick={()=>addSize('XL')}
                      />
                      <label htmlFor="XL" className="w-full py-3 ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">  
                              XL
                      </label>
                    </div>
                </li>
            </ul>
          </div>
          <div className="flex flex-col my-3 mr-[50px]">
            {adminAddProductformControls.map((productControls) =>
              productControls.componentType === "input" ? (
                <InputComponent
                  key={productControls.id}
                  id={productControls.id}
                  type={productControls.type}
                  placeholder={productControls.placeholder}
                  label={productControls.label}
                  onChange={(value) => updateFormValues(productControls.id, value)}
                />
              ) : (
                <SelectComponent 
                  key={productControls.id} 
                  field={{
                    ...productControls,
                    selectedValue: formValues[productControls.id] || '',
                  }}
                  onChange={(value) => updateFormValues(productControls.id, value)}
                />
              )
            )}
            <button className="cursor-pointer bg-black rounded w-full p-3 text-center text-white" onClick={submitForm}>
              Add Product 
            </button>
          </div>
        </>
        ) :(<h1>This page is for the Admin And You are not the Admin</h1>)}
      </div>
      )
      :(isAdminView?<h1>Loading Please Wait</h1>:<h1>This page for the Admin You are not the admin please take a leave...</h1>)}
    </>
  );
};

export default Page;
