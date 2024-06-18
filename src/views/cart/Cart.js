import React from "react";
import "../cart/Cart.css";

import { Checkout } from "../../components/checkout/Checkout";
import { TimeLineCart } from "../../components/time-line-cart/TimeLineCart";
import { TimeLineData } from "../../components/time-line-data/TimeLineData";

export const Cart = () => {
  return (
    <>
      <Checkout/>
      <TimeLineCart/>
      <TimeLineData/>  
    </>
  );
};
