import { cookies } from "next/headers";
import Image from "next/image";
import RatingInput from "./RatingInput";

type Props = {
  order: any;
};

function SingleOrder({ order }: Props) {
  const nextCookies = cookies();
  const accessToken = nextCookies.get("access_token");
  const accesstoken =
    accessToken && JSON.parse(accessToken?.value);
  return (
    <div className='flex py-10 px-12 space-x-12'>
      <Image
        src={`${process.env.RESTFUL_API}/image/${order.image}`}
        alt={order.title}
        width={800}
        height={800}
        priority
        className='w-full h-full'
      />
      <div className='w-full'>
        <h1 className='text-xl font-semibold capitalize'>
          {order.title}
        </h1>
        <p className=''>
          Order Data: {order?.order_date?.split("T")[0]}
        </p>
        <RatingInput
          id={order.productId}
          token={accesstoken}
        />
      </div>
    </div>
  );
}

export default SingleOrder;
