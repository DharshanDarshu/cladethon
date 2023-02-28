import Image from "next/image";
import {
  HeartIcon,
  MagnifyingGlassIcon,
  ShoppingBagIcon,
  UserCircleIcon,
} from "@heroicons/react/24/outline";

function Header() {
  return (
    <header className='flex px-8 items-center h-20 shadow-md'>
      <Image
        src='/assests/zensar-logo.png'
        alt=''
        className='w-32'
        width={800}
        height={800}
      />
      <nav className='ml-8 flex-1'>
        <ul className='flex space-x-5 font-bold text-stone-800/90 text-sm'>
          <li>MEN</li>
          <li>WOMEN</li>
          <li>KIDS</li>
          <li>HOME&LIVING</li>
          <li>BEAUTY</li>
          <li>STUDIO</li>
        </ul>
      </nav>
      <form className='flex items-center bg-gray-100 space-x-3 w-[380px] py-2 rounded-sm'>
        <MagnifyingGlassIcon className='h-4 w-4 ml-4 text-gray-800' />
        <input
          type='text'
          className='bg-transparent flex-1 w-full outline-none text-sm'
          placeholder='Search for products, brands and more'
        />
      </form>
      <div className='flex items-center space-x-6 ml-12'>
        <div className='flex flex-col items-center cursor-pointer'>
          <UserCircleIcon className='w-5 h-5' />
          <p className='text-xs font-bold'>Profile</p>
        </div>
        <div className='flex flex-col items-center'>
          <HeartIcon className='w-5 h-5' />
          <p className='text-xs font-bold'>Wishlist</p>
        </div>
        <div className='flex flex-col items-center'>
          <ShoppingBagIcon className='w-5 h-5' />
          <p className='text-xs font-bold'>Bag</p>
        </div>
      </div>
    </header>
  );
}

export default Header;
