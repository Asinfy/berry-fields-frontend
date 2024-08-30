import React, { useContext, useState, useEffect } from "react";
import { CartContext } from "../../contexts/ShoppingCartContext";
import "./Home.css";
import { BannerList } from '../../components/banner-list/BannerList';
import { ProductPromotions } from '../../components/product-promotions/ProductPromotions';
import { ProductList } from '../../components/product-list/ProductList';
import { Loading } from "../../components/layouts/loading/Loading";
import { CSSTransition } from "react-transition-group";
import axios from "axios";
import { BannerBerryFields } from "../../components/layouts/banner-berryfields/BannerBerryFields";
import { Error } from "../error/Error"

export const Home = () => {
  const { productList, setProductList } = useContext(CartContext);

  const [inputValues, setInputValues] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(
          "https://zoho.accsolutions.tech/API/v1/Productos_Berry"
        );
        const modifiedProducts = response.data.data.flatMap((product) => {
          if (Array.isArray(product.Productos_Berry) && product.Productos_Berry.length > 0) {
            return product.Productos_Berry.map(p => ({
              ...p,
              Categoria: product.Categoria,
              quantity: 0,
              IdProduct: product.ID,
              Producto_Compuesto: product.Producto_Compuesto,
              Plano_de_Producto: product.Plano_de_Producto
            }));
          }
          return [{ ...product, Categoria: product.Categoria, quantity: 0, valueTotalProduct: 0, IdProduct: product.ID }];
        });
     
        const productProperties = modifiedProducts.reduce((acc, product) => {
          const found = acc.find(item => item.id === product.id);
          if (!found) {
            acc.push({
              id: product.ID,//producto del producto berry
              idProduct: product.IdProduct, //producto  general
              characteristics: product.Productos.Referencia,
              name: product.Referencia,
              price: product.Precio,
              image: product.Imagen.url,
              category: product.Categoria.Categoria,
              quantity: product.quantity,
              ValueTotalProduct: product.valueTotalProduct,
              Promotion: product.Promocion,
              amount: product.Cantidad,
              CompositeProduct: product.Producto_Compuesto,
              productPlan: product.Plano_de_Producto
            });
          }
          return acc;
        }, [])
        setProductList(productProperties);
        const initialValues = modifiedProducts.reduce((acc, curr) => {
          acc[curr.id] = 1;
          return acc;
        }, {});
        setInputValues(initialValues);
      } catch (error) {
        setError("Error al obtener los productos");
        console.error("Error al obtener los productos", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [setProductList]);

  return (
    <>
      <CSSTransition
        in={loading}
        timeout={500}
        className="loading"
        unmountOnExit
      >
        <>
          <BannerList />
          <Loading />
          <BannerBerryFields />
        </>
      </CSSTransition>
      <CSSTransition
        in={!!error} // Convertir a un valor booleano
        timeout={500}
        className="error"
        unmountOnExit
      >
        <Error/>
      </CSSTransition>
      <CSSTransition
        in={!loading && !error}
        timeout={500}
        className="products"
        unmountOnExit
      >
        <>
          <BannerList />
          <ProductPromotions />
          <ProductList />
          <BannerBerryFields />
        </>
      </CSSTransition>
    </>
  );
};

