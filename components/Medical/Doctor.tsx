import React from "react";

function Doctor() {
  return (
    <div className='border-b pb-6'>
      <div className='flex space-x-4'>
        <img
          className='w-[170px] h-[200px]'
          src='https://img.freepik.com/free-vector/people-walking-sitting-hospital-building-city-clinic-glass-exterior-flat-vector-illustration-medical-help-emergency-architecture-healthcare-concept_74855-10130.jpg?w=2000'
          alt=''
        />
        <div className='flex flex-col'>
          <h1 className='text-2xl text-gray-700 mt-1'>
            Hospital Name
          </h1>
          <p className='text-sm text-gray-500 mt-1'>
            Distance: 200km
          </p>
          <p className='text-xs flex-1'>
            Lorem ipsum dolor sit amet consectetur
            adipisicing elit. Dicta consequuntur quae velit
            quas cumque numquam, asperiores consectetur quo
            unde nostrum commodi. Repellat consequuntur quae
            numquam? Ea, mollitia doloribus. In, facere!
          </p>
          <button className='bg-rose-500 py-2 rounded-sm w-32 text-white uppercase'>
            Pick Up
          </button>
        </div>
      </div>
    </div>
  );
}

export default Doctor;
