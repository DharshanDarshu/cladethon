"use client";

import React, { useRef, useState } from "react";
import Image from "next/image";
import { XMarkIcon } from "@heroicons/react/24/solid";

function Customer() {
  const imageRef = useRef<any>(null);
  const [file, setFile] = useState<File | null>(null);

  const handleChangeImage = (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    if (e.target.files && e.target.files.length > 0) {
      setFile(e.target.files[0]);
    }
  };

  const removeSelectedImage = () => {
    setFile(null);
    if (imageRef.current) {
      imageRef.current.value = null;
    }
  };

  return (
    <form className='w-[400px] bg-white px-8 py-3'>
      <h1 className='text-xl font-semibold'>
        Customer Suggestion
      </h1>
      <div className='flex flex-col space-y-2 mb-2 mt-4'>
        <label
          htmlFor='file_input'
          className='block mb-2 text-sm font-medium'>
          Image
        </label>
        <input
          accept='image/*'
          type='file'
          ref={imageRef}
          onChange={handleChangeImage}
          id='file_input'
          className='border border-stone-400 text-black rounded-full text-sm text-grey-500
            file:mr-5 file:py-2 file:px-6
            file:rounded-full file:border-0
            file:text-sm file:font-medium
            file:bg-gray-200 file:text-stone-800
            hover:file:cursor-pointer hover:file:bg-amber-50
            hover:file:text-amber-700'
        />
        {file && (
          <div className='relative'>
            <Image
              className='mt-4 w-full'
              src={URL.createObjectURL(file)}
              width={800}
              height={800}
              alt='Thumb'
            />
            <button
              onClick={removeSelectedImage}
              className='absolute top-0 right-0 flex items-center justify-center bg-black rounded-full w-6 h-6 text-white py-1'>
              <XMarkIcon className='w-5 h-5' />
            </button>
          </div>
        )}

        <div className='flex flex-col space-y-1 mb-3'>
          <label
            htmlFor=''
            className='block mb-1 text-sm font-medium'>
            Add Description
          </label>

          <textarea
            name=''
            id=''
            cols={10}
            className='border border-gray-300 px-2 py-[3px] rounded-sm outline-none placeholder:text-sm'
            rows={5}></textarea>
        </div>
      </div>
      <button className='bg-green-400 px-8 py-1 mt-4 text-white'>
        Submit
      </button>
    </form>
  );
}

export default Customer;
