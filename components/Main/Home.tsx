import { use } from "react";
import AdsBanner from "../Banners/AdsBanner";
import SliderComponent from "../Banners/Slider";
import TopBanner from "../Banners/TopBanner";
import Categories from "../Categories";
import OpenPop from "../OpenPop";
import Products from "../Products/Products";
import SubCategories from "../SubCategories/SubCategories";
import Picks from "../TopPicks/Picks";

const getCatgories = async () => {
  const response = await fetch(
    `${process.env.RESTFUL_API}/category`,
  );

  const categories = await response.json();

  return categories;
};

const getProducts = async () => {
  const productResponse = await fetch(
    `${process.env.RESTFUL_API}/products`,
  );
  const products = await productResponse.json();
  return products;
};

function Home() {
  const categories = use(getCatgories());
  const products = use(getProducts());
  return (
    <>
      {/* <OpenPop /> */}
      <SliderComponent />
      <div className='max-w-[95vw] mx-auto'>
        <Categories categories={categories} />
        <TopBanner />
        <Picks />
        <Products products={products} />
      </div>
      <SubCategories />
      <div className='max-w-[95vw] mx-auto'>
        <AdsBanner />
      </div>
    </>
  );
}

export default Home;
