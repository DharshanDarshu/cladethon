import { cookies } from "next/headers";
import SingleOrder from "../../../components/SingleOrder";

type Props = {
  params: {
    id: string;
  };
};

async function OrderSinglePage({ params: { id } }: Props) {
  const nextCookies = cookies();
  const accessToken = nextCookies.get("access_token");
  const accesstoken =
    accessToken && JSON.parse(accessToken?.value);
  const orderRes = await fetch(
    `${process.env.RESTFUL_API}/orders/one/${id}`,
    {
      headers: {
        Authorization: "Bearer " + accesstoken,
      },
    },
  );

  const order = await orderRes.json();
  return (
    <div>
      <SingleOrder order={order} />
    </div>
  );
}

export default OrderSinglePage;
