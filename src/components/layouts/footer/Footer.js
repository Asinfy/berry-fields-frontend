import React from "react";
import { Link } from "react-router-dom";
import "./Footer.css";
import LogoBerryHorinzontal from "../../../assets/images/branding/logo-berry-horizontal.png";
import LogoIndustriaComercio from "../../../assets/images/branding/logo-industria-comercio.png";
import LogoAsincode from "../../../assets/images/branding/logo-asincode.png";

export const Footer = () => {
  return (
    <>
      <footer>
        <a
          target="_blank"
          rel="noreferrer"
          href="https://api.whatsapp.com/send?phone=573022767677"
          className="whatsaap-flotante"
        >
          <svg
            viewBox="0 0 256 259"
            width="64"
            height="64"
            xmlns="http://www.w3.org/2000/svg"
            preserveAspectRatio="xMidYMid"
          >
            <path
              d="m67.663 221.823 4.185 2.093c17.44 10.463 36.971 15.346 56.503 15.346 61.385 0 111.609-50.224 111.609-111.609 0-29.297-11.859-57.897-32.785-78.824-20.927-20.927-48.83-32.785-78.824-32.785-61.385 0-111.61 50.224-110.912 112.307 0 20.926 6.278 41.156 16.741 58.594l2.79 4.186-11.16 41.156 41.853-10.464Z"
              fill="#00E676"
            />
            <path
              d="M219.033 37.668C195.316 13.254 162.531 0 129.048 0 57.898 0 .698 57.897 1.395 128.35c0 22.322 6.278 43.947 16.742 63.478L0 258.096l67.663-17.439c18.834 10.464 39.76 15.347 60.688 15.347 70.453 0 127.653-57.898 127.653-128.35 0-34.181-13.254-66.269-36.97-89.986ZM129.048 234.38c-18.834 0-37.668-4.882-53.712-14.648l-4.185-2.093-40.458 10.463 10.463-39.76-2.79-4.186C7.673 134.63 22.322 69.058 72.546 38.365c50.224-30.692 115.097-16.043 145.79 34.181 30.692 50.224 16.043 115.097-34.18 145.79-16.045 10.463-35.576 16.043-55.108 16.043Zm61.385-77.428-7.673-3.488s-11.16-4.883-18.136-8.371c-.698 0-1.395-.698-2.093-.698-2.093 0-3.488.698-4.883 1.396 0 0-.697.697-10.463 11.858-.698 1.395-2.093 2.093-3.488 2.093h-.698c-.697 0-2.092-.698-2.79-1.395l-3.488-1.395c-7.673-3.488-14.648-7.674-20.229-13.254-1.395-1.395-3.488-2.79-4.883-4.185-4.883-4.883-9.766-10.464-13.253-16.742l-.698-1.395c-.697-.698-.697-1.395-1.395-2.79 0-1.395 0-2.79.698-3.488 0 0 2.79-3.488 4.882-5.58 1.396-1.396 2.093-3.488 3.488-4.883 1.395-2.093 2.093-4.883 1.395-6.976-.697-3.488-9.068-22.322-11.16-26.507-1.396-2.093-2.79-2.79-4.883-3.488H83.01c-1.396 0-2.79.698-4.186.698l-.698.697c-1.395.698-2.79 2.093-4.185 2.79-1.395 1.396-2.093 2.79-3.488 4.186-4.883 6.278-7.673 13.951-7.673 21.624 0 5.58 1.395 11.161 3.488 16.044l.698 2.093c6.278 13.253 14.648 25.112 25.81 35.575l2.79 2.79c2.092 2.093 4.185 3.488 5.58 5.58 14.649 12.557 31.39 21.625 50.224 26.508 2.093.697 4.883.697 6.976 1.395h6.975c3.488 0 7.673-1.395 10.464-2.79 2.092-1.395 3.487-1.395 4.882-2.79l1.396-1.396c1.395-1.395 2.79-2.092 4.185-3.487 1.395-1.395 2.79-2.79 3.488-4.186 1.395-2.79 2.092-6.278 2.79-9.765v-4.883s-.698-.698-2.093-1.395Z"
              fill="#FFF"
            />
          </svg>
        </a>
        <div className="footer-container">
          <div className="footer-left">
            <img src={LogoBerryHorinzontal} alt=""></img>
            <p>
              Cambiamos el mundo produciendo Berries consientes para alegrar el
              corazòn.<br></br>🍓🫐
            </p>
            <ul>
              <li>
                <a
                  target="_blank"
                  rel="noreferrer"
                  href="https://www.instagram.com/berryfieldsco"
                >
                  <i class="fa-brands fa-instagram"></i>
                </a>
              </li>
              <li>
                <a
                  target="_blank"
                  rel="noreferrer"
                  href="https://www.youtube.com/channel/UCsTXeux90xZJj9w7MKdwt9g"
                >
                  <i class="fa-brands fa-youtube"></i>
                </a>
              </li>
              <li>
                <a
                  target="_blank"
                  rel="noreferrer"
                  href="https://www.tiktok.com/@berryfieldscol"
                >
                  <i class="fa-brands fa-tiktok"></i>
                </a>
              </li>
              <li>
                <a
                  target="_blank"
                  rel="noreferrer"
                  href="https://api.whatsapp.com/send?phone=573022767677"
                >
                  <i class="fa-brands fa-whatsapp"></i>
                </a>
              </li>
              <li>
                <a
                  target="_blank"
                  rel="noreferrer"
                  href="https://t.me/berryfieldsco"
                >
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
            <a className="logo-href" href="https://asincode.co" target="blank"><img src={LogoAsincode} alt=""></img></a>
          </div>
        </div>
        <div className="footerButtom">
          <p>
            Copyright © 2024 BerryFields. Desarrollado por{" "}
            <a href="https://asincode.co" target="blank"><strong>Asincode.</strong></a>
          </p>
        </div>
      </footer>
    </>
  );
};
