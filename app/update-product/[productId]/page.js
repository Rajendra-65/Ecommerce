"use client";
import { CldUploadButton, CldUploadWidget } from "next-cloudinary";
import React, { useEffect, useState } from "react";
import { adminAddProductformControls } from "utils/index";
import InputComponent from "../../components/InputComponent"
import SelectComponent from "../../components/SelectComponent";
import { UploadCloudIcon } from "lucide-react";
import axios from "axios";
import { toast,ToastContainer } from "react-toastify";
import { useParams } from "next/navigation";

const Page = () => {
  const params = useParams()
  const {productId} = params
  const [formValues, setFormValues] = useState({});
  const [isMounted,setIsMounted] = useState(false)
  const [existingProduct,setExistingProduct] = useState(null)
  const [imageChosen,setImageChosen] = useState(true)
  const [sizes,setSizes] = useState([])
  useEffect(()=> {
    setIsMounted(true)
  },[])
  useEffect( ()=>{
    const fetchProduct = async () => {
        try{
          const response = await axios.get(`/api/update-product/${productId}`)
          setExistingProduct(response.data)
        }catch(error){
          console.error("Product not Fetched Properly")
        }
    }
    fetchProduct()
  },[productId])
  // it only update when productId Changes 
  useEffect(() => {
    setExistingProduct(existingProduct)
    setFormValues(existingProduct)
  }, [existingProduct]);
  // this useEffect used due to the asynchronous nature of state updates in React to ensure it runs after the state has been successfully updated
  const addSize = (newSize) => {
    if(existingProduct.availableSizes.includes(newSize)){
      return
    }
    setSizes(formValues.availableSizes)
    setSizes((prevSizes) => [...prevSizes, newSize]);
  }

  const submitForm = async () => {
    const requiredFields = ['name','price','description','category', 'deliveryInfo', 'onSale']

    for (const field of requiredFields) {
      if (!formValues[field]) {
        toast.info(`Please fill in the "${field}" field`,{position:'top-right'})
        return;
      }
    }

    const {imageUrl,name,price,category,description,deliveryInfo,onSale,priceDrop} = formValues
    const availableSizes = JSON.stringify(sizes)
    const result = axios.post(`/api/put-product/${productId}`,{imageUrl,availableSizes,name,price,category,description,deliveryInfo,onSale,priceDrop,
      }, {headers: { 'Content-Type': 'application/json' }})
      result.then((response)=>{
        toast('Product Updated Successfully', {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
          });
      }).catch((error)=>{
      toast.error("something went wrong try again",{position:'top-right'})
  })
}

  const updateFormValues = (id, value) => {
    setFormValues((prevValues) => ({
      ...prevValues,
      [id]: value,
    }));
  };

  const handleUpload = (result) => {
    setImageChosen(false)
    if(!imageChosen){
      const imageUrl = result?.info?.secure_url
      const id="imageUrl"
      const value=imageUrl
      updateFormValues(id, value)
    }
  }
  if(existingProduct && formValues){
  return (
    <div className="flex w-full mx-5 my-5 flex-col mr-[68px]">
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
              value={formValues[productControls.id] || ''}
              onChange={(value) => updateFormValues(productControls.id, value)}
            />
          ) : (
            <SelectComponent 
              key={productControls.id} 
              field={{
                ...productControls,
                selectedValue: formValues[productControls.id] || '',
              }}
              value={formValues[productControls.id]}
              onChange={(value) => updateFormValues(productControls.id, value)}
            />
          )
        )}
        <button className="cursor-pointer bg-black rounded w-full p-3 text-center text-white" onClick={submitForm}>
          Update Product 
        </button>
      </div>
    </div>
  );
  };
}

export default Page;
