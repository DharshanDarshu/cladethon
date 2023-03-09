function NoItem() {
  return (
    <div className='h-[calc(100vh-140px)] w-screen overflow-hidden flex flex-col items-center justify-center'>
      <img
        className='h-1/2 object-contain'
        src='https://thumbs.dreamstime.com/b/bolso-del-carro-de-la-compra-que-muestra-el-pago-y-env%C3%ADo-de-la-cesta-34213494.jpg'
        alt=''
      />
      <div className='flex flex-col items-center space-x-8 mt-6'>
        <h2 className='text-xl text-gray-700 font-semibold'>
          Hey, it feels so ligth!
        </h2>
        <p className='text-sm text-gray-600'>
          There is nothing in your bag. let's add some items
        </p>
      </div>
      <button className='py-[8px] font-semibold tracking-wide rounded-sm px-4 border border-rose-500 text-rose-500 uppercase text-sm mt-8'>
        Add items from wishlist
      </button>
    </div>
  );
}

export default NoItem;
