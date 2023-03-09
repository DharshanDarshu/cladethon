import { HeartIcon } from "@heroicons/react/24/outline";
import { StarIcon } from "@heroicons/react/24/solid";
import { cookies } from "next/headers";
import Link from "next/link";
import AddToCart from "./AddToCart";

type Props = {
  product: {
    _id: string;
    image: string;
    title: string;
    description: string;
    price: number;
    brand: string;
  };
};

function SingleProduct({ product }: Props) {
  const nextCookies = cookies();
  const token = nextCookies.get("user");
  const user = token && JSON.parse(token?.value);
  return (
    <div className='px-4 md:px-8 my-4 lg:my-12 flex flex-col lg:flex-row'>
      <div>
        <img
          className='w-full'
          src={`${process.env.RESTFUL_API}/image/${product.image}`}
          alt=''
        />
      </div>
      <div className='flex-1 mx-1 lg:mx-8 mt-4 lg:mt-0'>
        <h1 className='text-lg lg:text-xl font-semibold capitalize'>
          {product.title}
        </h1>
        <p className='text-gray-500 text-sm'>
          {product.description}
        </p>
        <div className='flex items-center space-x-1 mt-2 mb-3'>
          <StarIcon className='w-5 h-5 text-yellow-500' />
          <StarIcon className='w-5 h-5 text-yellow-500' />
          <StarIcon className='w-5 h-5 text-yellow-500' />
          <StarIcon className='w-5 h-5 text-yellow-500' />
          <StarIcon className='w-5 h-5 text-yellow-500' />
        </div>
        <div className='border border-gray-100' />
        <h2 className='my-2 text-2xl text-gray-700 font-bold'>
          Rs. {product.price}
        </h2>
        <div className='flex flex-col md:flex-row justify-between items-center md:space-x-8 md:w-3/4'>
          <AddToCart
            title={product.title}
            productId={product._id}
            image={product.image}
            price={product.price}
            user={user}
          />

          <button
            disabled={!user}
            className='w-full bg-transparent disabled:cursor-not-allowed disabled:border-black flex items-center justify-center space-x-2 border md:w-3/4 font-semibold uppercase text-sm border-gray-300 hover:border-black rounded-sm px-8 py-3 text-black'>
            <HeartIcon className='w-6 h-6 text-gray-800' />
            <span>WishList</span>
          </button>
        </div>
        {!user && (
          <p className='text-sm mt-1 md:-mt-[12px] text-gray-700'>
            Please Login to add item to the cart or
            wishlist!!!
            <Link
              href='/auth/login'
              className='ml-2 underline text-red-600'>
              Login
            </Link>
          </p>
        )}
        <div className='border border-gray-100 mt-4' />
        <div>
          <h1 className='upercase font-semibold uppercase text-gray-800 mt-4'>
            Product Details
          </h1>
          <p className='text-gray-500'>
            {product.description}
          </p>
          <h2 className='upercase font-semibold uppercase text-gray-800 mt-4'>
            Brand
          </h2>
          <p className='text-gray-500 capitalize'>
            {product.brand}
          </p>
          <h2 className='upercase font-semibold uppercase text-gray-800 mt-4'>
            Delivery Options
          </h2>
          <div className='mt-2 flex flex-col space-y-1'>
            <p className='text-gray-600 text-sm '>
              100% Original Products
            </p>
            <p className='text-gray-600 text-sm'>
              Pay on delivery might be available
            </p>
            <p className='text-gray-600 text-sm'>
              Easy 14 days returns and exchanges
            </p>
            <p className='text-gray-600 text-sm'>
              Try & Buy might be available
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SingleProduct;
