import Link from "next/link";
import EditProfileButton from "./EditProfileButton";

type Props = {
  user: {
    email: string;
    phone: string;
    firstname: string;
    lastname: string;
    shippingAddress: {
      state: string;
      city: string;
      street: string;
      zipcode: number;
    };
  };
};

function ProfileDetails({ user }: Props) {
  return (
    <div className='flex bg-white max-w-[60vw] space-x-8 mx-auto h-full shadow-md'>
      <div className='flex items-center flex-col'>
        <img
          className='rounded-full w-[250px] h-[250px] my-4 ml-8'
          src={`https://ui-avatars.com/api/?name=${user.firstname}`}
          alt=''
        />
        <EditProfileButton />
      </div>
      <div className='my-8 relative'>
        <div className=''>
          <div className='flex items-center justify-between'>
            <h1 className='text-3xl text-gray-800 mb-4'>
              Profile Details
            </h1>
          </div>
        </div>
        <h1 className='text-lg w-full'>
          Name:
          <span className='absolute w-full left-14 font-semibold capitalize'>
            {`${user.firstname} ${user.lastname}`}
          </span>
        </h1>
        <p className='text-sm text-gray-500 font-normal -mt-1'>
          email:
          <span className='absolute left-14'>
            {user.email}
          </span>
        </p>
        <p className='text-sm text-gray-500 font-normal -mt-1'>
          phone:
          <span className='absolute left-14'>
            {user.phone}
          </span>
        </p>
        <p className='text-sm text-gray-500 font-normal -mt-1'>
          shipping address:
          <span className='ml-2'>
            <span>{`${user?.shippingAddress?.street}, ${user?.shippingAddress?.city}, ${user?.shippingAddress?.state} pincode: ${user?.shippingAddress?.zipcode}`}</span>
          </span>
        </p>
        <div className='my-4 flex flex-col space-y-1'>
          <Link
            className='text-sm text-red-400 underline'
            href='/order'>
            My Order
          </Link>
          <Link
            className='text-sm text-red-400 underline'
            href='/wishlist'>
            My Wishlist
          </Link>
          <Link
            className='text-sm text-red-400 underline'
            href='/cart'>
            My Cart
          </Link>
        </div>
      </div>
    </div>
  );
}

export default ProfileDetails;
