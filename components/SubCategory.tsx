import Link from "next/link";
import React from "react";

type Props = {
  category: string;
  subcategory: [{ name: string; image: string }];
};

function SubCategory({ category, subcategory }: Props) {
  return (
    <div className='flex'>
      {subcategory.map(({ name, image }) => (
        <Link
          href={`categories/${category}/${name}`}
          key={image}>
          <img
            src={`${process.env.RESTFUL_API}/image/${image}`}
            alt=''
          />
        </Link>
      ))}
    </div>
  );
}

export default SubCategory;
