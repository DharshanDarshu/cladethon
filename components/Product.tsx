import Image from "next/image";
import Link from "next/link";

type Props = {
  id: string;
  image: string;
  title: string;
  description: string;
  price: number;
  offer_details: string;
};

function Product({
  id,
  image,
  title,
  description,
  price,
  offer_details,
}: Props) {
  const random = +offer_details / 100;
  const discountPrice = Math.floor(price * random);
  const discount = offer_details;
  return (
    <div className='w-full md:w-[285px] h-[460px]'>
      <Link
        href={`/product/${id}`}
        className=''>
        <Image
          className='w-full h-[390px] object-cover'
          src={`${process.env.RESTFUL_API}/image/${image}`}
          unoptimized={true}
          width={800}
          height={800}
          alt=''
        />
      </Link>
      <div className='px-1'>
        <h1 className='font-semibold text-lg capitalize'>
          {title}
        </h1>
        <p className='-mt-1 text-sm text-gray-700 whitespace-nowrap overflow-hidden text-ellipsis max-w-full'>
          {description}
        </p>
        <h2 className='font-bold text-[14px] text-gray-800'>
          Rs. {price - discountPrice}
          <span className='text-[12px] text-gray-500 ml-2 line-through font-normal'>
            Rs. {price}
          </span>
          <span className='text-red-500 font-normal text-[12px] ml-1'>
            {`(${discount}% OFF)`}
          </span>
        </h2>
      </div>
    </div>
  );
}

export default Product;
