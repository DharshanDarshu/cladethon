import Image from "next/image";
import Link from "next/link";

function TopBanner() {
  return (
    <div className='flex space-x-2'>
      <Link
        href='/categories/womens/kurtas'
        className='hidden md:inline-block relative flex-1'>
        <Image
          src='/assests/banner-6.jpg'
          alt=''
          width={800}
          height={800}
          unoptimized={true}
          className='w-full h-64 rounded-2xl object-cover'
        />
        <div className='absolute top-0 px-8 flex flex-col py-12 h-64 '>
          <h1 className='text-green-900 font-semibold text-4xl w-3/4'>
            Grab Upto 50% Off On Selected Kurtas
          </h1>
          <button className='bg-green-800 px-4 py-2 w-24 mt-7 text-white rounded-full'>
            Buy Now
          </button>
        </div>
      </Link>
      <div className='relative w-screen md:w-auto'>
        <Image
          src='/assests/banner5.jpg'
          alt=''
          width={800}
          height={800}
          unoptimized={true}
          className='w-full h-64 rounded-2xl object-cover'
        />
        <div className='absolute bottom-2 flex items-center justify-center w-full'>
          <button className='bg-red-800 px-3 py-2 text-sm w-24 mt-7 text-white rounded-full'>
            Buy Now
          </button>
        </div>
      </div>
    </div>
  );
}

export default TopBanner;
