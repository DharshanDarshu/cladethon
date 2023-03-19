type Props = {
  product: {
    _id: number;
    title: string;
    price: number;
    description: string;
    category: string;
    image: string;
    rating: {
      rate: number;
      count: number;
    };
  };
};
function Product({ product }: Props) {
  return (
    <div className='w-[280px]'>
      <div className='flex items-center justify-center w-full h-[260px] bg-white-200'>
        <img
          className='w-full'
          src={`http://localhost:4000/image/${product.image}`}
          alt=''
        />
      </div>
      <div className='h-[60px] mt-6'>
        <h1 className='font-semibold'>{product.title}</h1>
        <p>Rs {product.price}</p>
      </div>
    </div>
  );
}

export default Product;
