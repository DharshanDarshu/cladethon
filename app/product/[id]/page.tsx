import SingleProduct from "../../../components/SingleProduct";

type Props = {
  params: {
    id: string;
  };
};

async function ProductPage({ params: { id } }: Props) {
  const productResponse = await fetch(
    `${process.env.RESTFUL_API}/products/${id}`,
  );

  const product = await productResponse.json();
  return (
    <div>
      <SingleProduct product={product} />
    </div>
  );
}

export default ProductPage;
