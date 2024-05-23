import React from "react";

import { BlockMath, InlineMath } from "react-katex";
import "katex/dist/katex.min.css";
 

import LatexStyle from "./LatexComponent.module.css";
function LatexComponent({ equation, title, }) {
  return (
    <div
      className={LatexStyle.LatexDiv}
      
    >
      {title && <h6 className={LatexStyle.title}>{title} </h6>}
      <InlineMath math={"\\color{blue}"+ equation} />
    </div>
  );
}

export default LatexComponent;
