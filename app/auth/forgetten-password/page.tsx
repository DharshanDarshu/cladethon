import React from "react";
import Verify from "../../../components/Auth/Verify";
import VerifyEmail from "../../../components/VerifyEmail";

type Props = {
  searchParams: {
    forgetten: string | null;
  };
};

function ForgettenPasswordPage({
  searchParams: { forgetten },
}: Props) {
  return (
    <div>
      <VerifyEmail />
    </div>
  );
}

export default ForgettenPasswordPage;
