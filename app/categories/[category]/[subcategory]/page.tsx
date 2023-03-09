import Products from "../../../../components/Products";

type Props = {
  params: {
    category: string;
    subcategory: string;
  };
};

async function SubCategoryPage({
  params: { category, subcategory },
}: Props) {
  const productResponse = await fetch(
    `${process.env.RESTFUL_API}/products?category=${category}&subcategory=${subcategory}`,
  );

  const products = await productResponse.json();
  return (
    <div>
      <div className='flex space-x-2 mx-12 my-4 text-sm'>
        <p className='cursor-pointer'>Home</p>
        <p className='cursor-pointer'>{`/  ${category}`}</p>
        <p className='text-red-500 font-semibold'>{`/    ${subcategory}`}</p>
      </div>
      <Products products={products} />
    </div>
  );
}

export default SubCategoryPage;
