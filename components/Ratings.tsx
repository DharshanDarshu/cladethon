import { StarIcon } from "@heroicons/react/24/solid";
import React from "react";
import Rating from "./Rating";
import StarPipe from "./StarPipe";

type Props = {
  product: {
    ratings:
      | [
          {
            user: {
              firstname: string;
              lastname: string;
              email: string;
            };
            rating: number;
            message: string;
          },
        ]
      | [];
  };
  averageRating: number;
};

function Ratings({ product, averageRating }: Props) {
  return (
    <div className='flex px-10 space-x-16'>
      <div>
        <h1 className='text-gray-900 font-semibold text-xl'>
          Customers Reviews
        </h1>
        <div className='flex space-x-1'>
          {new Array(averageRating).fill("").map((_, i) => (
            <StarIcon
              key={i}
              className='w-5 h-5 text-yellow-400'
            />
          ))}
        </div>
        <p className='text-sm text-gray-600 mt-2'>
          {product.ratings.length} global ratings
        </p>
        <div className='flex flex-col space-y-2 my-4'>
          <StarPipe
            ratings={product.ratings}
            star={5}
          />
          <StarPipe
            ratings={product.ratings}
            star={4}
          />
          <StarPipe
            ratings={product.ratings}
            star={3}
          />
          <StarPipe
            ratings={product.ratings}
            star={2}
          />
          <StarPipe
            ratings={product.ratings}
            star={1}
          />
        </div>
      </div>
      <div className='flex-1'>
        <h1 className='text-xl text-gray-800 font-semibold'>
          Reviews
        </h1>
        {product.ratings.map((rating: any) => (
          <Rating
            key={rating._id}
            rating={rating}
          />
        ))}
      </div>
    </div>
  );
}

export default Ratings;
