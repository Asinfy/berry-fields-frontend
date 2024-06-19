import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { CartContext } from "../../contexts/ShoppingCartContext";
import "../order-summary/OrderSummary.css";
import axios from "axios";

export const OrderSummary = () => {
  const { total,
    countProducts,
    setMakePayment,
    setShipmentData,
    setDataRecord,
    /* discount,
    setDiscount */
  } = useContext(CartContext);

  /* const [inputValue, setInputValue] = useState(''); */

  const deactivate = () => {
    setMakePayment(null);
    setShipmentData(null);
    setDataRecord(null);
  }

  const onMakePayment = (state) => {
    setMakePayment(state === 'Activate')
  }

/*   const handleInputChange = (event) => {
    const { value } = event.target;
    setInputValue(value)
  };

  const discountValidacion = async() => {
    console.log(inputValue)
    try {
      const response = await axios.get(`https://zoho.accsolutions.tech/API/v1/All_Descuentos_Berries?where=Codigo_Descuento=="${inputValue}"`);
      
      console.log(response.data.data)
    } catch (error) {
      console.error("aqui esta el error: ", error)
    }


  } */
  return (
    <>

      <div className="cart-content-summary">
        {/* <div className="cart-coupon">
          <label for="cupon">Aplicar tu descuento</label>
          <div className="cart-coupon-data">
            <input
              type="text"
              id="cupon"
              name="cupon"
              placeholder="Cupón de descuento"
              onChange={handleInputChange}
            />
            <button onClick={() => discountValidacion()}>Aplicar</button>
          </div>
        </div> */}
        <div className="cart-summation">
          <div className="body-summation">
            <div className="row">
              <div className="mycart-item-text">Subtotal:</div>
              <div className="mycart-item-price">${new Intl.NumberFormat('es-CL').format(total)}</div>
            </div>
            {/* <div className="row">
              <div className="mycart-item-text">Descuento:</div>
              <div className="mycart-item-price">$0</div>
            </div> */}
            <div className="row">
              <div className="mycart-item-text">Costo de Envío:</div>
              <div className="mycart-item-price">GRATIS</div>
            </div>
          </div>
          <div className="footer-summation">
            <div className="grand-total">Total:</div>
            <div className="total-mycart">${new Intl.NumberFormat('es-CL').format(total)}</div>
          </div>
        </div>
        <div className="cart-options">
          {countProducts !== 0 ? (
            <button className="button-pay" onClick={() => onMakePayment('Activate')}>Realizar Pago</button>
          ) : null}
          <Link to="/tienda" className="button-buy" onClick={() => deactivate()}>Seguir Comprando</Link>
        </div>
      </div>

    </>
  );
};
