import { XMarkIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import React from "react";

function Fail() {
  return (
    <div className='shadow-lg w-[400px] flex px-6 flex-col items-center justify-center py-4 bg-gray-100/30'>
      <XMarkIcon className='w-12 h-12 bg-red-600 text-white rounded-full p-2' />
      <p>Your Order's are Cancelled</p>
      <Link
        href='/cart'
        className='bg-orange-500 w-full text-center py-2 mt-8 text-white'>
        Go To My Cart
      </Link>
    </div>
  );
}

export default Fail;
