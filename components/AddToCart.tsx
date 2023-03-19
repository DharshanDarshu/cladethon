"use client";

import { ShoppingBagIcon } from "@heroicons/react/24/solid";
import { useRouter } from "next/navigation";
import { Router } from "next/router";
import { useState } from "react";
import toast from "react-hot-toast";

type Props = {
  title: string;
  image: string;
  productId: string;
  price: number;
  token: string;
};

function AddToCart({
  title,
  image,
  productId,
  price,
  token,
}: Props) {
  const router = useRouter();
  const [changeBtn, setChangeBtn] = useState(false);
  const restApi =
    "https://cladethon-hosted-service.vercel.app";
  const handleAddToCart = async () => {
    if (changeBtn) {
      router.push("/cart");
      return;
    }
    const notification = toast.loading(
      "Please wait, item adding to Cart",
    );
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
    })
      .then((response) => {
        const data = response.json();

        toast.success("Item Added to cart successfully", {
          id: notification,
        });

        // console.log(data);
        setTimeout(() => {
          // router.push("/cart");
          // window.location.reload();
          setChangeBtn(true);
          console.log("hi");
        }, 2000);
        return data;
      })
      .then((data) => {
        localStorage.setItem("cart", data.carts.length);
        console.log(data);
      });
  };
  return (
    <button
      onClick={handleAddToCart}
      disabled={!token}
      className='bg-[#ff3e6c] hover:bg-[#ff3e61] disabled:cursor-not-allowed disabled:bg-red-400 flex items-center my-4 justify-center space-x-2 border w-full rounded-sm font-semibold uppercase border-[#ff3e6c] px-8 py-3 text-white'>
      <ShoppingBagIcon className='w-6 h-6' />
      <span className='transition-all duration-200 ease-out'>
        {changeBtn ? "Go To Cart" : "Add to Cart"}
      </span>
    </button>
  );
}

export default AddToCart;
