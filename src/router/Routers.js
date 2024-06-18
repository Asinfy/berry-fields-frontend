import React from "react";
import { Routes, Route, BrowserRouter as Router } from "react-router-dom";

import { Home } from "../views/home/Home";
import { Cart } from "../views/cart/Cart";
import { Policy } from "../views/policy/Policy";
import { Error } from "../views/error/Error";
import { Header } from "../components/layouts/header/Header";
import { Footer } from "../components/layouts/footer/Footer";
import { ShoppingCartProvider } from "../contexts/ShoppingCartContext";
import ScrollToTop from "../components/ScrollToTop";

export const Routers = () => {
  return (
    <ShoppingCartProvider>
      <Router>
        <ScrollToTop />
        <Header />
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/inicio" element={<Home />}></Route>
          <Route path="/tienda" element={<Home />}></Route>
          <Route path="/carrito" element={<Cart />}></Route>
          <Route path="/politica" element={<Policy />}></Route>
          <Route path="*" element={<Error />}></Route>
        </Routes>
        <Footer />
      </Router>
    </ShoppingCartProvider>
  );
};
