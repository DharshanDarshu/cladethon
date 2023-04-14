import React from "react";
import Doctor from "../../../components/Medical/Doctor";
import Search from "../../../components/Medical/Search";

function DoctorPage() {
  return (
    <div className='max-w-[70vw] mx-auto my-6'>
      <Search />
      <div className='flex flex-col space-y-4 mt-4'>
        <Doctor />
        <Doctor />
        <Doctor />
        <Doctor />
        <Doctor />
        <Doctor />
      </div>
    </div>
  );
}

export default DoctorPage;
