"use client";

import Image from "next/image";
import { XMarkIcon } from "@heroicons/react/24/solid";
import axios from "axios";
import React, { useRef, useState } from "react";

function AddForm() {
  const [file, setFile] = useState<File | null>(null);
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState(0);
  const [brand, setBrand] = useState("");
  const [category, setCategory] = useState("");
  const [subcategory, setSubcategory] = useState("");
  const [offer, setOffer] = useState("");
  const [description, setDescription] = useState("");
  const imageRef = useRef<any>(null);

  // const restApi =
  //   "https://cladethon-hosted-service.vercel.app";
  const restApi = "http://localhost:4000";

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

  const createProduct = async (
    e: React.FormEvent<HTMLFormElement>,
  ) => {
    e.preventDefault();

    if (!file) {
      return;
    }

    const formData = new FormData();
    formData.append("image", file);

    try {
      const config = {
        headers: {
          Accept: "application/json",
          "Content-Type": "multipart/form-data",
        },
      };

      const response = await axios.post(
        `${restApi}/upload`,
        formData,
        config,
      );

      console.log(response);
      const movie = await fetch(`${restApi}/products`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title,
          price,
          description,
          category,
          subcategory,
          image: response.data?.filename,
          brand,
          offer_details: offer,
        }),
      });

      const data = await movie.json();

      console.log(data);
    } catch (e: any) {
      console.log(e.message);
    }
  };

  return (
    <form
      className='w-[800px] px-8 pt-4 pb-6 shadow-md bg-white'
      onSubmit={createProduct}>
      <h1 className='text-2xl mb-3 capitalize'>
        Add Product
      </h1>

      <div className='flex flex-col space-y-1 mb-3'>
        <label
          htmlFor='file_input'
          className='block mb-1 text-sm font-medium'>
          Title
        </label>
        <input
          type='text'
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder='Enter the title'
          className='border border-gray-300 px-2 py-[3px] rounded-sm outline-none placeholder:text-sm'
        />
      </div>

      <div className='flex flex-col space-y-1 mb-3'>
        <label
          htmlFor='file_input'
          className='block mb-1 text-sm font-medium'>
          Price
        </label>
        <input
          type='number'
          value={price}
          onChange={(e) => setPrice(+e.target.value)}
          placeholder='Enter the Price'
          className='border border-gray-300 px-2 py-[3px] rounded-sm outline-none placeholder:text-sm'
        />
      </div>

      <div className='flex flex-col space-y-1 mb-3'>
        <label
          htmlFor='file_input'
          className='block mb-1 text-sm font-medium'>
          Brand
        </label>
        <input
          type='text'
          value={brand}
          onChange={(e) => setBrand(e.target.value)}
          placeholder='Enter the Brand'
          className='border border-gray-300 px-2 py-[3px] outline-none rounded-sm placeholder:text-sm'
        />
      </div>

      <div className='flex flex-col space-y-1 mb-3'>
        <label
          htmlFor='file_input'
          className='block mb-1 text-sm font-medium'>
          Category
        </label>
        <input
          type='text'
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          placeholder='Enter the Category'
          className='border border-gray-300 px-2 py-[3px] rounded-sm outline-none placeholder:text-sm'
        />
      </div>

      <div className='flex flex-col space-y-1 mb-3'>
        <label
          htmlFor='file_input'
          className='block mb-1 text-sm font-medium'>
          Sub Category
        </label>
        <input
          type='text'
          value={subcategory}
          onChange={(e) => setSubcategory(e.target.value)}
          placeholder='Enter the Sub Category'
          className='border border-gray-300 px-2 py-[3px] rounded-sm outline-none placeholder:text-sm'
        />
      </div>

      <div className='flex flex-col space-y-1 mb-3'>
        <label
          htmlFor='file_input'
          className='block mb-1 text-sm font-medium'>
          Offer
        </label>
        <input
          type='text'
          value={offer}
          onChange={(e) => setOffer(e.target.value)}
          placeholder='Enter the Offer'
          className='border border-gray-300 px-2 py-[3px] rounded-sm outline-none placeholder:text-sm'
        />
      </div>

      <div className='flex flex-col space-y-1 mb-3'>
        <label
          htmlFor='file_input'
          className='block mb-1 text-sm font-medium'>
          Description
        </label>
        <input
          type='text'
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder='Enter the Description'
          className='border border-gray-300 px-2 py-[3px] rounded-sm outline-none placeholder:text-sm'
        />
      </div>

      <div className='flex flex-col space-y-2 mb-2'>
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
      </div>
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

      <button type='submit'>Create</button>
    </form>
  );
}

export default AddForm;
