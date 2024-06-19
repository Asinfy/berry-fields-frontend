import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { CartContext } from "../../contexts/ShoppingCartContext";
import "../order-summary/OrderSummary.css";
import axios from "axios";
import { useMessage } from "../../contexts/MessageContext";
export const OrderSummary = () => {
  const { total,
    countProducts,
    setMakePayment,
    setShipmentData,
    setDataRecord,
    discount,
    setDiscount
  } = useContext(CartContext);

  const { addMessage } = useMessage();

  const [inputValue, setInputValue] = useState('');

  const deactivate = () => {
    setMakePayment(null);
    setShipmentData(null);
    setDataRecord(null);
    setDiscount([]);
  }

  const fechaActual = new Date().toISOString().split('T')[0];

  const onMakePayment = (state) => {
    setMakePayment(state === 'Activate')
  }

  const handleInputChange = (event) => {
    const { value } = event.target;
    setInputValue(value)
  };

  const discountValidacion = async () => {
    try {
      const response = await axios.get(`https://zoho.accsolutions.tech/API/v1/All_Descuentos_Berries?where=Codigo_Descuento=="${inputValue}"`);
      if (
        response.data.data[0].Estado === "Activo"
        && response.data.data[0].Fecha_Inicio1 <= fechaActual
        && response.data.data[0].Fecha_Fin1 >= fechaActual
      ) {
        setDiscount(response.data.data)
      } else {
        addMessage('warning', 'Advertencia!', 'Cupón de descuento está inactivo')
        setDiscount([])
      }
    } catch (error) {
      setDiscount([])
      addMessage('error', 'Error', 'Cupon no existe')
    }
  }
  return (
    <>

      <div className="cart-content-summary">
        {countProducts !== 0 ? (
          <div className="cart-coupon">
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
          </div>
        ) : null}
        <div className="cart-summation">
          <div className="body-summation">
            <div className="row">
              <div className="mycart-item-text">Subtotal:</div>
              <div className="mycart-item-price">${new Intl.NumberFormat('es-CL').format(total)}</div>
            </div>
            <div className="row">
              <div className="mycart-item-text">Descuento:</div>
              <div className="mycart-item-price">{discount.length > 0 ? `- $${new Intl.NumberFormat('es-CL').format((discount[0].Porcentaje / 100) * total)}` : "0"}   </div>
            </div>
            <div className="row">
              <div className="mycart-item-text">Costo de Envío:</div>
              <div className="mycart-item-price">GRATIS</div>
            </div>
          </div>
          <div className="footer-summation">
            <div className="grand-total">Total:</div>
            <div className="total-mycart">
              {discount.length > 0 ?
                `$${new Intl.NumberFormat('es-CL').format(total - (discount[0].Porcentaje / 100) * total)}` : `${new Intl.NumberFormat('es-CL').format(total)}`
              }

            </div>
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
