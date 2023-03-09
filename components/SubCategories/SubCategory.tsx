import React from "react";

type Props = {
  image: string;
};

function SubCategory({ image }: Props) {
  return (
    <div className='cursor-pointer'>
      <img
        src={image}
        alt=''
      />
    </div>
  );
}

export default SubCategory;
