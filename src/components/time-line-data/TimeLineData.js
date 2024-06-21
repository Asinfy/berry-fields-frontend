import React, { useContext } from "react";
import { CartContext } from "../../contexts/ShoppingCartContext";
import "./TimeLineData.css"

import { UserRegister } from "../user-register/UserRegister";
import { UserAccount } from "../user-account/UserAccount";
/* import { UserValidation } from "../user-validation/UserValidation"; */

export const TimeLineData = () => {
  const {
    /* makePayment, */
    shipmentData,
    dataRecord
  } = useContext(CartContext);
  return (
    <>
      {/* makePayment || */ dataRecord || shipmentData ? (
        <div className="data-user-container">
          <h1>Ingresa tus datos</h1>
          <div className="data-user-content">

            {/* {makePayment ? (
              <UserValidation />
            ) : null} */}
            {dataRecord ? (
              <UserRegister />
            ) : null}
            {shipmentData ? (
              <UserAccount />
            ) : null}
          </div>
        </div>
      ) : null}
    </>
  );
};
