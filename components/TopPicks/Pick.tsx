import Image from "next/image";
import Link from "next/link";

type Props = {
  image: string;
  link: string;
};

function Pick({ image, link }: Props) {
  return (
    <Link
      href={link}
      className='hover:scale-105 transition-all duration-300 ease-out cursor-pointer'>
      <Image
        src={image}
        width={800}
        height={800}
        alt=''
        unoptimized={true}
        className='w-full h-full'
      />
    </Link>
  );
}

export default Pick;
