"use client";

import { useState, FormEvent } from "react";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";

type Props = {
  id: string;
  token: string;
};

function RatingInput({ id, token }: Props) {
  const [rating, setRating] = useState("1");
  const router = useRouter();
  const [comment, setComment] = useState("");
  const restApi = "http://localhost:4000";

  const handleRatingSubmit = async (
    e: FormEvent<HTMLFormElement>,
  ) => {
    e.preventDefault();
    console.log(rating, comment);

    const notification = toast.loading(
      "Please wait, your rating is getting updated",
    );

    const response = await fetch(
      `${restApi}/products/${id}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
        body: JSON.stringify({
          rating,
          comment,
        }),
      },
    );

    const data = await response.json();
    toast.success("thank you for reviewing the product", {
      id: notification,
    });

    setTimeout(() => {
      router.push(`/product/${id}`);
    }, 1000);
    console.log(data);
  };

  return (
    <div>
      <form onSubmit={handleRatingSubmit}>
        <div className='flex space-x-2'>
          <div className='flex flex-col w-1/4'>
            <label
              htmlFor=''
              className='font-semibold'>
              Ratings
            </label>
            <select
              className='border py-1 px-2 outline-none text-sm'
              value={rating}
              onChange={(e) => setRating(e.target.value)}
              name=''
              id=''>
              <option value='1'>1 Star</option>
              <option value='2'>2 Star</option>
              <option value='3'>3 Star</option>
              <option value='4'>4 Star</option>
              <option value='5'>5 Star</option>
            </select>
          </div>
          <div className='flex flex-col w-full'>
            <label
              htmlFor=''
              className='font-semibold'>
              Comment
            </label>
            <input
              type='text'
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              className='border py-1 px-2 outline-none text-sm'
              placeholder='please enter something'
            />
          </div>
        </div>
        <button
          type='submit'
          className='hidden'></button>
      </form>
    </div>
  );
}

export default RatingInput;
