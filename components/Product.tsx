import Link from "next/link";

type Props = {
  id: string;
  image: string;
  title: string;
  description: string;
  price: number;
};

function Product({
  id,
  image,
  title,
  description,
  price,
}: Props) {
  return (
    <div className='w-full md:w-[285px] h-[460px]'>
      <Link
        href={`/product/${id}`}
        className=''>
        <img
          className='w-full h-[390px] object-cover'
          src={`${process.env.RESTFUL_API}/image/${image}`}
          alt=''
        />
      </Link>
      <div className='px-1'>
        <h1 className='font-semibold text-lg capitalize'>
          {title}
        </h1>
        <p className='-mt-1 text-sm text-gray-700'>
          {description}
        </p>
        <h2 className='font-bold text-[14px] text-gray-800'>
          Rs. {price}
          <span className='text-[12px] text-gray-500 ml-2 line-through font-normal'>
            Rs. 789
          </span>
          <span className='text-red-500 font-normal text-[12px] ml-1'>
            (60% OFF)
          </span>
        </h2>
      </div>
    </div>
  );
}

export default Product;
