import React from "react";
import "./Error.css";
import imageNotFound from "../../assets/images/branding/image-not-found.png";

export const Error = () => {
  return (
    <>
      <div className="container-notfound">
        <div className="container">
          <div className="image-container">
            <img src={imageNotFound} alt=""></img>
          </div>
          <div className="text-container">
            <h1>Ups...</h1>
            <span className="text">
              Lo sentimos, la pagina que estás buscando no fue encontrada...
            </span>
          </div>
        </div>
      </div>
    </>
  );
};
