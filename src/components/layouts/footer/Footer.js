import React from "react";
import { Link } from "react-router-dom";
import "./Footer.css";
import LogoBerryHorinzontal from "../../../assets/images/branding/logo-berry-horizontal.svg";
import LogoIndustriaComercio from "../../../assets/images/branding/Logo-industria-comercio.svg";
import LogoChacamTrading from "../../../assets/images/branding/logo-chacam-trading.svg";

export const Footer = () => {
  return (
    <>
      <footer>
        <div className="footer-container">
          <div className="footer-left">
            <img src={LogoBerryHorinzontal} alt=""></img>
            <p>
              Cambiamos el mundo produciendo Berries consientes para alegrar el
              corazòn.<br></br>🍓🫐
            </p>
            <ul>
              <li>
                <a target="_blank" rel="noreferrer" href="https://www.instagram.com/berryfieldsco">
                  <i class="fa-brands fa-instagram"></i>
                </a>
              </li>
              <li>
                <a target="_blank" rel="noreferrer" href="https://www.youtube.com/channel/UCsTXeux90xZJj9w7MKdwt9g">
                  <i class="fa-brands fa-youtube"></i>
                </a>
              </li>
              <li>
                <a target="_blank" rel="noreferrer" href="https://www.tiktok.com/@berryfieldscol">
                  <i class="fa-brands fa-tiktok"></i>
                </a>
              </li>
              <li>
                <a target="_blank" rel="noreferrer" href="https://api.whatsapp.com/send?phone=573022767677">
                  <i class="fa-brands fa-whatsapp"></i>
                </a>
              </li>
              <li>
                <a target="_blank" rel="noreferrer" href="https://t.me/berryfieldsco">
                  <i class="fa-solid fa-paper-plane"></i>
                </a>
              </li>
            </ul>
          </div>
          <div className="footer-center">
            <h5>Contactanos</h5>
            <p>
              <strong>Atención al cliente: </strong>+57 302 276 76 77
            </p>
            <p>
              <strong>Correo: </strong>contacto@theberryfields.com
            </p>
            <p>
              <strong>Horarios: </strong>Lunes a Viernes de 7AM a 5 PM
            </p>
          </div>
          <div className="footer-right">
            <h5>Legal</h5>
            <Link to="/politica">Política de Tratamiento de datos</Link>
            <img src={LogoIndustriaComercio} alt=""></img>
            <img src={LogoChacamTrading} alt=""></img>
          </div>
        </div>
        <div className="footerButtom">
          <p>
            Copyright © 2024 BerryFields. Desarrollado por{" "}
            <strong>Chacam Trading.</strong>
          </p>
        </div>
      </footer>
    </>
  );
};
