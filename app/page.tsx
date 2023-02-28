import Slider from "../components/Banners/Slider";
import TopBanner from "../components/Banners/TopBanner";
import Categories from "../components/Categories";

function HomePage() {
  return (
    <div className='my-12'>
      <Slider />
      <div className='max-w-[95vw] mx-auto'>
        <Categories />
        <TopBanner />
      </div>
    </div>
  );
}

export default HomePage;
