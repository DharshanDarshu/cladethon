import Link from "next/link";

function CartWithOutLogin() {
  return (
    <div className='h-[calc(100vh-80px)] overflow-hidden flex flex-col items-center justify-center'>
      <img
        className='h-3/4 object-contain'
        src='https://thumbs.dreamstime.com/b/bolso-del-carro-de-la-compra-que-muestra-el-pago-y-env%C3%ADo-de-la-cesta-34213494.jpg'
        alt=''
      />
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
  );
}

export default CartWithOutLogin;
