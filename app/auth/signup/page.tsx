import Signup from "../../../components/Auth/Signup";

function SignUp(props: any) {
  const email = props.searchParams.email || "";
  return (
    <div>
      <Signup email={email} />
    </div>
  );
}

export default SignUp;
