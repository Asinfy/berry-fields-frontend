import React, { useContext, useState } from "react";
import { CartContext } from "../../contexts/ShoppingCartContext";
import "./UserValidation.css";
import axios from "axios";
import { useMessage } from "../../contexts/MessageContext";

export const UserValidation = () => {
  const [inputValue, setInputValue] = useState('');
  const {
    setShipmentData,
    setDataRecord,
    setMakePayment,
    shipmentData,
    document,
    setDocument
  } = useContext(CartContext);
  const { addMessage } = useMessage();
  const [error, setError] = useState('');

  const handleInputChange = (event) => {
    const {value} = event.target;
    if (/^\d*$/.test(value)){
      setInputValue(value);
      setDocument(value);
      if(value.length > 10){
        addMessage('warning', 'Advertencia!', 'Su documento tiene más de 10 dígitos')
      }
    }
  };
  
  const validation = async () => {
    if (inputValue.length < 11 && inputValue.length > 7) {
      try {
        const response = await axios.get(`https://zoho.accsolutions.tech/API/v1/Clientes_Report?where=Documento=="${inputValue}"`);
        if (response.data.data.length > 0) {
          const filteredData = response.data.data
          const dataObject = filteredData.reduce((obj, item) => {
            obj['user'] = item;
            return obj;
          }, {});
          setDataRecord(null)
          setShipmentData(dataObject);
          setError('');
        } else {
          setShipmentData(null);
          setError('Usuario no registrado');
          setDataRecord(true)
        }
      } catch (error) {
        setShipmentData(null);
        setError('Error al realizar la validación');
        console.error('Error en la validación:', error);
      }
    } else {
      addMessage('warning', 'Advertencia!', 'Documento ingresado no valido')

    }
  };


  return (
    <>
      <div className="user-validation-form-container">
        <h2>Validación de Usuario</h2>
        <form onSubmit={(e) => { e.preventDefault(); validation(); }}>
          <div className="form-row">
            <div className="form-column">
              <label htmlFor="documento">Número de documento</label>
              <input
                type="number"
                id="documento"
                name="documento"
                onChange={handleInputChange}
                placeholder="Ingrese su número de documento"
              ></input>
            </div>
          </div>
          <div className="submit-button">
            <button type="submit">Validar</button>
          </div>
        </form>
      </div >
    </>
  );
};
