import Link from "next/link";
import React from "react";

function WishListNoItems() {
  return (
    <div className='flex flex-col items-center justify-center h-[85vh] space-y-6'>
      <h1 className='text-gray-700 text-xl font-semibold uppercase'>
        Wishlist Empty
      </h1>
      <div className='text-sm font-light'>
        <p className='text-stone-500'>
          save your favorite pieces of items in one place
        </p>
        <p className='text-stone-500 text-center -mt-1'>
          Add now, buy later
        </p>
      </div>
      <img
        src='https://cdn.shopify.com/s/files/1/0315/5165/1899/t/2/assets/empty-wishlist.png?v=141658177206755846691581744316'
        className='w-[400px] h-[200px] object-contain'
      />
      <Link
        href='/'
        className='border border-[#3466e8] text-[#3466e8] py-[13px] px-[51px] text-[16px] font-semibold rounded-sm uppercase tracking-wide mt-4'>
        Continue Shopping
      </Link>
    </div>
  );
}

export default WishListNoItems;
