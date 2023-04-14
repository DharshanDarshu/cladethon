import Image from "next/image";
import Link from "next/link";

type Props = {
  id: string;
  category: string;
  image: string;
};

function Category({ category, image, id }: Props) {
  return (
    <div className='relative md:w-[310px]  min-h-[120px] cursor-pointer'>
      <Link href={`/categories/${category}`}>
        <Image
          src={`${process.env.RESTFUL_API}/image/${image}`}
          alt={category}
          unoptimized={true}
          className='w-full h-full object-cover rounded-xl'
          width={100}
          height={100}
        />
        <h2 className='absolute top-2 text-white text-center w-full text-lg font-semibold capitalize'>
          {category}
        </h2>
      </Link>
    </div>
  );
}

export default Category;
