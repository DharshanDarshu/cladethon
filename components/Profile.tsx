import { cookies } from "next/headers";
import Link from "next/link";
import ChangePassword from "./ChangePassword";
import EditProfile from "./EditProfile";
import ProfileDetails from "./ProfileDetails";

type Props = {
  edit: string;
  changePassword: string;
};

function Profile({ edit, changePassword }: Props) {
  const cookie = cookies();
  const token = cookie.get("user");
  const user = token && JSON.parse(token.value);
  const accesstoken = cookie.get("access_token");
  const accessToken =
    accesstoken && JSON.parse(accesstoken.value);
  return (
    <>
      {user ? (
        edit ? (
          changePassword ? (
            <ChangePassword token={accessToken} />
          ) : (
            <EditProfile
              user={user}
              token={accessToken}
            />
          )
        ) : (
          <ProfileDetails user={user} />
        )
      ) : (
        <div className='max-w-[40vw] py-8 flex items-center justify-between flex-col mx-auto bg-white h-[200px]'>
          <h1 className='text-center text-2xl'>
            You need to Login, to see Profile Details
          </h1>
          <p className='flex-1 text-sm text-gray-500    '>
            Either sign in to your account or sign up
          </p>
          <div>
            <div className='flex space-x-8 mt-6'>
              <Link
                href='/auth/login'
                className='bg-yellow-400 py-1 px-6 rounded-md outline-8 border border-orange-400 outline-offset-1 outline-orange-600 shadow-md'>
                Sign in to your account
              </Link>
              <Link
                href='/auth/signup'
                className='border border-gray-300 rounded-md px-6 py-1 shadow-md'>
                Sign Up
              </Link>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Profile;
