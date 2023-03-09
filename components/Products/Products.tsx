import Product from "./Product";

type Props = {
  products: [
    {
      id: number;
      title: string;
      price: number;
      description: string;
      category: string;
      image: string;
      rating: {
        rate: number;
        count: number;
      };
    },
  ];
};

function Products({ products }: Props) {
  return (
    <div className='mx-2 my-10'>
      <div className='grid grid-cols-4 gap-y-20 gap-x-4'>
        {products.map((product) => (
          <Product
            key={product.id}
            product={product}
          />
        ))}
      </div>
    </div>
  );
}

export default Products;
