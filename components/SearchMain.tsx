import { use } from "react";
import Filter from "./Filter";
import Products from "./Products";

type Props = {
  search: string;
};

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

const getProducts = async (search: string) => {
  const responseCat = await fetch(
    `${process.env.RESTFUL_API}/products/search/category?search=${search}`,
  );

  const data = await responseCat.json();

  return getRandom(data, data.length);
};

function SearchMain({ search }: Props) {
  const products: any = use(getProducts(search));
  return (
    <div>
      <div className='flex items-center justify-between px-12'>
        <h1 className='my-6 font-semibold'>
          Search For:{" "}
          <span className='text-red-500 text-lg'>
            {search}
          </span>
        </h1>
        <Filter />
      </div>

      <div className='py-2 border-t border-gray-100'>
        <Products products={products} />
      </div>
    </div>
  );
}

export default SearchMain;
