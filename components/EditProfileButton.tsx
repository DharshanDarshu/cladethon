"use client";

import {
  ArrowLeftOnRectangleIcon,
  PlusIcon,
} from "@heroicons/react/24/outline";
import { useRouter } from "next/navigation";
import { useCookies } from "react-cookie";

function EditProfileButton() {
  const [cookies, setCookie, removeCookie] = useCookies([
    "access_token",
    "user",
  ]);
  const router = useRouter();

  const handleLogout = () => {
    removeCookie("access_token");
    removeCookie("user");
    localStorage.removeItem("token");
    window.location.reload();
  };

  const handleRedirect = () => {
    router.push("/profile?edit=true");
  };
  return (
    <>
      <button
        onClick={handleRedirect}
        className='flex items-center space-x-4 text-red-600 capitalize hover:underline cursor-pointer'>
        <PlusIcon className='w-5 h-5 mr-1' />
        edit profile
      </button>
      <button
        onClick={handleLogout}
        className='text-red-600 cursor-pointer hover:underline flex items-center -ml-5 space-x-1'>
        <ArrowLeftOnRectangleIcon className='w-5 h-5' />
        <p className=''>Signout</p>
      </button>
    </>
  );
}

export default EditProfileButton;
