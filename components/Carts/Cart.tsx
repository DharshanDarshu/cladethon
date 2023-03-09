"use client";

import {
  MinusIcon,
  PlusIcon,
} from "@heroicons/react/24/solid";
import { useEffect, useState } from "react";

type Props = {
  title: string;
  image: string;
  id: string;
  items: number;
  price: number;
  email: string;
  productId: string;
  onChangeItems: Function;
  onRemove: Function;
  index: number;
};

function Cart({
  title,
  image,
  id,
  items,
  price,
  email,
  productId,
  onChangeItems,
  onRemove,
  index,
}: Props) {
  const [noOfItems, setNoOfItems] = useState(items);
  const [disabled, setDisabled] = useState(false);

  useEffect(() => {
    if (items <= 1) {
      setDisabled(true);
    }
  }, [items]);

  const handleAddItems = async () => {
    setNoOfItems(noOfItems + 1);
    onChangeItems(noOfItems + 1, index, true);
    if (noOfItems > 0) {
      setDisabled(false);
    }
    const response = await fetch(
      `${process.env.RESTFUL_API}/carts`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          productId,
          image,
          email,
          price,
          items: 1,
          title,
        }),
      },
    );

    const data = await response.json();

    console.log(data);
  };

  const handleRemoveItems = async () => {
    if (noOfItems <= 2) {
      setDisabled(true);
    }
    onChangeItems(noOfItems - 1, index, false);
    setNoOfItems(noOfItems - 1);

    const response = await fetch(
      `${process.env.RESTFUL_API}/carts?sub=true`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          productId,
          image,
          email,
          price,
          items: 1,
          title,
        }),
      },
    );

    const data = await response.json();

    console.log(data);
  };

  const handleRemoveProduct = async () => {
    onRemove(id);
    const response = await fetch(
      `${process.env.RESTFUL_API}/carts/remove`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          productId,
        }),
      },
    );
  };
  return (
    <div className='h-[210px] border-b px-4 lg:px-12 pt-2 pb-8 flex space-x-4 md:space-x-8'>
      <div className='max-h-full w-36'>
        <img
          src={`${process.env.RESTFUL_API}/image/${image}`}
          alt=''
          className='w-full h-full'
        />
      </div>
      <div className='flex-1 flex flex-col'>
        <h1 className='text-lg leading-5 lg:text-2xl text-gray-800 capitalize'>
          {title}
        </h1>
        <p className='text-sm font-bold mt-1 flex-1'>
          Rs {price}
        </p>
        <button
          onClick={handleRemoveProduct}
          className='bg-red-500 py-[6px] w-28 text-white'>
          Remove
        </button>
      </div>
      <div className='flex items-end space-x-1 '>
        {!disabled && (
          <MinusIcon
            className='w-5 h-5 cursor-pointer'
            onClick={handleRemoveItems}
          />
        )}
        <p>{noOfItems}</p>
        <PlusIcon
          className='w-5 h-5 cursor-pointer'
          onClick={handleAddItems}
        />
      </div>
    </div>
  );
}

export default Cart;
