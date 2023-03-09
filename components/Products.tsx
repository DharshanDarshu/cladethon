import { title } from "process";
import Product from "./Product";

type Props = {
  products: [
    {
      _id: string;
      title: string;
      price: number;
      description: string;
      brand: string;
      category: string;
      subcategory: string;
      image: string;
    },
  ];
};

function Products({ products }: Props) {
  return (
    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mx-8 my-4 lg:mx-12 lg:my-6'>
      {products.map(
        ({ image, _id, description, title, price }) => (
          <Product
            key={_id}
            id={_id}
            image={image}
            title={title}
            description={description}
            price={price}
          />
        ),
      )}
    </div>
  );
}

export default Products;
