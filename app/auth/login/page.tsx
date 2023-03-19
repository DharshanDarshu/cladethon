import { cookies } from "next/headers";
import Login from "../../../components/Auth/Login";

function LoginPage() {
  const nextCookies = cookies();
  const token = nextCookies.get("access_token");
  const user = token && JSON.parse(token?.value);
  return (
    <div>
      <Login user={user} />
    </div>
  );
}

export default LoginPage;
