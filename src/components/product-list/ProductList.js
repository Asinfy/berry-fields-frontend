import React, { useContext, useEffect, useState,useRef } from "react";
import "./ProductList.css";
import { CartContext } from "../../contexts/ShoppingCartContext";
import { useLocation } from 'react-router-dom';

export const ProductList = () => {
  const [inputValues, setInputValues] = useState({});
  const [error, setError] = useState(null);
  const [products, setProducts] = useState([]);
  const {
    allProducts,
    setAllProducts,
    total,
    setTotal,
    setCountProducts,
    filterProduct,
    search
  } = useContext(CartContext);

  const location = useLocation();
  const productosRef = useRef(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setProducts(filterProduct)
      } catch (error) {
        setError("Error al obtener los productos");
        console.error("Error al obtener los productos", error);
      }
    };

    fetchProducts();
  }, [filterProduct]);

  useEffect(() => {
    if (location.state?.scrollToProductos && productosRef.current) {
      productosRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [location]);

  const handleInputChange = (event, produId) => {
    const value = event.target.value;
    setInputValues(prevInpuntValues => ({
      ...prevInpuntValues,
      [produId]: value
    }));
  };

  const onAddProducts = product => {
    const inputValue = inputValues[product.id] || 1;
    if (allProducts.find(item => item.id === product.id)) {
      const updatedProducts = allProducts.map(item =>
        item.id === product.id
          ? { ...item, quantity: parseInt(item.quantity) + parseInt(inputValue) }
          : item
      );

      setTotal(total + parseInt(inputValue) * parseInt(product.price));
      setCountProducts(getTotalQuantity());
      setAllProducts(updatedProducts);
    } else {
      const newProduct = { ...product, quantity: parseInt(inputValue) };
      setTotal(total + parseInt(product.price) * parseInt(inputValue));
      setCountProducts(getTotalQuantity());
      setAllProducts([...allProducts, newProduct]);
    }
  };

  const getTotalQuantity = () => {
    return allProducts.reduce((acc, product) => acc + product.quantity, 1);
  };

  const renderProducts = () => {
    return (
      <div className="product-content">
        <div className="product-cards">
          {filterProduct.length > 0 ?
          filterProduct.flatMap((product) =>
            product.Promotion === "No" && filterProduct.length > 0 ? (
              <div className="col-product-content" key={product.id}>
                <div className="product-card">
                  <div className="product-card-top">
                    <div className="product-image">
                      <img src={product.image} alt="Etiqueta de Producto." />
                    </div>
                  </div>
                  <div className="product-card-bottom">
                    <span className="category">{product.category}</span>
                    <span className="title"> {product.name}</span>
                    <span className="weight">{product.name.toLowerCase() !== product.characteristics ? product.characteristics : ''}</span>
                    <span className="price">${new Intl.NumberFormat('es-CL').format(product.price)} COP</span>
                    <div className="card-product-cart">
                      <div className="card-product-buy-button">
                        <button className="product-add" onClick={() => onAddProducts(product)}>
                          <span>{allProducts.find(item => item.id === product.id) ? `Agregado (${allProducts.find(item => item.id === product.id)?.quantity})` : 'Agregar'}</span>
                          <i className="fa-solid fa-cart-shopping" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ) : ""
          ):(
            <p>Revisa la ortografía de la palabra o utiliza palabras clave.</p>
          )
          }
        </div>
      </div>
    );
  };

  return (
    <>
      <section className="product-section" id="productos" ref={productosRef}>
        <div className="product-header">
          <div className="product-title">
            <h2>
            {!search.length > 0 ? "Nuestro Portafolio" : !filterProduct.length > 0 ? `No hay productos que coincidan con tu búsqueda de: "${search}".` : `Busqueda relacionada de: "${search}".` }
            </h2>
          </div>
        </div>
          {renderProducts()}
      </section>
    </>
  );
};
