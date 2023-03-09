import Fail from "./Fail";
import Success from "./Success";

type Props = {
  status: string;
};

function Check({ status }: Props) {
  console.log(status);
  return (
    <div className='flex h-[calc(100vh-90px)] items-center justify-center'>
      {status === "success" && <Success />}
      {status === "cancel" && <Fail />}
    </div>
  );
}

export default Check;
