"use client";

import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";
import { useCookies } from "react-cookie";

type Props = {
  user: {
    email: string;
  };
};

function Login({ user }: Props) {
  console.log(user);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [cookie, setCookie] = useCookies([
    "user",
    "access_token",
    "refresh_token",
  ]);
  const router = useRouter();

  const handleLogin = async (
    e: FormEvent<HTMLFormElement>,
  ) => {
    e.preventDefault();

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
                  onChange={(e) => setEmail(e.target.value)}
                  id=''
                  className='border mt-[6px] mb-[10px] p-1 outline-none'
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
                  onChange={(e) =>
                    setPassword(e.target.value)
                  }
                  className='border mt-[6px] mb-[10px] p-1 outline-none'
                  placeholder='Enter Password'
                />
              </div>
              <button
                type='submit'
                className='bg-green-800 px-6 py-1 mt-3 text-white'>
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
