"use client";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";

function Search() {
  const [search, setSearch] = useState("");
  const router = useRouter();

  const handleSearch = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    router.push(`/search?search=${search}`);

    setSearch("");
  };
  return (
    <form
      className='flex items-center bg-gray-100 space-x-1 flex-1 lg:flex-none md:space-x-3 mx-2 lg:mx-0 md:w-[380px] py-2 rounded-sm'
      onSubmit={handleSearch}>
      <MagnifyingGlassIcon className='h-4 w-4 ml-1 lg:ml-4 text-gray-800' />
      <input
        type='text'
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className='bg-transparent flex-1 w-full outline-none text-sm'
        placeholder='Search for products, brands and more'
      />
      <button
        type='submit'
        className='hidden'></button>
    </form>
  );
}

export default Search;
