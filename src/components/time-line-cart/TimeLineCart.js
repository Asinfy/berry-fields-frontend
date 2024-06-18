import React, { useContext } from "react";
import { CartContext } from "../../contexts/ShoppingCartContext";
import "./TimeLineCart.css";

import { OrderDetails } from '../order-details/OrderDetails'
import { OrderSummary } from '../order-summary/OrderSummary'

export const TimeLineCart = () => {
  const {
    shipmentData,
    makePayment, 
    dataRecord
  } = useContext(CartContext);
  return (
    <>
    {!makePayment && !dataRecord && !shipmentData  ? (
      <div className="shopping-cart-container">
        <h1>Carrito de compras</h1>
        <div className="shopping-cart-content">
          <OrderDetails/>
          <OrderSummary/>
        </div>
      </div>
      ) : null}
    </>
  );
}
