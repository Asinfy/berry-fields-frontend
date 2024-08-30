import React, { useContext, useEffect, useState } from "react";
import { CartContext } from "../../contexts/ShoppingCartContext";
import { Link } from "react-router-dom";
import "../order-details/OrderDetails.css";
import { discountEmployee } from "../../helpers/discountEmployee";
import { discountCoupon } from "../../helpers/discountCoupon";

export const OrderDetails = () => {
  const [inputValues, setInputValues] = useState({});
  const {
    allProducts,
    setAllProducts,
    total,
    setTotal,
    setCountProducts,
    makePayment,
    countProducts,
    discount,
    setDiscount,
    discountDefault,
    setDiscountDefault,
    inventory
  } = useContext(CartContext);

  const handleInputChange = (event, productId) => {
    let { value } = event.target;
    if (value.trim() === "" || value < 0) {
      console.log(value)
      const updatedProducts = allProducts.map((product) =>
        product.id === productId ? { ...product, quantity: value } : product
      );
      setAllProducts(updatedProducts);
    } else {
      const updatedProducts = allProducts.map((product) =>
        product.id === productId ? { ...product, quantity: value } : product
      );
      setAllProducts(updatedProducts);

    }
  };

  const onInputBlur = (event, productId) => {
    let value = event.target.value;

    // Eliminar cualquier signo '+' o '-' y caracteres no numéricos
    value = value.replace(/[^\d]/g, "");

    // Si el valor es vacío o "0", establecer el valor a 1
    if (value === "" || value === "0") {
      value = 1;
    } else {
      value = parseInt(value);
    }

    // Actualizar la cantidad del producto correspondiente
    const updatedProducts = allProducts.map((product) =>
      product.id === productId ? { ...product, quantity: value } : product
    );

    setAllProducts(updatedProducts);
  };

  const onUpdateProduct = (product, action) => {
    const updatedProducts = allProducts.map((item) => {
      if (item.id === product.id) {
        const updatedQuantity =
          action === "add" ? item.quantity + 1 : item.quantity - 1;
        return { ...item, quantity: updatedQuantity };
      }
      return item;
    });

    const updatedProduct = updatedProducts.find(
      (item) => item.id === product.id
    );

    if (updatedProduct.quantity === 0) {
      onDeleteProduct(updatedProduct);
    } else {
      setTotal(
        total +
        (action === "add"
          ? parseInt(product.Precio)
          : -parseInt(product.Precio))
      );
  
      setCountProducts(getTotalQuantity());
      setAllProducts(updatedProducts);
    }
  };
  const onDeleteProduct = (product) => {
    const updatedProducts = allProducts.filter(
      (item) => item.id !== product.id
    );
    setTotal(total - product.quantity * parseInt(product.price));
    setAllProducts(updatedProducts);
    if ((total - product.quantity * parseInt(product.price)) === 0) {
      setDiscount([]);
      setDiscountDefault([]);
    }
  };

  const getTotalQuantity = () => {
    return allProducts.reduce((acc, product) => acc + product.quantity, 0);
  };

  const calculateTotal = () => {


    const update = allProducts.reduce(
      (acc, product) => acc + product.quantity * parseInt(product.price),
      0
    );

    if (discountDefault.length > 0) {
      setDiscountDefault([{
        Porcentaje: discountEmployee(allProducts, inventory, update, discount)
      }]);
    }

    

    return update;
  };
  useEffect(() => {
    setCountProducts(getTotalQuantity());
    setTotal(calculateTotal());

    
  }, [allProducts]);

  const emptyCart = () => {
    setAllProducts([]);
    setTotal(0);
    setCountProducts(0);
    setDiscount([]);
    setDiscountDefault([]);
  };

  return (
    <>
      {!makePayment ? (
        <div className="cart-content-details">
          {allProducts.length ? (
            <>
              <div className="cart-content-details-header">
                <h2>Tus Productos</h2>
                {countProducts !== 0 ? (
                  <Link className="" onClick={() => emptyCart()}>
                    Vaciar Carrito
                  </Link>
                ) : null}
              </div>
              <div className="cart-list">
                {allProducts.map((product) => (
                  <div className="cart-item" key={product.id}>
                    <div className="product-image">
                      <img src={product.image} alt="Etiqueta de Producto." />
                    </div>
                    <div className="product-info">
                      <span className="category">{product.category}</span>
                      <span className="name">{product.name}</span>
                      <span className="weight">
                        {product.name.toLowerCase() !== product.characteristics
                          ? product.characteristics
                          : ""}
                      </span>
                    </div>
                    <div className="product-price">
                      <span className="price">
                        ${new Intl.NumberFormat("es-CL").format(product.price)} COP
                      </span>
                    </div>
                    <div className="product-amount">
                      <button
                        className="change-quantity"
                        onClick={() => onUpdateProduct(product, "remove")}
                      >
                        <i className="fa-solid fa-minus"></i>
                      </button>
                      <input
                        type="number"
                        id="cantidad"
                        name="cantidad"
                        value={
                          inputValues[product.id] !== undefined
                            ? inputValues[product.id] === 1
                              ? ""
                              : inputValues[product.id]
                            : product.quantity
                        }
                        onChange={(event) => handleInputChange(event, product.id)}
                        onBlur={(event) => onInputBlur(event, product.id)}
                      ></input>
                      <button
                        className="change-quantity"
                        onClick={() => onUpdateProduct(product, "add")}
                      >
                        <i className="fa-solid fa-plus"></i>
                      </button>
                    </div>
                    <div className="product-option">
                      <button
                        className="delete"
                        onClick={() => onDeleteProduct(product)}
                      >
                        <i className="fa-regular fa-trash-can"></i>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </>
          ) : (
            <h2 className="cart-empty">El carrito está vacío</h2>
          )}
        </div>
      ) : null}
    </>
  );


};
