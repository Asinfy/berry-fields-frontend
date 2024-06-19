import React, { useContext, useEffect, useState, useRef } from "react";
import "./ProductPromotions.css";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import { CartContext } from "../../contexts/ShoppingCartContext";
import IconProm from "../../assets/images/branding/Promo-Icon.png";

export const ProductPromotions = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [inputValues, setInputValues] = useState({});
  const [error, setError] = useState(null);
  let sliderRef = useRef(null);

  const {
    allProducts,
    setAllProducts,
    total,
    setTotal,
    setCountProducts,
    productList,
    filterProduct
  } = useContext(CartContext);

  const onAddProducts = (product) => {
    const inputValue = inputValues[product.id] || 1;
    if (allProducts.find((item) => item.id=== product.id)) {
      const updatedProducts = allProducts.map((item) =>
        item.id=== product.id
          ? {
              ...item,
              quantity: parseInt(item.quantity) + parseInt(inputValue),
            }
          : item
      );

      setTotal(parseInt(total) + parseInt(inputValue) * parseInt(product.price));
      setCountProducts(getTotalQuantity());
      setAllProducts(updatedProducts);
    } else {
      const newProduct = { ...product, quantity: parseInt(inputValue) };
      setTotal(parseInt(total) + parseInt(product.price) * parseInt(inputValue));
      setCountProducts(getTotalQuantity());
      setAllProducts([...allProducts, newProduct]);
    }
  };
  
  const getTotalQuantity = () => {
    return allProducts.reduce((acc, product) => acc + product.quantity, 1);
  };

  const next = () => {
    sliderRef.slickNext();
  };
  const previous = () => {
    sliderRef.slickPrev();
  };
  const settings = {
    dots: false,
    infinite: true,
    slidesToShow: 5,
    slidesToScroll: 1,
    autoplay: true,
    initialSlide: 1,
    arrows: false,
    className: "promotion-cards",
    responsive: [
      {
        breakpoint: 1600,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 1200,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 992,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 576,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };
  const renderProducts = () => {
    return (
      <div className="promotion-content">
        <Slider
          ref={(slider) => {
            sliderRef = slider;
          }}
          {...settings} className="promotion-cards"
        >
          {productList.flatMap((product) =>
            product.Promotion === "Si" ? (
              <div className="col-promotion-card"key={product.id}>
              <div className="promotion-card" >
                <div className="promotion-card-top">
                  <img
                    className="promotion-label"
                    src={IconProm}
                    alt="Etiqueta de Promoción."
                  ></img>
                  <div className="product-image">
                    <img src={product.image} alt="Etiqueta de Producto." />
                  </div>
                </div>
                <div className="promotion-card-bottom">
                  <span className="category">{product.category}</span>
                  <span className="title"> {product.name}</span>
                  <span className="weight">{product.characteristics.toLowerCase() !== product.name ? product.characteristics: ''}</span>
                  <span className="price">${new Intl.NumberFormat('es-CL').format(product.price)} COP</span>
                  <div className="card-product-cart">
                    <div className="card-product-buy-button">
                      <button className="product-add" onClick={() => onAddProducts(product)}>
                        <span>{allProducts.find(item => item.id === product.id)?`Agregado (${allProducts.find(item =>item.id === product.id)?.quantity})`: 'Agregar'}</span>
                        <i className="fa-solid fa-cart-shopping"></i>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              </div>
            ) : (
              ""
            )
          )}
        </Slider>
      </div>
    );
  };

  return (
    <>
      <section className="promotion-section">
        <div className="promotion-header">
          <div className="promotion-title">
            <h2>Nuestras Ofertas</h2>
          </div>
          <div className="promotion-more">
            <button className="promotion-button-more">Ver más</button>
          </div>
        </div>
        <div className="promotion-content">
          {productList.length > 0 ? (
            renderProducts()
          ) : (
            <p>{error}</p>
          )}
          <button className="promotion-button prev-btn" onClick={previous}>
            <i className="fa-solid fa-arrow-left"></i>
          </button>
          <button className="promotion-button next-btn" onClick={next}>
            <i className="fa-solid fa-arrow-right"></i>
          </button>
        </div>
      </section>
    </>
  );
};