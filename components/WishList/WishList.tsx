"use client";

import { XMarkIcon } from "@heroicons/react/24/outline";
import { toast } from "react-hot-toast";

type Props = {
  title: string;
  image: string;
  price: number;
  productId: string;
  onAddToCart: Function;
  token: string;
};

function WishList({
  title,
  image,
  price,
  productId,
  onAddToCart,
  token,
}: Props) {
  // const restApi =
  //   "https://cladethon-hosted-service.vercel.app";
  const restApi = "http://localhost:4000";
  const removeWishList = async () => {
    const response = await fetch(
      `${restApi}/wishlist/remove`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
        body: JSON.stringify({ productId }),
      },
    );

    onAddToCart(productId);
  };
  const addToCart = async () => {
    const notification = toast.loading(
      "Please wait, item adding to Cart",
    );

    removeWishList();

    await fetch(`${restApi}/carts`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
      body: JSON.stringify({
        productId,
        image,
        price,
        items: 1,
        title,
      }),
    }).then((response) => {
      const data = response.json();

      toast.success("Item Added to cart successfully", {
        id: notification,
      });
      onAddToCart(productId);
    });
  };
  return (
    <div className='relative border w-[230px] rounded-md'>
      <img
        src={`${restApi}/image/${image}`}
        className='w-full h-[300px] rounded-t-md'
      />
      <div
        onClick={removeWishList}
        className='absolute top-0 bg-gray-200 rounded-full p-[1px] border border-gray-500 right-0 mr-2 mt-1 cursor-pointer'>
        <XMarkIcon className='w-5 h-5 text-gray-800' />
      </div>
      <div className='px-4 py-2'>
        <h1 className='capitalize text-sm text-gray-800 font-semibold'>
          {title}
        </h1>
        <p className='font-semibold'>Rs {price}</p>
      </div>
      <button
        onClick={addToCart}
        className='text-center w-full py-[13px] uppercase text-red-500 font-semibold text-sm border-t'>
        Move to Bag
      </button>
    </div>
  );
}

export default WishList;
