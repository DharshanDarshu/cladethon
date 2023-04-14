"use client";

import { XMarkIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

function OpenPop() {
  const [showModal, setShowModal] = useState(true);
  const router = useRouter();
  console.log(router);
  const handleImmediate = () => {
    router.push("/medical/emergency");
    setShowModal(false);
  };
  return (
    <div>
      {showModal && (
        <>
          <div className='justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none'>
            <div className='relative w-auto my-6 mx-auto max-w-3xl'>
              <div className='border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none'>
                <img
                  src='https://e0.pxfuel.com/wallpapers/702/11/desktop-wallpaper-medical-mbbs.jpg'
                  className='w-full h-full'
                  alt=''
                />
                <div className='bg-black/60 w-full h-full absolute top-0' />
                <div className='absolute top-0 flex flex-col justify-between text-white w-full h-full'>
                  <div className=' w-full flex items-start justify-between rounded-t'>
                    <button
                      className='pt-2 pr-2 ml-auto border-0 float-right text-3xl leading-none font-semibold outline-none focus:outline-none'
                      onClick={() => setShowModal(false)}>
                      <span className='opacity-90 h-6 w-6 text-2xl block outline-none focus:outline-none'>
                        <div className='bg-gray-200 flex items-center justify-center'>
                          <XMarkIcon className='w-5 h-5 text-black' />
                        </div>
                      </span>
                    </button>
                  </div>
                  <div className='relative px-6 flex-auto'>
                    <h1 className='text-4xl'>
                      Any Medical Emercency!!!?
                    </h1>
                    <div className='mt-2'>
                      <p className='text-sm'>
                        Lorem ipsum dolor sit amet
                        consectetur adipisicing elit. Libero
                        totam rerum, magni natus facere
                        suscipit perspiciatis! Aliquam enim
                        suscipit ad blanditiis .
                      </p>
                      <p className='text-sm mt-2'>
                        Lorem ipsum dolor sit amet
                        consectetur adipisicing elit. Libero
                        totam rerum, magni natus facere
                        suscipit perspiciatis! Aliquam enim
                        suscipit ad blanditiis unde alias,
                        ducimus minus facere aliquid,
                        consectetur esse nam.
                      </p>
                    </div>
                  </div>
                  <div className='flex items-center space-x-6 px-6 pb-2'>
                    <button
                      className='bg-rose-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150'
                      type='button'
                      onClick={handleImmediate}>
                      Immediate Emercency
                    </button>
                    <Link
                      href='/medical/doctor'
                      className='bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150'
                      type='button'
                      onClick={() => setShowModal(false)}>
                      Emercency
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className='opacity-25 fixed inset-0 z-40 bg-black'></div>
        </>
      )}
    </div>
  );
}

export default OpenPop;
