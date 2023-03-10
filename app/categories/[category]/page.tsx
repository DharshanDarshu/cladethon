import Products from "../../../components/Products";
import SubCategories from "../../../components/SubCategories";

type Props = {
  params: {
    category: string;
  };
};

async function CategoryPage({
  params: { category },
}: Props) {
  const response = await fetch(
    `${process.env.RESTFUL_API}/category/${category}`,
  );

  const productResponse = await fetch(
    `${process.env.RESTFUL_API}/products?category=${category}s`,
  );

  const products = await productResponse.json();

  const data = await response.json();

  return (
    <div>
      <SubCategories subcategories={data} />
      <Products products={products} />
    </div>
  );
}

export default CategoryPage;
