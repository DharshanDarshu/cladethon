"use client";

import { useRouter } from "next/navigation";
import { FormEvent, useState, useEffect } from "react";
import { useCookies } from "react-cookie";
import { toast } from "react-hot-toast";

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
  const [cookie, setCookie] = useCookies([
    "user",
    "access_token",
    "refresh_token",
  ]);
  useEffect(() => {
    if (!email) {
      router.replace("/auth/signup/verifyemail");
    }
  }, [email]);

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

    const notification = toast.loading(
      "Please wait, you account is in verification mode",
    );

    const authorization = await fetch(
      `http://localhost:4000/user/signup`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formdata),
      },
    );

    const authData = await authorization.json();
    console.log(authData);

    if (authorization.status === 200) {
      toast.success("verification successful", {
        id: notification,
      });

      const cartResponse = await fetch(
        `http://localhost:4000/carts`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: decryptedEmail,
          }),
        },
      );

      const cart = await cartResponse.json();

      const orderRes = await fetch(
        `http://localhost:4000/orders`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: decryptedEmail,
          }),
        },
      );

      setCookie("user", JSON.stringify(authData.user), {
        path: "/",
        maxAge: 3600, // Expires after 1hr
        sameSite: true,
      });
      setCookie(
        "access_token",
        JSON.stringify(authData.accessToken),
        {
          path: "/",
          maxAge: 3600, // Expires after 1hr
          sameSite: true,
        },
      );
      setCookie(
        "refresh_token",
        JSON.stringify(authData.refreshToken),
        {
          path: "/",
          maxAge: 3600, // Expires after 1hr
          sameSite: true,
        },
      );

      const order = await orderRes.json();
      router.replace("/");
      return;
    }
    toast.error("something went", {
      id: notification,
    });
  };
  return (
    <div className='overflow-hidden h-[calc(100vh-80px)]'>
      <img
        className='h-[calc(100vh-70px)] w-screen object-cover'
        src='https://images.unsplash.com/photo-1483985988355-763728e1935b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80'
        alt=''
      />
      {email && (
        <div className='absolute top-20 w-screen flex items-center justify-center h-[calc(100vh-90px)]'>
          <form
            onSubmit={handleLogin}
            className=' bg-white shadow-lg w-[320px] lg:w-[600px] px-8 py-4'>
            <h1 className='text-2xl font-semibold uppercase mb-4 text-center '>
              Sign Up
            </h1>
            <div className='flex space-x-2 w-full'>
              <div className='flex flex-col w-full'>
                <label
                  htmlFor='firstName'
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
                  id='firstName'
                  className='border mt-[6px] w-full mb-[10px] px-2 py-[5px] outline-none text-sm'
                  placeholder='Enter First Name'
                />
              </div>
              <div className='flex flex-col w-3/4'>
                <label
                  htmlFor='lastName'
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
                  id='lastName'
                  className='border mt-[6px] w-full mb-[10px] px-2 py-[5px] outline-none text-sm'
                  placeholder='Enter Last Name'
                />
              </div>
            </div>
            <div className='flex flex-col'>
              <label
                htmlFor='email'
                className='font-semibold'>
                Email
              </label>
              <input
                type='email'
                name=''
                value={decryptedEmail}
                disabled
                id='email'
                className='border mt-[6px] mb-[10px] px-2 py-[5px] outline-none text-sm disabled:bg-gray-300 disabled:cursor-not-allowed'
                placeholder='Enter email'
              />
            </div>
            <div className='flex flex-col'>
              <label
                htmlFor='phone'
                className='font-semibold'>
                Phone
              </label>
              <input
                type='number'
                name=''
                value={phone}
                onChange={(e) => setPhone(+e.target.value)}
                id='phone'
                className='border mt-[6px] mb-[10px] px-2 py-[5px] outline-none text-sm'
                placeholder='Enter Phone Number'
              />
            </div>
            <div className='flex flex-col'>
              <label
                htmlFor='password'
                className='font-semibold'>
                Password
              </label>
              <input
                type='password'
                name=''
                id='password'
                value={password}
                onChange={(e) =>
                  setPassword(e.target.value)
                }
                className='border mt-[6px] mb-[10px] px-2 py-[5px] outline-none text-sm'
                placeholder='Enter Password'
              />
            </div>
            <div className='flex space-x-2'>
              <div>
                <label
                  htmlFor='state'
                  className='font-semibold'>
                  State
                </label>
                <input
                  type='text'
                  name=''
                  id='state'
                  value={state}
                  onChange={(e) => setState(e.target.value)}
                  className='border mt-[6px] mb-[10px] w-full px-2 py-[5px] outline-none text-sm'
                  placeholder='Enter State'
                />
              </div>
              <div>
                <label
                  htmlFor='city'
                  className='font-semibold'>
                  City
                </label>
                <input
                  type='text'
                  name=''
                  id='city'
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  className='border mt-[6px] mb-[10px] w-full px-2 py-[5px] outline-none text-sm'
                  placeholder='Enter City'
                />
              </div>
              <div>
                <label
                  htmlFor='street'
                  className='font-semibold'>
                  Street
                </label>
                <input
                  type='text'
                  name=''
                  id='street'
                  value={street}
                  onChange={(e) =>
                    setStreet(e.target.value)
                  }
                  className='border mt-[6px] mb-[10px] w-full px-2 py-[5px] outline-none text-sm'
                  placeholder='Enter Street'
                />
              </div>
              <div>
                <label
                  htmlFor='zipcode'
                  className='font-semibold'>
                  Zipcode
                </label>
                <input
                  type='number'
                  name=''
                  id='zipcode'
                  value={zipcode}
                  onChange={(e) =>
                    setZipCode(+e.target.value)
                  }
                  className='border mt-[6px] mb-[10px] w-full px-2 py-[5px] outline-none text-sm'
                  placeholder='Enter Zipcode'
                />
              </div>
            </div>
            <div className='flex space-x-2'></div>
            <button
              type='submit'
              className='bg-green-800 px-8 py-1 mt-3 text-white text-sm lg:text-md'>
              Create
            </button>
          </form>
        </div>
      )}
    </div>
  );
}

export default Signup;
