import { CheckCircleIcon } from "@heroicons/react/24/solid";
import Link from "next/link";

type Props = {
  order: {
    _id: string;
    image: string;
    title: string;
    price: string;
    productId: string;
    items: number;
    order_date: string;
  };
};

function Order({ order }: Props) {
  return (
    <Link
      href={`/order/${order._id}`}
      className='border-b flex space-x-6 py-2 px-6'>
      <img
        className='h-[200px]'
        src={`${process.env.RESTFUL_API}/image/${order.image}`}
        alt=''
      />
      <div className='flex-1 flex flex-col'>
        <h2 className='capitalize text-2xl text-gray-900'>
          {order.title}
        </h2>
        <p className='text-sm text-gray-600 mt-1'>
          Price: Rs {order.price}
        </p>
        <p className='flex-1 text-sm text-gray-600'>
          Order Date: {order.order_date.split("T")[0]}
        </p>
        <h3 className='text-xl'>
          Total:{" "}
          <span className='text-lg text-gray-800'>
            {" "}
            {order.price} * {order.items}
          </span>{" "}
          ={" "}
          <span className='font-semibold'>
            Rs {+order.price * order.items}.00
          </span>
        </h3>
      </div>
      <div className='px-8 flex flex-col space-y-1 justify-center items-center'>
        <CheckCircleIcon className='w-12 h-12 text-green-600' />
        <p className='font-semibold'>Order Placed</p>
      </div>
    </Link>
  );
}

export default Order;
