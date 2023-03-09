import { CheckIcon } from "@heroicons/react/24/solid";
import { cookies } from "next/headers";
import Link from "next/link";
import React from "react";

function Success() {
  const nextCookies = cookies();
  const token = nextCookies.get("user");
  const user = token && JSON.parse(token?.value);
  console.log(user);
  if (user) {
    fetch(`http://localhost:4000/carts/${user.email}`)
      .then((res) => res.json())
      .then((data) => {
        data.carts.map((cart: any) => {
          fetch("http://localhost:4000/orders", {
            method: "PATCH",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              email: user.email,
              product: cart,
            }),
          })
            .then((res) => res.json())
            .then((data) => console.log(data));
        });
      });

    // const cart = await cartRes.json();

    // console.log(cart.carts);

    fetch("http://localhost:4000/carts/empty", {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: user.email,
      }),
    })
      .then((res) => res.json())
      .then((data) => console.log(data));
  }

  return (
    <>
      {user && (
        <div className='shadow-lg w-[400px] flex px-6 flex-col items-center justify-center py-4 bg-gray-100/30'>
          <CheckIcon className='w-12 h-12 bg-green-600 text-white rounded-full p-2' />
          <p className='font-semibold text-gray-900'>
            Your Order Successfully Placed
          </p>
          <div className='text-center text-gray-700 text-sm mt-[7px]'>
            <p className='capitalize'>{`name: ${user?.firstname} ${user?.lastname}`}</p>
            <p className=''>{`email: ${user?.email}`}</p>
            <p className='text-center text-gray-700 text-sm'>
              Shipping Address:{" "}
              <span>{`${user?.billingAddress?.street}, ${user?.billingAddress?.city}, ${user?.billingAddress?.state} pincode: ${user?.billingAddress?.zipcode}`}</span>
            </p>
          </div>
          <Link
            href='/order'
            className='bg-orange-500 text-center w-full py-2 mt-8 text-white'>
            Go To My Order
          </Link>
        </div>
      )}
    </>
  );
}

export default Success;
