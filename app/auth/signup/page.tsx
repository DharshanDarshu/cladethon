import Signup from "../../../components/Auth/Signup";

// type Props = {
//   searchParams: {
//     email: string;
//   };
// };

function SignUp(props: any) {
  const email = props.searchParams.email || "";
  console.log(email);
  return (
    <div>
      <Signup email={email} />
    </div>
  );
}

export default SignUp;
