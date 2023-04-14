"use client";
import Checkout from "./Checkout";
import { useState } from "react";

type Props = {
  totalAmount: number;
  carts: [
    {
      _id: string;
      title: string;
      productId: string;
      image: string;
      price: number;
      items: number;
    },
  ];
};

function TotalAmount({ totalAmount, carts }: Props) {
  console.log(totalAmount);
  const [delivery, setDelivery] = useState(50);
  const total = totalAmount + delivery;
  console.log(total);
  return (
    <div className='md:w-[400px] px-4 py-2 bg-gray-100 flex flex-col h-[200px] lg:mr-1'>
      <h1 className='text-2xl'>Total Amount</h1>
      <p className='text-lg text-gray-800 -mt-1'>
        Rs. {totalAmount}
      </p>
      <p className='text-sm -mt-1 flex-1'>
        Delivery: Rs {delivery}
      </p>
      <select
        className='mb-2 outline-none p-1 px-2'
        value={delivery}
        onChange={(e) => setDelivery(+e.target.value)}>
        <option value={300}>Emergency</option>
        <option value={50}>Normal</option>
        <option value={0}>
          Free Delivery with out time constraint
        </option>
      </select>
      <Checkout
        item={carts}
        totalAmount={total}
      />
    </div>
  );
}

export default TotalAmount;
