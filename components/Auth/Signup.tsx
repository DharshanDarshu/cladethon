"use client";

import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";
import { useCookies } from "react-cookie";

type Props = {
  email: string | undefined;
};

function Signup({ email }: Props) {
  const decryptedEmail = atob(email || "");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phone, setPhone] = useState<number | undefined>();
  // const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [state, setState] = useState("");
  const [city, setCity] = useState("");
  const [street, setStreet] = useState("");
  const [zipcode, setZipCode] = useState<
    number | undefined
  >();
  const router = useRouter();

  const handleLogin = async (
    e: FormEvent<HTMLFormElement>,
  ) => {
    e.preventDefault();

    const formdata = {
      firstname: firstName,
      lastname: lastName,
      email: decryptedEmail,
      password,
      phone,
      shippingAddress: {
        state,
        city,
        street,
        zipcode,
      },
    };

    const authorization = await fetch(
      `${process.env.RESTFUL_API}/user/signup`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formdata),
      },
    );

    if (authorization.status === 200) {
      const cartResponse = await fetch(
        `${process.env.RESTFUL_API}/carts`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email,
          }),
        },
      );

      const cart = await cartResponse.json();

      const orderRes = await fetch(
        `${process.env.RESTFUL_API}/orders`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email,
          }),
        },
      );

      const order = await orderRes.json();

      console.log(cart, order);
    }

    const authData = await authorization.json();
    console.log(authData);
    router.replace("/auth/login");
  };
  return (
    <div className='overflow-hidden h-[calc(100vh-80px)]'>
      <img
        className='h-[calc(100vh-70px)] w-screen object-cover'
        src='https://images.unsplash.com/photo-1483985988355-763728e1935b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80'
        alt=''
      />
      <div className='absolute top-20 w-screen flex items-center justify-center h-[calc(100vh-90px)]'>
        <form
          onSubmit={handleLogin}
          className=' bg-white shadow-lg w-[600px] px-8 py-4'>
          <h1 className='text-2xl font-semibold uppercase mb-4 text-center '>
            Sign Up
          </h1>
          <div className='flex space-x-2 w-full'>
            <div className='flex flex-col w-full'>
              <label
                htmlFor=''
                className='font-semibold'>
                First Name
              </label>
              <input
                type='type'
                name=''
                value={firstName}
                onChange={(e) =>
                  setFirstName(e.target.value)
                }
                id=''
                className='border mt-[6px] w-full mb-[10px] p-1 outline-none'
                placeholder='Enter First Name'
              />
            </div>
            <div className='flex flex-col w-3/4'>
              <label
                htmlFor=''
                className='font-semibold'>
                Last Name
              </label>
              <input
                type='type'
                name=''
                value={lastName}
                onChange={(e) =>
                  setLastName(e.target.value)
                }
                id=''
                className='border mt-[6px] w-full mb-[10px] p-1 outline-none'
                placeholder='Enter Last Name'
              />
            </div>
          </div>
          <div className='flex flex-col'>
            <label
              htmlFor=''
              className='font-semibold'>
              Email
            </label>
            <input
              type='email'
              name=''
              value={decryptedEmail}
              disabled
              id=''
              className='border mt-[6px] mb-[10px] p-1 outline-none disabled:bg-gray-300 disabled:cursor-not-allowed'
              placeholder='Enter email'
            />
          </div>
          <div className='flex flex-col'>
            <label
              htmlFor=''
              className='font-semibold'>
              Phone
            </label>
            <input
              type='number'
              name=''
              value={phone}
              onChange={(e) => setPhone(+e.target.value)}
              id=''
              className='border mt-[6px] mb-[10px] p-1 outline-none'
              placeholder='Enter Phone Number'
            />
          </div>
          <div className='flex flex-col'>
            <label
              htmlFor=''
              className='font-semibold'>
              Password
            </label>
            <input
              type='password'
              name=''
              id=''
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className='border mt-[6px] mb-[10px] p-1 outline-none'
              placeholder='Enter Password'
            />
          </div>
          <div className='flex space-x-2'>
            <div>
              <label
                htmlFor=''
                className='font-semibold'>
                State
              </label>
              <input
                type='text'
                name=''
                id=''
                value={state}
                onChange={(e) => setState(e.target.value)}
                className='border mt-[6px] mb-[10px] p-1 w-full outline-none'
                placeholder='Enter State'
              />
            </div>
            <div>
              <label
                htmlFor=''
                className='font-semibold'>
                City
              </label>
              <input
                type='text'
                name=''
                id=''
                value={city}
                onChange={(e) => setCity(e.target.value)}
                className='border mt-[6px] mb-[10px] p-1 w-full outline-none'
                placeholder='Enter City'
              />
            </div>
            <div>
              <label
                htmlFor=''
                className='font-semibold'>
                Street
              </label>
              <input
                type='text'
                name=''
                id=''
                value={street}
                onChange={(e) => setStreet(e.target.value)}
                className='border mt-[6px] mb-[10px] p-1 w-full outline-none'
                placeholder='Enter Street'
              />
            </div>
            <div>
              <label
                htmlFor=''
                className='font-semibold'>
                Zipcode
              </label>
              <input
                type='number'
                name=''
                id=''
                value={zipcode}
                onChange={(e) =>
                  setZipCode(+e.target.value)
                }
                className='border mt-[6px] mb-[10px] p-1 w-full outline-none'
                placeholder='Enter Zipcode'
              />
            </div>
          </div>
          <div className='flex space-x-2'></div>
          <button
            type='submit'
            className='bg-green-800 px-8 py-1 mt-3 text-white'>
            Create
          </button>
        </form>
      </div>
    </div>
  );
}

export default Signup;
