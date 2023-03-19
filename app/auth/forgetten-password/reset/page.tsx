import React from "react";
import ResetPassword from "../../../../components/ResetPassword";

function ResetPage(props: any) {
  const decryptedEmail = atob(
    props.searchParams.email || "",
  );
  return (
    <div className='w-screen bg-pink-100 h-[calc(100vh-80px)] py-8'>
      <ResetPassword email={decryptedEmail} />
    </div>
  );
}

export default ResetPage;
