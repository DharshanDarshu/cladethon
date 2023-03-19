import Image from "next/image";
import React from "react";

function WishListWithOutLogin() {
  return (
    <div className='flex flex-col items-center justify-center h-[85vh] space-y-6'>
      <h1 className='text-gray-700 text-xl font-semibold uppercase'>
        Please Login In
      </h1>
      <p className='text-gray-400'>
        Login to view items in your wishlist
      </p>
      <img
        src='https://cdn.shopify.com/s/files/1/0315/5165/1899/t/2/assets/empty-wishlist.png?v=141658177206755846691581744316'
        className='w-[400px] h-[200px] object-contain'
      />
      <button className='border border-[#3466e8] text-[#3466e8] py-[13px] px-[51px] text-[16px] font-semibold rounded-sm uppercase tracking-wide mt-4'>
        Login
      </button>
    </div>
  );
}

export default WishListWithOutLogin;
