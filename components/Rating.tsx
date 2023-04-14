import { StarIcon } from "@heroicons/react/24/solid";

type Props = {
  rating: {
    user: {
      firstname: string;
      lastname: string;
      email: string;
    };
    rating: number;
    message: string;
  };
};

function Rating({ rating }: Props) {
  return (
    <div className='flex flex-col mt-4'>
      <div className='flex text-sm space-x-2'>
        <img
          src={`https://ui-avatars.com/api/?name=${rating.user.firstname}`}
          alt=''
          className='w-10 h-10 rounded-full'
        />
        <div className=''>
          <h1 className='font-semibold capitalize'>{`${rating.user.firstname} ${rating.user.lastname}`}</h1>
          <p className='text-xs text-gray-400 -mt-1'>
            {rating.user.email}
          </p>
          <div className='flex items-center space-x-1 mt-1'>
            {new Array(rating.rating)
              .fill("")
              .map((_, i) => (
                <StarIcon
                  key={i}
                  className='w-4 h-4 text-yellow-500'
                />
              ))}
          </div>
        </div>
      </div>

      <p className='w-[800px] text-sm text-gray-700 mt-2'>
        {rating.message}
      </p>
    </div>
  );
}

export default Rating;
