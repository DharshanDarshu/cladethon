import Signup from "../../../components/Auth/Signup";

type Props = {
  searchParams: {
    email: string;
  };
};

function SignUp({ searchParams: { email } }: Props) {
  console.log(email);
  return (
    <div>
      <Signup email={email} />
    </div>
  );
}

export default SignUp;
