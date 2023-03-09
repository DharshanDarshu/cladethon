import { loadStripe } from "@stripe/stripe-js";
import axios from "axios";

type Props = {
  item: [
    {
      _id: string;
      title: string;
      productId: string;
      image: string;
      price: number;
      items: number;
    },
  ];
  totalAmount: number;
};

function Checkout({ item, totalAmount }: Props) {
  const publishableKey =
    process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY;
  const stripePromise = loadStripe(publishableKey || "");

  const createCheckOutSession = async () => {
    console.log("result");

    const stripe = await stripePromise;
    const checkoutSession = await axios.post(
      "/api/stripe-session",
      {
        item: item,
        totalAmount: totalAmount,
      },
    );
    const result = await stripe?.redirectToCheckout({
      sessionId: checkoutSession.data.id,
    });

    if (result?.error) {
      alert(result?.error.message);
      return;
    }
  };

  return (
    <>
      <button
        onClick={createCheckOutSession}
        className='bg-green-600 text-white py-2 rounded-md'>
        Order Now
      </button>
    </>
  );
}

export default Checkout;
