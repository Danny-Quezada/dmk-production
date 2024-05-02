import React from "react";
import "katex/dist/katex.min.css";
import Latex from "react-latex-next";
import LatexStyle from "./LatexComponent.module.css";
function LatexComponent({ equation, title, }) {
  return (
    <div
      className={LatexStyle.LatexDiv}
      
    >
      {title && <h6 className={LatexStyle.title}>{title} </h6>}
      <Latex strict={true} macros={{ "\\f": "#1f(#2)" }}>
        {equation}
      </Latex>
    </div>
  );
}

export default LatexComponent;
