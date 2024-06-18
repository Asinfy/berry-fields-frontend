import React from "react";
import { Link } from "react-router-dom";
import "../policy/Policy.css";
import InformacionIcon from '../../assets/images/icons/information-icon.svg';

export const Policy = () => {
  return (
    <div className="privacy_container">
      <section className="privacy_section">
        <img src={InformacionIcon} alt=""></img>
        <h1>Política de Tratamiento de Datos Personales</h1>
      </section>
      <section className="privacy_section">
        <h2>1. Objetivo:</h2>
        <p>
          La presente política tiene como objetivo garantizar el derecho
          constitucional de todas las personas a conocer, actualizar, rectificar
          y suprimir la información que se haya recogido sobre ellas, en
          cumplimiento de la ley 1581 de 2012 y demás normas aplicables.
        </p>
      </section>
      <section className="privacy_section">
        <h2>2. Alcance:</h2>
        <p>
          Esta política se aplica a todas las personas, en especial a los
          administradores del manejo de datos personales, así como a los
          encargados del tratamiento de datos personales.
        </p>
      </section>
      <section className="privacy_section">
        <h2>3. Tratamiento y Finalidad:</h2>
        <p>
          Se establece el deber de acreditar la puesta a disposición de las
          políticas de tratamiento de información, así como el contenido mínimo
          del aviso de privacidad.
        </p>
      </section>
      <section className="privacy_section">
        <h2>4. Deberes:</h2>
        <p>
          La entidad se compromete a garantizar la seguridad, transparencia y
          libertad en el tratamiento de los datos personales, bajo el
          consentimiento previo, expreso e informado del titular de la
          información.
        </p>
      </section>
      <section className="privacy_section">
        <h2>5. Derechos de los Titulares:</h2>
        <p>
          Los titulares de los datos personales tienen derecho a conocer,
          actualizar, rectificar y suprimir su información, así como a solicitar
          prueba de la autorización otorgada a la entidad para el tratamiento de
          sus datos.
        </p>
      </section>
      <section className="privacy_section">
        <h2>6. Autorización de CHACAM TRADING S.A.S.</h2>
        <p>
          En cumplimiento de la ley 1581 de 2012, la empresa CHACAM TRADING
          S.A.S. NIT 900674991 Solicita la autorización para el tratamiento de
          datos personales, comprometiéndose a cumplir con los deberes y
          garantizar los derechos de los titulares de la información. <br />
          Este modelo de política de tratamiento de datos personales se basa en
          las disposiciones del 2012, tiene como finalidad garantizar el
          adecuado tratamiento y protección de la información.
        </p>
        <Link to="/tienda">Ir a la tienda</Link>
      </section>
    </div>
  );
};
