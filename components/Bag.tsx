"use client";

import { ShoppingBagIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import { useEffect, useState } from "react";
import useSWR from "swr";

type Props = {
  user: {
    email: string;
  };
  accesstoken: string;
};

const fetcher = (accesstoken: string) =>
  fetch(`http://localhost:4000/carts/`, {
    headers: {
      Authorization: "Bearer " + accesstoken,
    },
    next: {
      revalidate: 0.0001,
    },
  }).then((response) => response.json());

function Bag({ user, accesstoken }: Props) {
  const cartsDetails = useSWR(accesstoken, fetcher);

  const [carts, setCarts] = useState([]);

  useEffect(() => {
    const cartDetail = cartsDetails.data?.carts;

    if (accesstoken) {
      setCarts(cartDetail);
    }
  }, [cartsDetails.data?.carts?.length, user, accesstoken]);

  return (
    <Link
      href='/cart'
      className='relative flex flex-col items-center'>
      <ShoppingBagIcon className='w-4 h-4 md:w-5 md:h-5' />
      <p className='text-xs font-semibold md:font-bold'>
        Bag
      </p>
      {accesstoken && carts && (
        <span className='absolute -top-1 -right-1 bg-red-400 w-[14px] h-[14px] rounded-full flex items-center justify-center text-xs animate-pulse'>
          {carts?.length}
        </span>
      )}
    </Link>
  );
}

export default Bag;
