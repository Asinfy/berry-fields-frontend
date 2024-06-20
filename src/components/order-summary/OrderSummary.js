import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { CartContext } from "../../contexts/ShoppingCartContext";
import "../order-summary/OrderSummary.css";
import axios from "axios";
import { useMessage } from "../../contexts/MessageContext";

export const OrderSummary = () => {
  const {
    total,
    countProducts,
    /* setMakePayment, */
    setShipmentData,
    setDataRecord,
    discount,
    setDiscount,
    document,
    setDocument,
  } = useContext(CartContext);

  const { addMessage, confirmMessage } = useMessage();

  const [inputValue, setInputValue] = useState('');
  const [error, setError] = useState('');

  //para desactivar las variables que controlan el componente
  const deactivate = () => {
    /* setMakePayment(null); */
    setShipmentData(null);//para ocultar la vista cuando el usuario esta registrado
    setDataRecord(null);//para ocultar la vista cuando el usuario no esta registrado
    setDiscount([]);//para eliminar los datos del cupo 
    setInputValue('');//para limpiar el campo del cupon
    setDocument('');//para limpiar la variable documento
  }

  //funcion para traaer la fecha con la zona de colombia 
  const fechaActual = () => {
    const options = {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      timeZone: 'America/Bogota'
    };

    const currentDateWithTimezone = new Date().toLocaleDateString('es-ES', options);
    const [day, month, year] = currentDateWithTimezone.split('/');
    return `${year}-${month}-${day}`;
  }

  //catura los varoles del input cupon
  const discountInputChange = (event) => {
    const { value } = event.target;
    setInputValue(value);
    if (value.trim() === "") {
      deactivate();
    }
  };

  //catura los valores del input documento
  const documentInputChange = (event) => {
    const { value } = event.target;
    if (/^\d*$/.test(value)) {
      setDocument(value);
      if (value.length > 10) {
        addMessage('warning', 'Advertencia!', 'Su documento tiene más de 10 dígitos');
      }
    }
  };

  //validamos el cupon de descuento 
  const discountValidacion = async () => {
    let response = [];
    if (inputValue.length > 2) {
      try {
        //hacemos la peticion por medio de axios a la api para extraer el cupon 
        response = await axios.get(`https://zoho.accsolutions.tech/API/v1/All_Descuentos_Berries?where=Codigo_Descuento=="${inputValue}"`);
        //validamos si el cupo el etado del cupun y la fecha inicial del cupon y final
        if (response.data.data[0].Estado === "Activo" &&
          response.data.data[0].Fecha_Inicio1 <= fechaActual() &&
          response.data.data[0].Fecha_Fin1 >= fechaActual()) {
          //utilizamos este condicional para ver si el cupon tiene un solo uso y siendo el caso que solo sea un solo uso se aviza por medio de un mensaje al usuario
          if (response.data.data[0].Un_solo_uso === "Si") {
            addMessage('confirm', 'Confirmar Acción', 'Cupón de descuento tiene un solo uso');

            const confirmation = await confirmMessage();

            //siendo el caso que el usuario ubiera decidido usar el cupon se carga el cupon para hacer el descuento
            if (confirmation) {
              setDiscount(response.data.data);
            } else {
              deactivate();
            }
          } else {
            setDiscount(response.data.data);
          }
        } else {
          addMessage('warning', 'Advertencia!', 'Cupón de descuento está inactivo');
          deactivate();
        }
      } catch (error) {
        deactivate();
        addMessage('error', 'Error', 'Cupón no existe');
      }
    } else {
      
      addMessage('error', 'Error', 'Ingresar el código del cupón');
    }
  }

  //validamos el documento del usuario 
  const validationDocument = async () => {
    //validamos que el usuario ingrese un documento entre el rango de 6 a 10 dijitos
    if (document.length < 11 && document.length > 5) {
      try {
        const response = await axios.get(`https://zoho.accsolutions.tech/API/v1/Clientes_Report?where=Documento=="${document}"`);
        //validamos que el documento exista en la base de datos
        if (response.data.data.length > 0) {
          const filteredData = response.data.data;
          //convertimos el array en un objeto
          const dataObject = filteredData.reduce((obj, item) => {
            obj['user'] = item;
            return obj;
          }, {});
          setDataRecord(null);
          setShipmentData(dataObject);
        } else {
          setShipmentData(null);
          setDataRecord(true);
        }
        /* setMakePayment(true); */
      } catch (error) {
        setShipmentData(null);
        setError('Error al realizar la validación');
        console.error('Error en la validación:', error);
      }
    } else if (document.length === 0) {
      addMessage('error', 'Error', 'Ingresar Documento');
    } else {
      addMessage('warning', 'Advertencia!', 'Documento ingresado no valido');
    }
  };

  return (
    <>
      <div className="cart-content-summary">
        {countProducts !== 0 ? (
          <>
            <div className="cart-coupon">
              <label htmlFor="cupon">Aplicar tu descuento</label>
              <div className="cart-coupon-data">
                <input
                  type="text"
                  id="cupon"
                  name="cupon"
                  placeholder="Cupón de descuento"
                  value={inputValue}
                  onChange={discountInputChange}
                />
                {discount.length > 0 ? (
                  <button onClick={deactivate}>cancelar</button>
                ) : (
                  <button onClick={discountValidacion}>Aplicar</button>
                )}
              </div>
            </div>
            <div className="validation-user">
              <label htmlFor="documento">Número de documento</label>
              <input
                type="number"
                id="documento"
                name="documento"
                onChange={documentInputChange}
                placeholder="Ingrese su número de documento"
              ></input>
            </div>
          </>
        ) : null}
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
              <div className="mycart-item-price">{discount.length > 0 ? `- $${new Intl.NumberFormat('es-CL').format((discount[0].Porcentaje / 100) * total)}` : "0"}</div>
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
          {countProducts !== 0 /* && document.length > 0 */ ? (
            <button
              className="button-pay"
              onClick={validationDocument}
            >
              Realizar Pago
            </button>
          ) : null}
          <Link
            to="/tienda"
            className="button-buy"
            onClick={deactivate}
          >
            Seguir Comprando
          </Link>
        </div>
      </div>
    </>
  );
};
