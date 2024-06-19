import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { CartContext } from "../../contexts/ShoppingCartContext";
import "../order-summary/OrderSummary.css";

export const OrderSummary = () => {
  const {
    total,
    countProducts,
    setMakePayment,
    setShipmentData,
    setDataRecord,
  } = useContext(CartContext);

  const deactivate = () => {
    setMakePayment(null);
    setShipmentData(null);
    setDataRecord(null);
  };

  const onMakePayment = (state) => {
    setMakePayment(state === "Activate");
  };
  return (
    <>
      <div className="cart-content-summary">
        <div className="cart-coupon">
          <label for="cupon">Aplicar tu descuento</label>
          <div className="cart-coupon-data">
            <input type="text" id="cupon" name="cupon" placeholder="Cupón de descuento"></input>
            <button>Aplicar</button>
          </div>
        </div>
        <div className="validation-user">
          <label for="documento">Número de documento</label>
          <input
            type="number"
            id="documento"
            name="documento"
            onChange=""
            placeholder="Ingrese su número de documento"
          ></input>
        </div>
        <div className="cart-summation">
          <div className="body-summation">
            <div className="row">
              <div className="mycart-item-text">Subtotal:</div>
              <div className="mycart-item-price">
                ${new Intl.NumberFormat("es-CL").format(total)}
              </div>
            </div>
            <div className="row">
              <div className="mycart-item-text">Descuento:</div>
              <div className="mycart-item-price">$0</div>
            </div>
            <div className="row">
              <div className="mycart-item-text">Costo de Envío:</div>
              <div className="mycart-item-price">GRATIS</div>
            </div>
          </div>
          <div className="footer-summation">
            <div className="grand-total">Total:</div>
            <div className="total-mycart">
              ${new Intl.NumberFormat("es-CL").format(total)}
            </div>
          </div>
        </div>
        <div className="cart-options">
          {countProducts !== 0 ? (
            <button
              className="button-pay"
              onClick={() => onMakePayment("Activate")}
            >
              Realizar Pago
            </button>
          ) : null}
          <Link
            to="/tienda"
            className="button-buy"
            onClick={() => deactivate()}
          >
            Seguir Comprando
          </Link>
        </div>
      </div>
    </>
  );
};
