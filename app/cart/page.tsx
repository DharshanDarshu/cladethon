import { cookies } from "next/headers";
import Carts from "../../components/Carts/Carts";
import CartWithOutLogin from "../../components/Carts/CartWithOutLogin";

async function CartPage() {
  const nextCookies = cookies();
  const token = nextCookies.get("user");
  const user = token && JSON.parse(token?.value);
  console.log(user);

  let carts;

  if (user) {
    const cartsResponse = await fetch(
      `${process.env.RESTFUL_API}/carts/${user.email}`,
      { cache: "no-store" },
    );

    carts = await cartsResponse.json();
  }

  return (
    <div className=''>
      {user ? (
        <Carts
          carts={carts.carts}
          email={carts.email}
        />
      ) : (
        <CartWithOutLogin />
      )}
    </div>
  );
}

export default CartPage;
