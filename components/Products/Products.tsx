import Product from "../Product";

type Props = {
  products: [
    {
      _id: string;
      title: string;
      price: number;
      description: string;
      category: string;
      image: string;
      offer_details: string;
      rating: {
        rate: number;
        count: number;
      };
    },
  ];
};

function Products({ products }: Props) {
  function getRandom(arr: any, n: any) {
    var result = new Array(n),
      len = arr.length,
      taken = new Array(len);
    if (n > len)
      throw new RangeError(
        "getRandom: more elements taken than available",
      );
    while (n--) {
      var x = Math.floor(Math.random() * len);
      result[n] = arr[x in taken ? taken[x] : x];
      taken[x] = --len in taken ? taken[len] : len;
    }
    return result;
  }

  const randomProduct = getRandom(
    products,
    products.length,
  );

  return (
    <div className='mx-2 my-10'>
      <div className='grid grid-cols-4 gap-y-10'>
        {randomProduct.map(
          (product, index) =>
            index < 16 && (
              <Product
                key={product._id}
                id={product._id}
                image={product.image}
                title={product.title}
                description={product.description}
                price={product.price}
                offer_details={product.offer_details}
              />
            ),
        )}
      </div>
    </div>
  );
}

export default Products;
