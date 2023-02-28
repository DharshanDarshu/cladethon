import Image from "next/image";
import React from "react";

function Category() {
  return (
    <div className='relative w-[170px] min-h-[120px] cursor-pointer'>
      <img
        src='/assests/banner.jpg'
        alt=''
        className='w-full h-full object-cover rounded-xl'
        width={100}
        height={100}
      />
      <h2 className='absolute top-2 text-white text-center w-full text-lg font-semibold'>
        Furniture
      </h2>
    </div>
  );
}

export default Category;
