import Checkout from "./Checkout";

type Props = {
  totalAmount: number;
  carts: [
    {
      _id: string;
      title: string;
      productId: string;
      image: string;
      price: number;
      items: number;
    },
  ];
};

function TotalAmount({ totalAmount, carts }: Props) {
  return (
    <div className='md:w-[400px] px-4 py-2 bg-gray-100 flex flex-col h-[200px] lg:mr-1'>
      <h1 className='text-2xl'>Total Amount</h1>
      <p className='text-lg flex-1'>Rs. {totalAmount}</p>
      <Checkout
        item={carts}
        totalAmount={totalAmount}
      />
    </div>
  );
}

export default TotalAmount;
