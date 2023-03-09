import AdsBanner from "../components/Banners/AdsBanner";
import Slider from "../components/Banners/Slider";
import TopBanner from "../components/Banners/TopBanner";
import Categories from "../components/Categories";
import Products from "../components/Products/Products";
import SubCategories from "../components/SubCategories/SubCategories";
import Picks from "../components/TopPicks/Picks";

async function HomePage() {
  const response = await fetch(
    `${process.env.RESTFUL_API}/category`,
  );
  const productResponse = await fetch(
    `${process.env.RESTFUL_API}/products`,
  );

  const categories = await response.json();
  const products = await productResponse.json();

  return (
    <div className='my-4 md:my-8 lg:my-12'>
      <Slider />
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
    </div>
  );
}

export default HomePage;
