"use client";

import { useState, FormEvent } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";

type Props = {
  email: string;
};

function ResetPassword({ email }: Props) {
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] =
    useState("");
  const [err, setErr] = useState("");
  const router = useRouter();
  const restApi = "http://localhost:4000";
  // const restApi =
  //   "https://cladethon-hosted-service.vercel.app";

  const handleResetPassword = async (
    e: FormEvent<HTMLFormElement>,
  ) => {
    e.preventDefault();

    if (!newPassword || !confirmPassword) {
      setErr("please enter new and confirm password");
      return;
    }

    console.log(newPassword, confirmPassword);

    if (newPassword !== confirmPassword) {
      setErr("password mismatch");
      return;
    }

    const notification = toast.loading(
      "Please wait, password is resetting",
    );

    const response = await fetch(
      `${restApi}/user/forgetten`,
      {
        method: "PATCH",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({
          email,
          newPassword,
          confirmPassword,
        }),
      },
    );

    if (response.status === 200) {
      toast.success("password resetted successful", {
        id: notification,
      });
      router.replace("/auth/login");
      return;
    }

    const data = await response.json();
    setErr(data.err);
    toast.error("something went wrong", {
      id: notification,
    });
    console.log(data);
  };
  return (
    <div className='flex flex-col bg-white max-w-[35vw] space-y-4 py-4 mx-auto shadow-md px-10'>
      <h1 className='text-2xl text-gray-700 mt-4'>
        Reset Password
      </h1>
      {err && <p className='text-red-500 text-sm'>{err}</p>}
      <form
        className='flex flex-col justify-between space-y-2'
        onSubmit={handleResetPassword}>
        <div className='w-full flex flex-col'>
          <label
            htmlFor=''
            className='font-semibold'>
            New Password
          </label>
          <input
            type='password'
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            className='border border-gray-300 mt-[5px] px-2 py-1 text-sm outline-none'
            placeholder='Enter New Password'
          />
        </div>
        <div className='w-full flex flex-col'>
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
            placeholder='Enter Confirm Password'
          />
        </div>
        <div className='flex space-x-8 items-center py-4'>
          <button
            type='submit'
            className='bg-green-700 px-6 py-1 text-white rounded-sm'>
            Save
          </button>
          <button className='bg-rose-500 px-4 py-1 text-white rounded-sm'>
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}

export default ResetPassword;
