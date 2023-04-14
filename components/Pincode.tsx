"use client";

import { useState, ChangeEvent, FormEvent } from "react";

function Pincode() {
  const [pincode, setPincode] = useState("");
  const [details, setDetails] = useState("");
  const [address, setAddress] = useState<any>("");
  const [err, setErr] = useState("");
  const handlePincodeChange = (
    e: ChangeEvent<HTMLInputElement>,
  ) => {
    setPincode(e.target.value);
    setDetails("");
    setAddress("");
    setErr("");
  };
  const handlePinCodeSubmit = async (
    e: FormEvent<HTMLFormElement>,
  ) => {
    e.preventDefault();
    if (!pincode) {
      return;
    }

    if (pincode.length !== 6) {
      setErr("Enter valid pin code");
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

    const random = Math.floor(Math.random() * 10);

    console.log(data);

    if (data[0].Status === "Error") {
      return setErr(data[0].Message);
    }

    console.log(data[0].PostOffice[0]);

    setAddress(data[0]);
    setDetails(
      `Your order will delivered in min of ${random} to ${
        random + 1
      } days`,
    );
  };
  return (
    <div className='mt-4 flex flex-col space-y-2'>
      <h1 className='uppercase font-semibold text-gray-800'>
        Check Delivery & Services
      </h1>
      <form
        className='flex border py-2 text-sm px-2 w-full border-sm'
        onSubmit={handlePinCodeSubmit}>
        <input
          type='text'
          value={pincode}
          onChange={handlePincodeChange}
          className='flex-1 w-full outline-none'
          placeholder='Enter a PIN code'
        />
        <button className='text-gray-400 text-sm font-semibold hover:text-rose-500'>
          CHECK
        </button>
      </form>
      {details && (
        <p className='text-rose-500 text-sm -pt-2'>
          {details}
        </p>
      )}
      {address && (
        <p className='text-green-500 text-sm -pt-2'>
          {`${address?.PostOffice[0].Block} - ${address?.PostOffice[0].District} -
          ${address?.PostOffice[0].State}`}
        </p>
      )}
      {err && (
        <p className='text-rose-500 text-sm -pt-2'>{err}</p>
      )}
    </div>
  );
}

export default Pincode;
