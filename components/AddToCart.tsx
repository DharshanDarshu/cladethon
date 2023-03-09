"use client";

import { ShoppingBagIcon } from "@heroicons/react/24/solid";
import toast from "react-hot-toast";

type Props = {
  title: string;
  image: string;
  productId: string;
  price: number;
  user: {
    email: string;
  };
};

function AddToCart({
  title,
  image,
  productId,
  price,
  user,
}: Props) {
  const handleAddToCart = async () => {
    const notification = toast.loading(
      "Please wait, item adding to Cart",
    );
    await fetch("http://localhost:4000/carts", {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        productId,
        image,
        email: user.email,
        price,
        items: 1,
        title,
      }),
    }).then((response) => {
      const data = response.json();

      toast.success("Item Added to cart successfully", {
        id: notification,
      });

      console.log(data);
    });
  };
  return (
    <button
      onClick={handleAddToCart}
      disabled={!user}
      className='bg-[#ff3e6c] hover:bg-[#ff3e61] disabled:cursor-not-allowed disabled:bg-red-400 flex items-center my-4 justify-center space-x-2 border w-full rounded-sm font-semibold uppercase border-[#ff3e6c] px-8 py-3 text-white'>
      <ShoppingBagIcon className='w-6 h-6' />
      <span>Add to Cart</span>
    </button>
  );
}

export default AddToCart;
