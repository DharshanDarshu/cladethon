"use client";

import { XMarkIcon } from "@heroicons/react/24/solid";
import axios from "axios";
import Image from "next/image";
import { FormEvent, useRef, useState } from "react";

type Props = {
  id: string;
};

function UpdateCategory({ id }: Props) {
  const [file, setFile] = useState<File | null>(null);
  const [subValue, setSubValue] = useState("");
  const [subcategory, setSubcategory] = useState<string[]>(
    [],
  );
  const imageRef = useRef<any>(null);

  const handleChangeImage = (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    if (e.target.files && e.target.files.length > 0) {
      setFile(e.target.files[0]);
    }
  };

  const removeImage = () => {
    setFile(null);
    if (imageRef.current) {
      imageRef.current.value = null;
    }
  };

  const updateSubCategory = async (
    e: FormEvent<HTMLFormElement>,
  ) => {
    e.preventDefault();

    if (!file) {
      return;
    }

    if (!subValue) {
      return;
    }

    const formData = new FormData();
    formData.append("image", file);

    subcategory.push(subValue);
    setSubcategory(subcategory);
    setSubValue("");

    try {
      const config = {
        headers: {
          Accept: "application/json",
          "Content-Type": "multipart/form-data",
        },
      };

      const imageResponse = await axios.post(
        "http://localhost:4000/upload",
        formData,
        config,
      );

      setFile(null);
      if (imageRef.current) {
        imageRef.current.value = null;
      }

      const response = await fetch(
        `http://localhost:4000/category/${id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: subValue,
            image: imageResponse.data?.filename,
          }),
        },
      );

      const data = await response.json();

      console.log(data);
    } catch (e: any) {
      console.log(e.message);
    }
  };
  return (
    <form
      className='w-[800px] px-8 pt-4 pb-6 shadow-md bg-white mt-2'
      onSubmit={updateSubCategory}>
      <button type='submit'>Create</button>

      <div className='flex flex-col space-y-1 mb-3'>
        <label
          htmlFor=''
          className='block mb-1 text-sm font-medium'>
          Sub Category
        </label>
        <div className='flex w-full'>
          <input
            type='text'
            value={subValue}
            onChange={(e) => setSubValue(e.target.value)}
            className='border border-gray-300 flex-1 px-2 py-[3px] rounded-sm outline-none placeholder:text-sm'
            placeholder='Enter the category'
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
            hover:file:text-amber-700 disabled:bg-gray-300 disabled:cursor-not-allowed'
          />
        </div>
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
            onClick={removeImage}
            className='absolute top-0 right-0 flex items-center justify-center bg-black rounded-full w-6 h-6 text-white py-1'>
            <XMarkIcon className='w-5 h-5' />
          </button>
        </div>
      )}

      <div>
        {subcategory.map((category) => (
          <p key={category}>{category}</p>
        ))}
      </div>
    </form>
  );
}

export default UpdateCategory;
