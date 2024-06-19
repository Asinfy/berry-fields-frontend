import React, { useContext, useState, useEffect, useRef } from "react";
import { CartContext } from "../../../contexts/ShoppingCartContext";
import "./Header.css";
import LogoBerry from "../../../assets/images/branding/logo-berry.svg";
import LogoAsinfy from "../../../assets/images/branding/logo-asinfy.svg";
import LogoWompi from "../../../assets/images/branding/wompi-logo-principal.png";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { ScrollingText } from "../scrolling-text/ScrollingText";

export const Header = () => {
  const {
    total,
    countProducts,
    productList,
    setProductList,
    filterProduct,
    setFilterProduct,
    search,
    setSearch,
  } = useContext(CartContext);
  const [searchTerm, setSearchTerm] = useState("");
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (Array.isArray(productList)) {
      setProducts(productList);
    } else {
      setProducts([]);
    }
  }, [productList]);

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
    setSearch(event.target.value);
  };
  useEffect(() => {
    const filteredProducts = Array.isArray(products)
      ? products.filter(
          (product) =>
            product.characteristics
              .toLowerCase()
              .startsWith(searchTerm.toLowerCase())
          /* product.characteristics.toLowerCase().includes(searchTerm.toLowerCase()) */
        )
      : [];
    setFilterProduct(filteredProducts);
  }, [products, searchTerm]);

  const handleButtonClick = () => {
    navigate("/", { state: { scrollToProductos: true } });
  };

  const location = useLocation();

  return (
    <>
      <header>
        <div className="navbar">
          <ScrollingText></ScrollingText>
          <div className="navbar-main">
            <div className="logo-header">
              <Link to="/">
                <img src={LogoBerry} alt="Logo de BerryFields."></img>
              </Link>
            </div>
            <div className="navbar-items">
              {location.pathname !== "/carrito" &&
                location.pathname !== "/politica" && (
                  <div className="navbar-item">
                    <div className="search-box">
                      <input
                        className="search-input"
                        type="search"
                        placeholder="Buscar producto..."
                        value={searchTerm}
                        onChange={handleSearchChange}
                      />
                      <button
                        className="search-button"
                        type="button"
                        onClick={handleButtonClick}
                      >
                        <i className="fa-solid fa-magnifying-glass"></i>
                      </button>
                    </div>
                    <div className="cart-info">
                      <div className="cart-input">
                        <Link
                          to="/carrito"
                          className="cart-button"
                          type="button"
                        >
                          {countProducts === 0 ? (
                            ""
                          ) : (
                            <span className="count-cart">{countProducts}</span>
                          )}
                          <i className="fa-solid fa-cart-shopping" />
                        </Link>
                      </div>
                      <div className="cart-text">
                        <span className="cart-title">Tu carrito</span>
                        <span className="cart-price">
                          ${new Intl.NumberFormat("es-CL").format(total)} COP
                        </span>
                      </div>
                    </div>
                  </div>
                )}

              {location.pathname === "/carrito" && (
                <div className="navbar-item">
                  <div className="navbar-title">
                    <p>
                      Tu compra es <strong>100%</strong> <span>Segura</span> y{" "}
                      <span>Confiable.</span>
                    </p>
                  </div>
                  <div className="navbar-logo">
                    <img src={LogoWompi} alt="" />
                  </div>
                </div>
              )}

              {location.pathname === "/politica" && (
                <div className="navbar-item">
                  <div className="navbar-title">
                    <p>
                      BerryFields es <strong>100%</strong> <span>Segura</span> y{" "}
                      <span>Confiable.</span>
                    </p>
                  </div>
                  <div className="navbar-logo">
                    <img src={LogoAsinfy} alt="" />
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
        <div className="header-mb">
          <div className="navbar-item">
            {location.pathname !== "/carrito" &&
              location.pathname !== "/politica" && (
                <div className="search-box">
                  <input
                    className="search-input"
                    type="search"
                    placeholder="Buscar producto..."
                    value={searchTerm}
                    onChange={handleSearchChange}
                  />
                  <button
                    className="search-button"
                    type="button"
                    onClick={handleButtonClick}
                  >
                    <i className="fa-solid fa-magnifying-glass"></i>
                  </button>
                </div>
              )}
            {location.pathname === "/carrito" && (
              <div className="navbar-title">
                <p>
                  Tu compra es <strong>100%</strong> <span>Segura</span> y{" "}
                  <span>Confiable.</span>
                </p>
              </div>
            )}

            {location.pathname === "/politica" && (
              <div className="navbar-title">
                <p>
                  BerryFields es <strong>100%</strong> <span>Segura</span> y{" "}
                  <span>Confiable.</span>
                </p>
              </div>
            )}
          </div>
        </div>
      </header>
    </>
  );
};
