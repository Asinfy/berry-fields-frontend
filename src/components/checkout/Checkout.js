import React, { useContext } from "react";
import { CartContext } from "../../contexts/ShoppingCartContext";
import { Link } from "react-router-dom";
import "./Checkout.css";

export const Checkout = () => {
  const { 
    makePayment, 
    setMakePayment,
    setShipmentData,
    setDataRecord,
    shipmentData,
    dataRecord,
    setDiscount
  } = useContext(CartContext);

  const deactivate = () => {
    setMakePayment(null);
    setShipmentData(null);
    setDataRecord(null);
    setDiscount([]);

  }
  return (
    <>
      <div className="berry-checkout-timeLine">
        <Link to="/carrito" className="berry-checkout-timeLineItem active" onClick={() => deactivate()}>
          <div className="berry-checkout-timeLineIcon">
            <i className="fa-solid fa-cart-shopping"></i>
          </div>
          <span className="berry-checkout-timeLineMessage">Carrito</span>
        </Link>
        <span className={`berry-checkout-timeLineDivider ${makePayment || shipmentData || dataRecord ? "active" : ""}`}></span>
        <div className={`berry-checkout-timeLineItem ${makePayment || shipmentData || dataRecord ? "active" : ""}`}>

          <div className="berry-checkout-timeLineIcon">
            <i className="fa-solid fa-user"></i>
          </div>
          <span className="berry-checkout-timeLineMessage">Datos</span>
        </div>
        <span className="berry-checkout-timeLineDivider"></span>
        <div className="berry-checkout-timeLineItem">
          <div className="berry-checkout-timeLineIcon">
            <i className="fa-solid fa-credit-card"></i>
          </div>
          <span className="berry-checkout-timeLineMessage">Pago</span>
        </div>
      </div>
    </>
  );
};
