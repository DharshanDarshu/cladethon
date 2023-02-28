"use client";

import Image from "next/image";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

function SliderComponent() {
  const settings = {
    dots: true,
    dotsClass: "slick-dots slick-thumb",
    fade: true,
    infinite: true,
    speed: 500,
    autoplay: true,
    autoplaySpeed: 4000,
    cssEase: "ease-in",
    slidesToShow: 1,
    slidesToScroll: 1,
    pauseOnHover: true,
  };

  const bannerArray = [
    "/assests/myntra1.jpg",
    "/assests/myntra2.jpg",
    "/assests/myntra3.jpg",
    "/assests/myntra4.jpg",
    "/assests/myntra5.jpg",
    "/assests/myntra6.jpg",
    "/assests/myntra7.jpg",
    "/assests/myntra8.jpg",
    "/assests/myntra9.jpg",
    "/assests/myntra10.jpg",
  ];
  return (
    <Slider {...settings}>
      {bannerArray.map((banner) => (
        <div>
          <Image
            src={banner}
            className='w-full'
            width={800}
            height={800}
            priority
            alt=''
          />
        </div>
      ))}
    </Slider>
  );
}

export default SliderComponent;
