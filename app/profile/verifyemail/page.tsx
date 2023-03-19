import { cookies } from "next/headers";
import React from "react";
import Verify from "../../../components/Auth/Verify";

function VerifyEmailPage(props: any) {
  const nextCookies = cookies();
  const accesstoken = nextCookies.get("access_token");
  const accessToken =
    accesstoken && JSON.parse(accesstoken?.value);
  return (
    <div className=''>
      {/* <VerifyEmail /> */}
      <Verify
        profile={props.searchParams.profile}
        token={accessToken}
        forgetten={null}
      />
    </div>
  );
}

export default VerifyEmailPage;
