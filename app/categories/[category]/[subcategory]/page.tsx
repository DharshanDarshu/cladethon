import Link from "next/link";
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
  const decodedCategory = decodeURI(category);
  const decodedSubCategory = decodeURI(subcategory);
  const productResponse = await fetch(
    `${process.env.RESTFUL_API}/products?category=${decodedCategory}&subcategory=${decodedSubCategory}`,
  );

  const products = await productResponse.json();
  return (
    <div>
      <div className='flex space-x-2 mx-12 my-4 text-sm'>
        <Link
          href='/'
          className='cursor-pointer'>
          Home
        </Link>
        <Link
          href={`/categories/${decodedCategory}`}
          className='cursor-pointer'>{`/  ${decodedCategory}`}</Link>
        <p className='text-red-500 font-semibold lowercase'>{`/    ${decodedSubCategory}`}</p>
      </div>
      <Products products={products} />
    </div>
  );
}

export default SubCategoryPage;
