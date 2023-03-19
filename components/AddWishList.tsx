"use client";

import BlackWishList from "./BlackWishList";
import { useState } from "react";
import RedWishList from "./RedWishList";

type Props = {
  title: string;
  image: string;
  productId: string;
  price: number;
  token: string;
  wishlist: any;
};

function AddWishList({
  token,
  title,
  image,
  productId,
  price,
  wishlist,
}: Props) {
  const index = wishlist.findIndex(
    (list: any) => list.productId === productId,
  );
  const [add, setAdd] = useState(
    index === -1 ? false : true,
  );
  const restApi =
    "https://cladethon-hosted-service.vercel.app";
  const handleAddWishlist = async () => {
    const updatedData = {
      title,
      image,
      productId,
      price,
    };
    if (add) {
      return;
    }
    const response = await fetch(`${restApi}/wishlist`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
      body: JSON.stringify(updatedData),
    });
    if (response.status === 200) {
      setAdd(true);
    }
  };

  const removeWishlist = async () => {
    if (!add) {
      return;
    }
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

    if (response.status === 200) {
      setAdd(false);
    }
  };

  return (
    <button
      disabled={!token}
      onClick={!add ? handleAddWishlist : removeWishlist}
      className={`w-full bg-transparent disabled:cursor-not-allowed disabled:border-black flex items-center justify-center space-x-2 border md:w-3/4 font-semibold uppercase text-sm border-gray-300 ${
        add ? "hover:border-rose-500" : "hover:border-black"
      } rounded-sm px-8 py-3 text-black`}>
      {add ? <RedWishList /> : <BlackWishList />}
      <span
        className={`${
          add ? "text-rose-500" : "text-black"
        }`}>
        WishList
      </span>
    </button>
  );
}

export default AddWishList;
