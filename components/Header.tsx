import Image from "next/image";
import {
  HeartIcon,
  MagnifyingGlassIcon,
  ShoppingBagIcon,
  UserCircleIcon,
} from "@heroicons/react/24/outline";
import Link from "next/link";

function Header() {
  return (
    <header className='sticky top-0 z-50 bg-white flex px-4 lg:px-8 items-center h-[56px] md:h-16 lg:h-20 shadow-md'>
      <Link href='/'>
        <Image
          src='/assests/zensar-logo.png'
          alt=''
          className='w-24 lg:w-32 cursor-pointer'
          width={800}
          height={800}
        />
      </Link>
      <nav className='hidden lg:inline-block ml-8 flex-1'>
        <ul className='flex space-x-5 font-bold text-stone-800/90 text-sm'>
          <li>MEN</li>
          <li>WOMEN</li>
          <li>KIDS</li>
          <li>HOME&LIVING</li>
          <li>BEAUTY</li>
          <li>STUDIO</li>
        </ul>
      </nav>
      <form className='flex items-center bg-gray-100 space-x-1 flex-1 lg:flex-none md:space-x-3 mx-2 lg:mx-0 md:w-[380px] py-2 rounded-sm'>
        <MagnifyingGlassIcon className='h-4 w-4 ml-1 lg:ml-4 text-gray-800' />
        <input
          type='text'
          className='bg-transparent flex-1 w-full outline-none text-sm'
          placeholder='Search for products, brands and more'
        />
      </form>
      <div className='flex items-center space-x-3 md:space-x-6 lg:ml-12'>
        <Link
          href='/profile'
          className='hidden md:inline-flex flex-col items-center cursor-pointer'>
          <UserCircleIcon className='w-4 h-4 md:w-5 md:h-5' />
          <p className='text-xs font-semibold md:font-bold'>
            Profile
          </p>
        </Link>
        <div className='hidden md:inline-flex flex-col items-center'>
          <HeartIcon className='w-4 h-4 md:w-5 md:h-5' />
          <p className='text-xs font-semibold md:font-bold'>
            Wishlist
          </p>
        </div>
        <Link
          href='/cart'
          className='flex flex-col items-center'>
          <ShoppingBagIcon className='w-4 h-4 md:w-5 md:h-5' />
          <p className='text-xs font-semibold md:font-bold'>
            Bag
          </p>
        </Link>
      </div>
    </header>
  );
}

export default Header;
