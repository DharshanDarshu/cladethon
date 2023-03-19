import { cookies } from "next/headers";
import React from "react";
import Verify from "../../../components/Auth/Verify";

type Props = {
  searchParams: {
    profile: string;
  };
};

function VerifyEmailPage({
  searchParams: { profile },
}: Props) {
  const nextCookies = cookies();
  const accesstoken = nextCookies.get("access_token");
  const accessToken =
    accesstoken && JSON.parse(accesstoken?.value);
  return (
    <div className=''>
      {/* <VerifyEmail /> */}
      <Verify
        profile={profile}
        token={accessToken}
        forgetten={null}
      />
    </div>
  );
}

export default VerifyEmailPage;
