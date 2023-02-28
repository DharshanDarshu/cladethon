import Image from "next/image";

function TopBanner() {
  return (
    <div className='flex space-x-2'>
      <div className='relative flex-1'>
        <Image
          src='/assests/banner-6.jpg'
          alt=''
          width={800}
          height={800}
          className='w-full h-64 rounded-2xl object-cover'
        />
        <div className='absolute top-0 px-8 flex flex-col py-12 h-64 '>
          <h1 className='text-green-900 font-semibold text-4xl w-3/4'>
            Grab Upto 50% Off On Selected HeadPhones
          </h1>
          <button className='bg-green-800 px-4 py-2 w-24 mt-7 text-white rounded-full'>
            Buy Now
          </button>
        </div>
      </div>
      <div className='relative'>
        <Image
          src='/assests/banner5.jpg'
          alt=''
          width={800}
          height={800}
          className='w-full h-64 rounded-2xl'
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
