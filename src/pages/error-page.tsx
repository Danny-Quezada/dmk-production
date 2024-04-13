import React from "react";
import { useRouteError } from "react-router-dom";

export default function ErrorPage() {
  return (
    <div
      id="error-page"
      style={{
        display: "flex",
        flexDirection: "column",

        justifyContent: "center",
        alignItems: "center",
        width: "100%",
        height: "100vh",
      }}
    >
      <main>
        <picture>
          <img
            style={{ borderRadius: "8px" }}
            src="https://midu.dev/images/this-is-fine-404.gif"
            alt="error"
          />
        </picture>
        <h1>¡Error en la búsqueda de página!</h1>
        <p>Ha ocurrido un error, vuelve a la página principal</p>
      </main>
    </div>
  );
}
