"use client";
import { XMarkIcon } from "@heroicons/react/24/solid";
import Image from "next/image";
import axios from "axios";
import { useState, FormEvent, useRef } from "react";

function AddCategoryForm() {
  const [categoryFile, setCategoryFile] =
    useState<File | null>(null);
  const [file, setFile] = useState<File | null>(null);
  const [category, setCategory] = useState("");
  const [id, setId] = useState("");
  const [disabled, setDisabled] = useState(false);
  const [subValue, setSubValue] = useState("");
  const [subcategory, setSubcategory] = useState<string[]>(
    [],
  );
  const categoryImageRef = useRef<any>(null);
  const imageRef = useRef<any>(null);

  const restApi =
    "https://cladethon-hosted-service.vercel.app";

  const handleChangeCategoryImage = (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    if (e.target.files && e.target.files.length > 0) {
      setCategoryFile(e.target.files[0]);
    }
  };

  const handleChangeImage = (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    if (e.target.files && e.target.files.length > 0) {
      setFile(e.target.files[0]);
    }
  };

  const removeSelectedImage = () => {
    setCategoryFile(null);
    if (categoryImageRef.current) {
      categoryImageRef.current.value = null;
    }
  };

  const removeImage = () => {
    setFile(null);
    if (imageRef.current) {
      imageRef.current.value = null;
    }
  };

  const createCategory = async (
    e: FormEvent<HTMLFormElement>,
  ) => {
    e.preventDefault();

    if (!category) {
      return;
    }

    if (!categoryFile) {
      return;
    }

    const formData = new FormData();
    formData.append("image", categoryFile);

    setDisabled(true);

    try {
      const config = {
        headers: {
          Accept: "application/json",
          "Content-Type": "multipart/form-data",
        },
      };

      const imageResponse = await axios.post(
        `${restApi}/upload`,
        formData,
        config,
      );

      const response = await fetch(`${restApi}/category`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          category,
          image: imageResponse.data?.filename,
        }),
      });

      const data = await response.json();
      console.log(data);
      console.log(data.newCategory._id);
      setId(data.newCategory._id);
    } catch (e: any) {
      console.log(e.message);
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
        `${restApi}/upload`,
        formData,
        config,
      );

      setFile(null);
      if (imageRef.current) {
        imageRef.current.value = null;
      }

      const response = await fetch(
        `${restApi}/category/${id}`,
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
    <div className='flex flex-col'>
      <form
        className='w-[800px] px-8 pt-4 pb-6 shadow-md bg-white'
        onSubmit={createCategory}>
        <div className='flex flex-col space-y-1 mb-3'>
          <label
            htmlFor=''
            className='block mb-1 text-sm font-medium'>
            Category
          </label>
          <input
            type='text'
            value={category}
            disabled={disabled}
            onChange={(e) => setCategory(e.target.value)}
            className='border border-gray-300 px-2 py-[3px] disabled:bg-gray-300 disabled:cursor-not-allowed rounded-sm outline-none placeholder:text-sm'
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
            disabled={disabled}
            ref={categoryImageRef}
            onChange={handleChangeCategoryImage}
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
        {categoryFile && (
          <div className='relative'>
            <Image
              className='mt-4 w-full'
              src={URL.createObjectURL(categoryFile)}
              width={800}
              height={800}
              alt='Thumb'
            />
            {!disabled && (
              <button
                onClick={removeSelectedImage}
                className='absolute top-0 right-0 flex items-center justify-center bg-black rounded-full w-6 h-6 text-white py-1'>
                <XMarkIcon className='w-5 h-5' />
              </button>
            )}
          </div>
        )}
        {!disabled && <button type='submit'>Create</button>}
      </form>
      {disabled && (
        <form
          className='w-[800px] px-8 pt-4 pb-6 shadow-md bg-white mt-2'
          onSubmit={updateSubCategory}>
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
                onChange={(e) =>
                  setSubValue(e.target.value)
                }
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
          <button type='submit'>Create</button>

          <div>
            {subcategory.map((category) => (
              <p key={category}>{category}</p>
            ))}
          </div>
        </form>
      )}
    </div>
  );
}

export default AddCategoryForm;
