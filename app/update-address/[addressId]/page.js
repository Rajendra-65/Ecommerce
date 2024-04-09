"use client"
import React, { useEffect, useState } from 'react';
import UpdateAddress from '../../components/UpdateAddress';
import { useParams } from 'next/navigation';
import { getSingleAddress } from '../../../services/AddressService';

const Page = () => {
  const params = useParams();
  const { addressId } = params;
  (addressId);

  const [address, setAddress] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const fetchedAddress = await getSingleAddress(addressId);
        setAddress(fetchedAddress);
      } catch (error) {
        console.error('Error fetching address:', error);
      }
    };

    fetchData();
  }, [addressId]);

  return (
    <div className='mx-5 my-5 z-50 border border-slate-200 shadow-2xl'>
      <div>
        {address && <UpdateAddress address={address} addressId={addressId} />}
      </div>
    </div>
  );
};

export default Page;
