"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState, useEffect } from "react";
import { useCookies } from "react-cookie";
import { toast } from "react-hot-toast";
import { useStopwatch } from "react-timer-hook";

type Props = {
  profile: string | null;
  token: string | null;
  forgetten: string | null;
};

function Verify({ profile, token, forgetten }: Props) {
  const [cookies, setCookie, removeCookie] = useCookies([
    "access_token",
    "user",
  ]);

  const [email, setEmail] = useState("");
  const [createdOTP, setCreatedOTP] = useState<any>();
  const [otp, setOtp] = useState("");
  const [err, setErr] = useState("");
  const [otpErr, setOtpErr] = useState("");
  const { seconds, minutes, start, pause } = useStopwatch({
    autoStart: false,
  });

  // const restApi =
  //   "https://cladethon-hosted-service.vercel.app";
  const restApi = "http://localhost:4000";

  useEffect(() => {
    if (minutes >= 5) {
      pause();
    }
  }, [minutes]);

  const router = useRouter();

  const handleConfirmOtp = async (
    e: React.FormEvent<HTMLFormElement>,
  ) => {
    e.preventDefault();
    if (!otp) {
      setOtpErr("Enter OTP");
      return;
    }
    const notification = toast.loading(
      "Please wait, you account is in verification mode",
    );
    const response = await fetch(
      `${restApi}/verifyemail/${createdOTP._id}`,
    );

    const data = await response.json();
    if (data?.token !== otp) {
      toast.error("verification failed", {
        id: notification,
      });
      setOtpErr("Re-enter OTP");
      return;
    }

    toast.success("verification successful", {
      id: notification,
    });

    if (profile) {
      let emailNotification: any;
      setTimeout(() => {
        emailNotification = toast.loading(
          "Please wait, email is getting updating",
        );
      }, 2000);
      const responseUser = await fetch(
        `${restApi}/user/change-email`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + token,
          },
          body: JSON.stringify({
            email,
          }),
        },
      );
      const responseCart = await fetch(
        `${restApi}/carts/email`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + token,
          },
          body: JSON.stringify({
            email,
          }),
        },
      );
      const responseOrder = await fetch(
        `${restApi}/orders/email`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + token,
          },
          body: JSON.stringify({
            email,
          }),
        },
      );
      const responseWishlist = await fetch(
        `${restApi}/wishlist/email`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + token,
          },
          body: JSON.stringify({
            email,
          }),
        },
      );

      const data1 = await responseUser.json();
      const data2 = await responseCart.json();
      const data3 = await responseOrder.json();
      const data4 = await responseWishlist.json();
      console.log(data1);
      console.log(data2);
      console.log(data3);
      console.log(data4);
      setTimeout(() => {
        toast.success("email updated Successfully", {
          id: emailNotification,
        });
        removeCookie("access_token");
        console.log("remove");
        removeCookie("user");
        localStorage.removeItem("token");
      }, 4000);

      setTimeout(() => {
        router.replace("/auth/login");
      }, 5000);

      return;
    }

    if (forgetten) {
      router.replace("/auth/forgetten-password/reset");
      return;
    }

    router.replace(`/auth/signup?email=${btoa(email)}`);
  };

  const handleOtp = async (
    e: React.FormEvent<HTMLFormElement>,
  ) => {
    e.preventDefault();
    if (!email) {
      setErr("enter email address");
      return;
    }
    const response = await fetch(`${restApi}/verifyemail`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
      }),
    });
    const data = await response.json();
    console.log(data);

    if (data.err) {
      return setErr(data.err);
    }
    start();
    setCreatedOTP(data);
  };

  const handleEmailChange = (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setErr("");
    setEmail(e.target.value);
  };

  const handleOTPChange = (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setOtpErr("");
    setOtp(e.target.value);
  };
  return (
    <div className='overflow-hidden h-[calc(100vh-80px)]'>
      <img
        className='h-[calc(100vh-80px)] w-screen object-cover'
        src='https://images.unsplash.com/photo-1483985988355-763728e1935b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80'
        alt=''
      />
      <div className='absolute top-0 w-screen flex items-center justify-center h-screen'>
        <div className=' bg-white shadow-lg w-[320px] lg:w-[400px] px-4 lg:px-8 py-4'>
          <form onSubmit={handleOtp}>
            {" "}
            <h1 className='text-2xl font-semibold uppercase mb-4 text-center '>
              Verify Email
            </h1>
            <div className='flex flex-col'>
              <label
                htmlFor=''
                className='font-semibold'>
                Email
              </label>
              <input
                type='email'
                disabled={createdOTP ? true : false}
                name=''
                value={email}
                onChange={handleEmailChange}
                id=''
                className={`border mt-[6px] mb-[10px] px-2 py-[5px] outline-none text-sm disabled:bg-gray-300 disabled:cursor-not-allowed ${
                  err && "border-orange-600"
                }`}
                placeholder='Enter email'
              />
            </div>
            {err && (
              <p className='text-sm text-red-700 -mt-2'>
                {err}
              </p>
            )}
            {!createdOTP && (
              <button className='bg-yellow-400 px-6 py-1 mt-3 text-black'>
                Send
              </button>
            )}
          </form>

          {createdOTP && (
            <form onSubmit={handleConfirmOtp}>
              <div className='flex flex-col'>
                <label
                  htmlFor=''
                  className='font-semibold flex justify-between items-center'>
                  <span>OTP</span>
                  <span className='text-red-800'>
                    <span className='text-xs'>
                      Token will expires in 5 mins
                    </span>
                    {` ${
                      minutes < 9 ? "0" + minutes : minutes
                    } : ${
                      seconds < 9 ? "0" + seconds : seconds
                    }`}
                  </span>
                </label>
                <input
                  name=''
                  value={otp}
                  onChange={handleOTPChange}
                  id=''
                  className={`border mt-[6px] mb-[10px] px-2 py-[5px] outline-none text-sm ${
                    otpErr && "border-orange-600"
                  }`}
                  placeholder='Enter OTP'
                />
              </div>

              {otpErr && (
                <p className='text-sm text-red-700 -mt-2'>
                  {otpErr}
                </p>
              )}

              <button className='bg-green-800 px-6 py-1 mt-2 text-white'>
                Verify
              </button>
            </form>
          )}
          {!profile && (
            <p className='mt-2 text-sm'>
              Already have an account?
              <Link
                href='/auth/login'
                className='text-blue-600 underline ml-1 text-[15px]'>
                login
              </Link>
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

export default Verify;
