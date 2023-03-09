import { cookies } from "next/headers";
import React from "react";
import Order from "../../components/Order";

async function OrderPage() {
  const newCookies = cookies();
  const cookie = newCookies.get("user");
  const user = cookie && JSON.parse(cookie?.value);
  const orderRes = await fetch(
    `${process.env.RESTFUL_API}/orders/${user.email}`,
  );

  const orders = await orderRes.json();

  return (
    <div className='mt-6'>
      <h1 className='px-6 text-3xl font-semibold text-gray-800 mb-6'>
        My Order
      </h1>
      {orders.orders.map((order: any) => (
        <Order order={order} />
      ))}
    </div>
  );
}

export default OrderPage;
