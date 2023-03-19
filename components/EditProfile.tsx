"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";
import { useCookies } from "react-cookie";

type Props = {
  user: {
    email: string;
    phone: string;
    firstname: string;
    lastname: string;
    shippingAddress: {
      state: string;
      city: string;
      street: string;
      zipcode: number;
    };
  };
  token: string;
};

function EditProfile({ user, token }: Props) {
  const [cookie, setCookie] = useCookies(["user"]);
  const [firstname, setFirstName] = useState(
    user.firstname,
  );
  const [lastname, setLastName] = useState(user.lastname);
  const [email, setEmail] = useState(user.email);
  const [phone, setPhone] = useState(user.phone);
  const [state, setState] = useState(
    user.shippingAddress.state,
  );
  const [city, setCity] = useState(
    user.shippingAddress.city,
  );
  const [street, setStreet] = useState(
    user.shippingAddress.street,
  );
  const [zipcode, setZipcode] = useState(
    user.shippingAddress.zipcode,
  );
  const router = useRouter();
  const restApi =
    "https://cladethon-hosted-service.vercel.app";

  const handleEdit = async (
    e: FormEvent<HTMLFormElement>,
  ) => {
    e.preventDefault();

    const updatedata = {
      firstname,
      lastname,
      phone,
      state,
      city,
      street,
      zipcode,
    };

    const response = await fetch(`${restApi}/user`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
      body: JSON.stringify(updatedata),
    });

    const data = await response.json();
    setCookie("user", JSON.stringify(data), {
      path: "/",
      maxAge: 3600 * 24, // Expires after 1hr
      sameSite: true,
    });

    window.location.reload();
  };

  const handleBackProfile = () => {
    router.replace("/profile");
  };
  return (
    <div className='flex flex-col px-8 py-4 bg-white max-w-[60vw] space-y-4 mx-auto h-full shadow-md'>
      <div className='flex justify-between items-center'>
        <h1 className='text-2xl text-gray-700 mt-4'>
          Edit Profile
        </h1>
        <div>
          <Link
            href='/profile/verifyemail?profile=true'
            className='text-sm text-red-400 hover:underline cursor-pointer'>
            change email
          </Link>
          <Link
            href='/profile?edit=true&changePassword=true'
            className='text-sm text-red-400 -mt-1 hover:underline cursor-pointer'>
            change password
          </Link>
        </div>
      </div>
      <form
        className='flex flex-col space-y-2'
        onSubmit={handleEdit}>
        <div className='flex items-center justify-between space-x-8'>
          <div className='w-full flex flex-col'>
            <label
              htmlFor=''
              className='font-semibold'>
              First Name
            </label>
            <input
              type='text'
              value={firstname}
              onChange={(e) => setFirstName(e.target.value)}
              className='border border-gray-300 mt-[5px] px-2 py-1 text-sm outline-none'
              placeholder='enter firstname'
            />
          </div>
          <div className='flex flex-col w-full'>
            <label
              htmlFor=''
              className='font-semibold'>
              Last Name
            </label>
            <input
              type='text'
              value={lastname}
              onChange={(e) => setLastName(e.target.value)}
              className='border border-gray-300 mt-[5px] px-2 py-1 text-sm outline-none'
              placeholder='enter lastname'
            />
          </div>
        </div>
        <div className='flex items-center justify-between space-x-8'>
          <div className='w-full flex flex-col'>
            <label
              htmlFor=''
              className='font-semibold'>
              Email
            </label>
            <input
              type='text'
              value={email}
              disabled
              onChange={(e) => setEmail(e.target.value)}
              className='border border-gray-300 mt-[5px] px-2 py-1 disabled:bg-gray-300 disabled:cursor-not-allowed text-sm outline-none'
              placeholder='enter firstname'
            />
          </div>

          <div className='flex flex-col w-full'>
            <label
              htmlFor=''
              className='font-semibold'>
              Phone
            </label>
            <input
              type='text'
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className='border border-gray-300 mt-[5px] px-2 py-1 text-sm outline-none'
              placeholder='enter lastname'
            />
          </div>
        </div>
        <div>
          <p className='text-xl mt-2'>Shipping Address</p>
          <div className='mt-2 flex items-center justify-between space-x-8'>
            <div className='w-full flex flex-col'>
              <label
                htmlFor=''
                className='font-semibold'>
                State
              </label>
              <input
                type='text'
                value={state}
                onChange={(e) => setState(e.target.value)}
                className='border border-gray-300 mt-[5px] px-2 py-1 text-sm outline-none'
                placeholder='enter state'
              />
            </div>

            <div className='flex flex-col w-full'>
              <label
                htmlFor=''
                className='font-semibold'>
                City
              </label>
              <input
                type='text'
                value={city}
                onChange={(e) => setCity(e.target.value)}
                className='border border-gray-300 mt-[5px] px-2 py-1 text-sm outline-none'
                placeholder='enter city'
              />
            </div>
          </div>
          <div className='mt-2 flex items-center justify-between space-x-8'>
            <div className='w-full flex flex-col'>
              <label
                htmlFor=''
                className='font-semibold'>
                Street
              </label>
              <input
                type='text'
                value={street}
                onChange={(e) => setStreet(e.target.value)}
                className='border border-gray-300 mt-[5px] px-2 py-1 text-sm outline-none'
                placeholder='enter state'
              />
            </div>

            <div className='flex flex-col w-full'>
              <label
                htmlFor=''
                className='font-semibold'>
                Zipcode
              </label>
              <input
                type='number'
                value={zipcode}
                onChange={(e) =>
                  setZipcode(+e.target.value)
                }
                className='border border-gray-300 mt-[5px] px-2 py-1 text-sm outline-none'
                placeholder='enter city'
              />
            </div>
          </div>
        </div>
        <div className='flex space-x-8 items-center pt-6'>
          <button
            type='submit'
            className='bg-green-700 px-6 py-1 text-white rounded-sm'>
            Save
          </button>
          <button
            onClick={handleBackProfile}
            className='bg-rose-500 px-4 py-1 text-white rounded-sm'>
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}

export default EditProfile;
