import React from "react";
import CalculadorCardCSS from "./CalculatorCard.module.css";
import 'katex/dist/katex.min.css';
import Latex from 'react-latex-next';
export const CalculatorCard = ({ link, description, equation, click }) => {
  console.log(equation)
  return (
    <article
      className={CalculadorCardCSS.article}
      aria-label={link}
      onClick={(event) => {
        click();
      }}
    >
      <h3 className={CalculadorCardCSS.title}>{link}</h3>

      <p className={CalculadorCardCSS.description}>{description}</p>
      {equation !== null && (
        <div className={CalculadorCardCSS.latex}>
          <Latex  >
            {equation}
          </Latex>
        </div>
      )}
    </article>
  );
};
