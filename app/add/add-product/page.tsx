import { cookies } from "next/headers";
import React from "react";
import AddForm from "../../../components/AddForm";

function page() {
  const nextCookies = cookies();
  const token = nextCookies.get("user");
  const user = token && JSON.parse(token?.value);
  const admin = process.env.ADMIN;
  return (
    <div className='flex justify-center py-6 bg-stone-100'>
      {user?.email === admin ? (
        <AddForm />
      ) : (
        <p>You can't access this page</p>
      )}
    </div>
  );
}

export default page;
