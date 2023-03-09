"use client";

import { useRouter } from "next/navigation";
import React, { useState, useEffect } from "react";
import { useStopwatch } from "react-timer-hook";

function Verify() {
  const [email, setEmail] = useState("");
  const [createdOTP, setCreatedOTP] = useState<any>();
  const [otp, setOtp] = useState("");
  const [err, setErr] = useState(false);
  const [timer, setTimer] = useState("00:00");
  const { seconds, minutes, start, pause } = useStopwatch({
    autoStart: false,
  });

  useEffect(() => {
    if (minutes >= 5) {
      pause();
    }
  }, [minutes]);

  const router = useRouter();

  const handleConfirmOtp = async () => {
    if (!email) {
      return;
    }
    const response = await fetch(
      `${process.env.RESTFUL_API}/verifyemail/${createdOTP._id}`,
    );

    const data = await response.json();
    console.log(data);
    if (data.token !== otp) {
      return;
    }

    router.replace(`/auth/signup?email=${btoa(email)}`);
  };

  const handleOtp = async (
    e: React.FormEvent<HTMLFormElement>,
  ) => {
    e.preventDefault();
    if (!email) {
      setErr(true);
      return;
    }
    const response = await fetch(
      `${process.env.RESTFUL_API}/verifyemail`,
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
    const data = await response.json();
    console.log(data);
    start();
    setCreatedOTP(data);
  };

  const handleEmailChange = (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setErr(false);
    setEmail(e.target.value);
  };
  return (
    <div className='overflow-hidden h-[calc(100vh-80px)]'>
      <img
        className='h-[calc(100vh-80px)] w-screen object-cover'
        src='https://images.unsplash.com/photo-1483985988355-763728e1935b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80'
        alt=''
      />
      <div className='absolute top-0 w-screen flex items-center justify-center h-screen'>
        <div className=' bg-white shadow-lg w-[400px] px-8 py-4'>
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
                className={`border mt-[6px] mb-[10px] p-1 outline-none disabled:bg-gray-300 disabled:cursor-not-allowed ${
                  err && "border-red-500"
                }`}
                placeholder='Enter email'
              />
            </div>
            {createdOTP && (
              <div className='flex flex-col'>
                <label
                  htmlFor=''
                  className='font-semibold flex justify-between items-center'>
                  <span>OTP</span>
                  <span className='text-red-800'>
                    <span className='text-xs'>
                      Token will expires in 2 mins
                    </span>
                    {` ${
                      minutes < 9 ? "0" + minutes : minutes
                    } : ${
                      seconds < 9 ? "0" + seconds : seconds
                    }`}
                  </span>
                </label>
                <input
                  type='email'
                  name=''
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  id=''
                  className='border mt-[6px] mb-[10px] p-1 outline-none'
                  placeholder='Enter OTP'
                />
              </div>
            )}
            {!createdOTP && (
              <button className='bg-yellow-400 px-6 py-1 mt-3 text-black'>
                Send
              </button>
            )}
          </form>

          {createdOTP && (
            <button
              onClick={handleConfirmOtp}
              className='bg-green-800 px-6 py-1 mt-3 text-white'>
              Verify
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default Verify;
