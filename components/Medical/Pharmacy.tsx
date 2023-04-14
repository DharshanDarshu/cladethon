"use client";

import { XMarkIcon } from "@heroicons/react/24/outline";
import Image from "next/image";
import React, {
  useRef,
  useState,
  FormEvent,
  ChangeEvent,
} from "react";

function Pharmacy() {
  const [file, setFile] = useState<File | null>(null);
  const [pincode, setPincode] = useState("");
  const [address, setAddress] = useState<any>("");
  const [description, setDescription] = useState("");
  const [uploadErr, setUploadErr] = useState("");
  const [err, setErr] = useState("");
  const [addressInput, setAddressInput] = useState("");
  const imageRef = useRef<any>(null);

  const handlePinChange = (
    e: ChangeEvent<HTMLInputElement>,
  ) => {
    setPincode(e.target.value);
    setAddress("");
    setErr("");
  };

  const handleChangeImage = (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    if (e.target.files && e.target.files.length > 0) {
      setFile(e.target.files[0]);
    }
  };

  const handleCheck = async (
    e: FormEvent<HTMLFormElement>,
  ) => {
    e.preventDefault();
    if (pincode.length !== 6) {
      return;
    }

    const pincodeCheck = Number(pincode);

    if (!pincodeCheck) {
      setErr("Enter valid pin code");
      return;
    }

    const response = await fetch(
      `https://api.postalpincode.in/pincode/${pincode}`,
    );
    const data = await response.json();
    if (data[0].Status === "Error") {
      return setErr(data[0].Message);
    }

    setAddress(data[0]);

    console.log(data);
  };

  const removeSelectedImage = () => {
    setFile(null);
    if (imageRef.current) {
      imageRef.current.value = null;
    }
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!addressInput) {
      return setUploadErr("please enter address");
    }
    if (file || description) {
      console.log("hi");
      return;
    }

    setUploadErr("please upload image or add description");
  };

  return (
    <form
      className='w-[400px] bg-white shadow-md px-8 py-4'
      onSubmit={!address ? handleCheck : handleSubmit}>
      <h1 className='text-2xl mb-3 capitalize'>Pharmacy</h1>
      {uploadErr && (
        <p className='text-rose-500 text-sm -mt-2 pb-1'>
          {uploadErr}
        </p>
      )}
      <div className='flex flex-col space-y-2 mb-2'>
        <label
          className='block text-sm font-medium'
          htmlFor='file_input'>
          Upload an Image
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
              className='mt-4 w-full h-[100px] '
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
      </div>
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
      <div className='flex flex-col space-y-1 mb-3'>
        <label
          htmlFor=''
          className='block mb-1 text-sm font-medium'>
          Pin Code
        </label>
        <div className='flex items-center border border-gray-300 px-2 py-[3px] rounded-sm outline-none placeholder:text-sm'>
          <input
            type='text'
            name=''
            disabled={address ? true : false}
            value={pincode}
            onChange={handlePinChange}
            className='flex-1 outline-none disabled:cursor-not-allowed'
            id=''
          />
          <button
            type='submit'
            className='text-gray-600 text-sm hover:text-red-500'>
            Check
          </button>
        </div>
      </div>
      {address && (
        <p className='text-green-500 text-sm -mt-2 pb-1'>
          {`${address?.PostOffice[0].Block} - ${address?.PostOffice[0].District} -
          ${address?.PostOffice[0].State}`}
        </p>
      )}
      {err && (
        <p className='text-rose-500 text-sm -mt-2 pb-1'>
          {err}
        </p>
      )}
      <div className='flex flex-col space-y-1 mb-3'>
        <label
          htmlFor=''
          className='block mb-1 text-sm font-medium'>
          Address
        </label>
        <textarea
          name=''
          value={addressInput}
          onChange={(e) => setAddressInput(e.target.value)}
          disabled={!address ? true : false}
          className='border border-gray-300 px-2 py-[3px] rounded-sm outline-none placeholder:text-sm disabled:cursor-not-allowed'
          id=''
          cols={30}
          rows={2}></textarea>
      </div>
      <button
        type='submit'
        disabled={!address ? true : false}
        className='bg-green-500 mt-6 mb-2 px-6 text-white py-1 disabled:cursor-not-allowed disabled:bg-gray-600'>
        Order
      </button>
    </form>
  );
}

export default Pharmacy;
