"use client";

import { useRouter } from "next/navigation";
import { ChangeEvent, FormEvent, useState } from "react";
import { useCookies } from "react-cookie";
import { toast } from "react-hot-toast";

type Props = {
  user: {
    email: string;
  };
};

function Login({ user }: Props) {
  console.log(user);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [err, setErr] = useState("");
  const [cookie, setCookie] = useCookies([
    "user",
    "access_token",
    "refresh_token",
  ]);
  const router = useRouter();

  const handleChangeEmail = (
    e: ChangeEvent<HTMLInputElement>,
  ) => {
    setErr("");
    setEmail(e.target.value);
  };

  const handleChangePassword = (
    e: ChangeEvent<HTMLInputElement>,
  ) => {
    setErr("");
    setPassword(e.target.value);
  };

  const handleLogin = async (
    e: FormEvent<HTMLFormElement>,
  ) => {
    e.preventDefault();

    if (!email) {
      return;
    }

    if (!password) {
      return;
    }

    const notification = toast.loading(
      "Please wait, we are login in",
    );

    const authorization = await fetch(
      "http://localhost:3000/api/login",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
      },
    );

    // console.log(authorization);
    const authData = await authorization.json();
    console.log(authData);

    if (authData.user) {
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
      toast.success("verification successful", {
        id: notification,
      });
    } else {
      setErr("invalid email or password");
      toast.error("invalid email or password", {
        id: notification,
      });
      return;
    }

    router.replace("/");
  };
  return (
    <>
      {!user ? (
        <div className='overflow-hidden h-[calc(100vh-80px)]'>
          <img
            className='hidden lg:inline-block h-[calc(100vh-80px)] w-screen object-cover'
            src='https://images.unsplash.com/photo-1483985988355-763728e1935b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80'
            alt=''
          />
          <img
            className='lg:hidden h-[calc(100vh-80px)] w-screen object-cover'
            src='https://images.unsplash.com/photo-1513094735237-8f2714d57c13?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=435&q=80'
            alt=''
          />
          <div className='absolute top-0 w-screen flex items-center justify-center h-screen'>
            <form
              onSubmit={handleLogin}
              className=' bg-white shadow-lg w-[300px] md:w-[400px] px-4 lg:px-8 py-4'>
              <h1 className='text-2xl font-semibold uppercase mb-4 text-center '>
                Login
              </h1>
              {err && (
                <p className='text-center text-red-500 -mt-5'>
                  {err}
                </p>
              )}
              <div className='flex flex-col'>
                <label
                  htmlFor=''
                  className='font-semibold'>
                  Email
                </label>
                <input
                  type='email'
                  name=''
                  value={email}
                  onChange={handleChangeEmail}
                  id=''
                  className='border mt-[6px] mb-[10px] px-2 py-[5px] outline-none text-sm'
                  placeholder='Enter email'
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
                  onChange={handleChangePassword}
                  className='border mt-[6px] mb-[10px] px-2 py-[5px] outline-none text-sm'
                  placeholder='Enter Password'
                />
              </div>
              <button
                type='submit'
                disabled={!email || !password}
                className='bg-green-800 px-6 py-1 mt-3 text-white disabled:bg-gray-400 disabled:cursor-not-allowed'>
                Login
              </button>
            </form>
          </div>
        </div>
      ) : (
        <h1>User already Present</h1>
      )}
    </>
  );
}

export default Login;
