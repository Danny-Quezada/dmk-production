import React from "react";
import CalculadorCardCSS from "./CalculatorCard.module.css";
import { BlockMath, InlineMath } from "react-katex";
import "katex/dist/katex.min.css";
export const CalculatorCard = ({ link, description, equation, click }) => {

  return (
    <article
      className={CalculadorCardCSS.article}
      aria-label={link}
      style={{ overflow: "hidden" }}
      onClick={(event) => {
        click();
      }}
    >
      <h3 className={CalculadorCardCSS.title}>{link}</h3>

      <p className={CalculadorCardCSS.description}>{description}</p>
      {equation !== null && (
        <div className={CalculadorCardCSS.latex}>
          <InlineMath math={"\\color{blue}"+ equation} />
        </div>
      )}
    </article>
  );
};
