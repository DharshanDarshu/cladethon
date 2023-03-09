import React from "react";
import UpdateCategory from "../../../../components/UpdateCategory";

type Props = {
  params: {
    id: string;
  };
};

function UpdateSubCategory({ params: { id } }: Props) {
  return (
    <div className='flex justify-center py-6 bg-stone-100 h-[calc(100vh-80px)]'>
      <UpdateCategory id={id} />
    </div>
  );
}

export default UpdateSubCategory;
