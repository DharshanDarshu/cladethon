import Image from "next/image";
import {
  HeartIcon,
  UserCircleIcon,
} from "@heroicons/react/24/outline";
import Link from "next/link";
import Bag from "./Bag";
import { cookies } from "next/headers";
import Search from "./Search";

function Header() {
  const nextCookies = cookies();
  const token = nextCookies.get("user");
  const accesstoken = nextCookies.get("access_token");
  const user = token && JSON.parse(token?.value);
  const accessToken =
    accesstoken && JSON.parse(accesstoken?.value);
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
          <li>
            <Link href='/categories/mens'>MEN</Link>
          </li>
          <li>
            <Link href='/categories/womens'>WOMEN</Link>
          </li>
          <li>
            <Link href='/categories/kids'>KIDS</Link>
          </li>
          <li>
            <Link href='/categories/electronics'>
              ELECTRONIC
            </Link>
          </li>
          <li>
            <Link href='/categories/womens/beauty'>
              BEAUTY
            </Link>
          </li>
          <li>
            <Link href='/categories/sports'>SPORTS</Link>
          </li>
        </ul>
      </nav>
      <Search />
      <div className='flex items-center space-x-3 md:space-x-6 lg:ml-12'>
        <Link
          href='/profile'
          className='hidden md:inline-flex flex-col items-center cursor-pointer'>
          <UserCircleIcon className='w-4 h-4 md:w-5 md:h-5' />
          <p className='text-xs font-semibold md:font-bold capitalize'>
            {user ? user.firstname : "Profile"}
          </p>
        </Link>
        <Link
          href='/wishlist'
          className='hidden md:inline-flex flex-col items-center'>
          <HeartIcon className='w-4 h-4 md:w-5 md:h-5' />
          <p className='text-xs font-semibold md:font-bold'>
            Wishlist
          </p>
        </Link>
        <Bag
          user={user}
          accesstoken={accessToken}
        />
      </div>
    </header>
  );
}

export default Header;
