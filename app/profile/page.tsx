import React from "react";
import Profile from "../../components/Profile";

type Props = {
  searchParams: {
    edit: string;
    changePassword: string;
  };
};

function ProfilePage({
  searchParams: { edit, changePassword },
}: Props) {
  return (
    <div className='w-screen bg-pink-100 h-[calc(100vh-80px)] py-8'>
      <Profile
        edit={edit}
        changePassword={changePassword}
      />
    </div>
  );
}

export default ProfilePage;
