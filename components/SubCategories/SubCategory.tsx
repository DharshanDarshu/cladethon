import Image from "next/image";
import React from "react";

type Props = {
  image: string;
};

function SubCategory({ image }: Props) {
  return (
    <div className='cursor-pointer'>
      <Image
        src={image}
        unoptimized={true}
        className='w-full h-full'
        width={800}
        height={800}
        alt=''
      />
    </div>
  );
}

export default SubCategory;
