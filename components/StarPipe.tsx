"use client";

import { useState, useEffect } from "react";

type Props = {
  ratings:
    | [
        {
          rating: number;
          message: string;
        },
      ]
    | [];
  star: number;
};

function StarPipe({ ratings, star }: Props) {
  const [pipe, setPipe] = useState(0);

  useEffect(() => {
    const ratingFilter = ratings.filter(
      ({ rating }) => rating === star,
    );

    const average = Math.floor(
      (ratingFilter.length / ratings.length) * 100,
    );

    setPipe(average);
  }, []);

  console.log(pipe);
  // const precentage = `${average}%`;

  return (
    <div className='flex items-center space-x-2'>
      <p className='text-sm'>{star} star</p>
      <div className='w-52 h-6 bg-gray-100 rounded-md'>
        {pipe > 0 && (
          <div className={`max-w-[${pipe}%]`}>
            <div
              className={` w-full h-6 rounded-l-md ${
                pipe === 100 && "rounded-r-md"
              } border border-orange-600 bg-yellow-400`}
            />
          </div>
        )}
      </div>
      <p className='text-sm text-gary-700'>
        {pipe}
        {pipe > 0 ? "%" : ""}
      </p>
    </div>
  );
}

export default StarPipe;
