"use client";

import { useState } from "react";
import WishList from "./WishList";

type Props = {
  token: string;
  wishlist: any;
};

function WishLists({ token, wishlist }: Props) {
  const [wishlists, setWishlists] = useState(
    wishlist.wishlists,
  );
  const handleAddToCart = (id: any) => {
    console.log(id);
    const data = wishlists.filter(
      (list: any) => list.productId !== id,
    );
    setWishlists(data);
  };
  return (
    <div className='grid grid-cols-5 px-8 my-6'>
      {wishlists.map((list: any) => (
        <WishList
          key={list._id}
          image={list.image}
          title={list.title}
          price={list.price}
          productId={list.productId}
          onAddToCart={handleAddToCart}
          token={token}
        />
      ))}
    </div>
  );
}

export default WishLists;
