import { cookies } from "next/headers";
import Customer from "../../components/Customer";

function CustomerPage() {
  const nextCookies = cookies();
  const accessToken = nextCookies.get("access_token");
  const accesstoken =
    accessToken && JSON.parse(accessToken?.value);
  return (
    <div className='bg-red-200 flex items-center justify-center py-4 h-screen'>
      {accesstoken ? (
        <Customer />
      ) : (
        <p>You need to Login?</p>
      )}
    </div>
  );
}

export default CustomerPage;
