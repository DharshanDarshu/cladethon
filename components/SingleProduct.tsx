import { StarIcon } from "@heroicons/react/24/solid";
import { cookies } from "next/headers";
import Link from "next/link";
import { use } from "react";
import AddToCart from "./AddToCart";
import AddWishList from "./AddWishList";
import Ratings from "./Ratings";
import Image from "next/image";
import Pincode from "./Pincode";

type Props = {
  product: {
    _id: string;
    image: string;
    title: string;
    description: string;
    price: number;
    brand: string;
    offer_details: string;
    ratings: [];
  };
};

const getWishlist = async (token: string) => {
  const response = await fetch(
    `${process.env.RESTFUL_API}/wishlist`,
    {
      headers: {
        Authorization: "Bearer " + token,
      },
    },
  );

  const data = await response.json();
  return data.wishlists;
};

function SingleProduct({ product }: Props) {
  const nextCookies = cookies();
  const accesstoken = nextCookies.get("access_token");
  const user =
    accesstoken && JSON.parse(accesstoken?.value);
  const random = +product?.offer_details / 100;
  const discountPrice = Math.floor(product?.price * random);
  const discount = product?.offer_details;
  const wishlists = use(getWishlist(user));
  let rating = 0;
  product.ratings.map((rate: any) => {
    rating += rate.rating;
  });
  const averageRating =
    Math.floor(rating / product.ratings.length) || 1;
  return (
    <div>
      <div className='px-4 md:px-8 my-4 lg:my-12 flex flex-col lg:flex-row'>
        <div className='w-1/2'>
          <Image
            className='w-full'
            width={800}
            height={800}
            unoptimized={true}
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
          <div className='flex items-center space-x-2'>
            <div className='flex items-center space-x-1 mt-2 mb-3'>
              {new Array(averageRating)
                .fill("")
                .map((_, i) => (
                  <StarIcon
                    key={i}
                    className='w-5 h-5 text-yellow-500'
                  />
                ))}
            </div>
            <div>
              <p className='text-sm text-gray-500'>
                {product.ratings.length} global ratings
              </p>
            </div>
          </div>
          <div className='border border-gray-100' />
          <div className='flex items-center space-x-3'>
            <h2 className='my-2 text-2xl text-gray-700 font-bold'>
              Rs. {product?.price - discountPrice}
            </h2>
            <p className='text-gray-500 text-lg line-through'>
              MRP Rs. {product?.price}
            </p>
            <p className='text-orange-600 text-lg'>{`( ${discount}% OFF )`}</p>
          </div>
          <div className='flex flex-col md:flex-row justify-between items-center md:space-x-8 md:w-3/4'>
            <AddToCart
              title={product.title}
              productId={product._id}
              image={product.image}
              price={discountPrice}
              token={user}
            />

            <AddWishList
              title={product.title}
              productId={product._id}
              image={product.image}
              price={product.price}
              token={user}
              wishlist={wishlists}
            />
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
          <Pincode />
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
      {product.ratings.length > 0 && (
        <Ratings
          product={product}
          averageRating={averageRating}
        />
      )}
    </div>
  );
}

export default SingleProduct;
