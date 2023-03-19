import React from "react";
import ResetPassword from "../../../../components/ResetPassword";

type Props = {
  searchParams: {
    email: string;
  };
};

function ResetPage({ searchParams: { email } }: Props) {
  const decryptedEmail = atob(email);
  return (
    <div className='w-screen bg-pink-100 h-[calc(100vh-80px)] py-8'>
      <ResetPassword email={decryptedEmail} />
    </div>
  );
}

export default ResetPage;
