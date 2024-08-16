import React from "react";
import "./BannerBerryFields.css";
import PlatoBerryImg from "../../../assets/images/branding/plato-banner-berry.png";
import Arcoiris from "../../../assets/images/branding/arcoiris-berryfields-banner.png";

export const BannerBerryFields = () => {
  return (
    <>
      <div className="banner-berryfields-container">
        <div className="background-overlay">
          <div className="container">
            <div className="text-container">
              <h2>
                Cambiando el mundo<br></br>desde las raices{" "}
                <img src={Arcoiris}></img>
              </h2>
              <div className="row-span">
                <div className="col-span">
                  <div className="icon">
                    <i className="fa-solid fa-percent"></i>
                  </div>
                  <div className="text">
                    <span className="text-lighter">Excelentes</span>
                    <span className="text-bolder">Ofertas</span>
                  </div>
                </div>
                <span className="divider"></span>
                <div className="col-span">
                  <div className="icon">
                    <i className="fa-solid fa-truck"></i>
                  </div>
                  <div className="text">
                    <span className="text-lighter">Envios</span>
                    <span className="text-bolder">Gratis</span>
                  </div>
                </div>
                <span className="divider"></span>
                <div className="col-span">
                  <div className="icon">
                    <i className="fa-solid fa-credit-card"></i>
                  </div>
                  <div className="text">
                    <span className="text-lighter">Pagos 100%</span>
                    <span className="text-bolder">Seguros</span>
                  </div>
                </div>
              </div>
              <div className="data-contact">
                <ul>
                  <li>
                  <i class="fa-solid fa-globe"></i> www.theberryfields.com
                  </li>
                  <li>
                  <i class="fa-solid fa-phone"></i> +57 302 276 76 77
                  </li>
                  <li>
                  <i class="fa-solid fa-envelope"></i> contacto@theberryfields.com
                  </li>
                </ul>
              </div>
            </div>
            <div className="image-container">
              <img src={PlatoBerryImg} alt=""></img>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
