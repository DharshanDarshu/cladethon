import { cookies } from "next/headers";

import Main from "../../components/Carts/Main";

function CartPage() {
  const nextCookies = cookies();
  const accessToken = nextCookies.get("access_token");
  const accesstoken =
    accessToken && JSON.parse(accessToken?.value);
  return (
    <div className=''>
      {accesstoken ? <Main /> : <p>You need to login</p>}
    </div>
  );
}

export default CartPage;
