"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";

type Props = {
  token: string;
};

function ChangePassword({ token }: Props) {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] =
    useState("");
  const router = useRouter();

  const restApi = "http://localhost:4000";
  // const restApi =
  //   "https://cladethon-hosted-service.vercel.app";

  const handleChangePassword = async (
    e: FormEvent<HTMLFormElement>,
  ) => {
    e.preventDefault();
    const response = await fetch(`${restApi}/user/change`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
      body: JSON.stringify({
        oldPassword,
        newPassword,
        confirmPassword,
      }),
    });

    const data = await response.json();

    console.log(data);
  };

  const handleCancel = () => {
    router.replace("/profile?edit=true");
  };
  return (
    <div className='flex flex-col px-8 py-8 bg-white max-w-[40vw] space-y-4 mx-auto shadow-md'>
      <div className='flex flex-col'>
        <h1 className='text-2xl text-gray-700 mb-4'>
          Change Password
        </h1>
        <form
          className='flex flex-col space-y-2 w-full'
          onSubmit={handleChangePassword}>
          <div className='flex flex-col'>
            <label
              htmlFor=''
              className='font-semibold'>
              Old Password
            </label>
            <input
              type='password'
              value={oldPassword}
              onChange={(e) =>
                setOldPassword(e.target.value)
              }
              className='border border-gray-300 mt-[5px] px-2 py-1 text-sm outline-none'
              placeholder='Enter old password'
            />
          </div>
          <div className='flex flex-col'>
            <label
              htmlFor=''
              className='font-semibold'>
              New Password
            </label>
            <input
              type='password'
              value={newPassword}
              onChange={(e) =>
                setNewPassword(e.target.value)
              }
              className='border border-gray-300 mt-[5px] px-2 py-1 text-sm outline-none'
              placeholder='Enter new password'
            />
          </div>
          <div className='flex flex-col'>
            <label
              htmlFor=''
              className='font-semibold'>
              Confirm Password
            </label>
            <input
              type='password'
              value={confirmPassword}
              onChange={(e) =>
                setConfirmPassword(e.target.value)
              }
              className='border border-gray-300 mt-[5px] px-2 py-1 text-sm outline-none'
              placeholder='Enter confirm password'
            />
          </div>
          <div className='flex space-x-8 items-center pt-6'>
            <button
              type='submit'
              className='bg-green-700 px-6 py-1 text-white rounded-sm'>
              Save
            </button>
            <button
              onClick={handleCancel}
              className='bg-rose-500 px-4 py-1 text-white rounded-sm'>
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ChangePassword;
