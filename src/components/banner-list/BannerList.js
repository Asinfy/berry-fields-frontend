import React from 'react';
import Slider from "react-slick";
import "./BannerList.css";
import BannerImg from "../../assets/images/branding/carrousel-berry-fields.png";

export const BannerList = () => {
  const settings = {
    className: "slider",
    dots: false,
    infinite: true,
    autoplay: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1
  };
  
  return (
    <>
     <section className="banner-section">
        <Slider {...settings}>
          <div className="slide">
            <img src={BannerImg} className="banner-img" alt=""></img>
          </div>
          <div className="slide">
            <img src={BannerImg} className="banner-img" alt=""></img>
          </div>
        </Slider>
      </section>
    </>
  )
}
