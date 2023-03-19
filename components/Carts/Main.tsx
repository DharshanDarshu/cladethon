import { cookies } from "next/headers";
import Carts from "./Carts";
import CartWithOutLogin from "./CartWithOutLogin";

function Main() {
  const nextCookies = cookies();
  const accessToken = nextCookies.get("access_token");
  const accesstoken =
    accessToken && JSON.parse(accessToken?.value);

  return (
    <div>
      {accesstoken ? (
        <Carts token={accesstoken} />
      ) : (
        <CartWithOutLogin />
      )}
    </div>
  );
}

export default Main;
