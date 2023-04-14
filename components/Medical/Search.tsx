import React from "react";

function Search() {
  return (
    <div>
      <form>
        <input
          type='text'
          className='border outline-none px-2 py-1 text-sm'
          placeholder='Search for doctor'
        />
        <button
          type='submit'
          className='hidden'></button>
      </form>
    </div>
  );
}

export default Search;
