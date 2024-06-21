import React, { useState, useEffect } from "react";
import "./BannerList.css";
import BannerImg00 from "../../assets/images/branding/carrousel-berry-fields.png";
import BannerImg01 from "../../assets/images/branding/carrousel-berry-fields.png";

export const BannerList = () => {

  const images = [
    BannerImg00,
    BannerImg01
  ]

  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const goToSlide = (index) => {
    setCurrentIndex(index);
  };

  return (
    <>
       <div className="slider-container">
            <div 
                className="slider"
                style={{ transform: `translateX(-${currentIndex * 100}%)` }}
            >
                {images.map((image, index) => (
                    <div className="slide" key={index}>
                        <img src={image} alt={`Imagen ${index + 1}`} />
                    </div>
                ))}
            </div>
            <div className="dots">
                {images.map((_, index) => (
                    <span
                        key={index}
                        className={`dot ${index === currentIndex ? 'active' : ''}`}
                        onClick={() => goToSlide(index)}
                    ></span>
                ))}
            </div>
        </div>
    </>
  );
};
