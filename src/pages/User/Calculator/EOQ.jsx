import React from "react";
import { useState } from "react";
import LatexComponent from "../../../components/LatexComponent/LatexComponent";
import TextField from "../../../components/Textfield/TextField";
import Button from "../../../components/Button/Button";
import ContentPageCSS from "../ContentPage.module.css";
export default function EOQ() {
  const [result, changeResult] = useState(null);
  const [eoq, setEOQ] = useState({
    D: "",
    S: "",
    H: "",
  });
  const onChange = (e) => {
    setEOQ({ ...eoq, [e.target.name]: e.target.value });
  };

  const submit = (event) => {
    event.preventDefault();
    changeResult(Math.sqrt((2 * eoq.D * eoq.S) / eoq.H));
  };
  return (
    <div
      className={ContentPageCSS.contentForm}
      onClick={(event) => {
        event.stopPropagation();
      }}
      style={{
        zIndex: "200",
        position: "absolute",
      }}
    >
      <form
        style={{
          margin: "10px",
          display: "flex",
          gap: "20px",
          flexDirection: "column",
        }}
        onSubmit={submit}
      >
        <TextField
          autoFocus={true}
          value={eoq.D}
          onChangeInputValue={onChange}
          id={"D"}
          title={"Demanda"}
          type={"number"}
          isRequired={true}
        />

        <TextField
          onChangeInputValue={onChange}
          type={"number"}
          id={"S"}
          isRequired={true}
          title={"Coste de establecimiento"}
          value={eoq.S}
        />

        <TextField
          onChangeInputValue={onChange}
          id={"H"}
          type={"number"}
          value={eoq.H}
          isRequired={true}
          title={"Coste de mantenimiento"}
        />
        <Button title={"Calcular"} onSubmit={submit} />
      </form>
      {result != null && (
        <LatexComponent
          title={"Cálculo:"}
          equation={`$\\sqrt{\\frac{2\\cdot  ${eoq.D} \\cdot ${eoq.S} }{ ${
            eoq.H
          } }} = ${Math.round(result)} $`}
          inline={"20px"}
          block={"10px"}
        />
      )}
    </div>
  );
}
