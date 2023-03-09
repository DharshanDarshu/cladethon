import Check from "../../components/Carts/Check";

type Props = {
  searchParams: {
    status: string;
  };
};

function CheckoutPage({ searchParams: { status } }: Props) {
  return (
    <div>
      <Check status={status} />
    </div>
  );
}

export default CheckoutPage;
