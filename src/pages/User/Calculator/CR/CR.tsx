import React, { useState } from "react";

import TextField from "../../../../components/Textfield/TextField";
import Button from "../../../../components/Button/Button";
import LatexComponent from "../../../../components/LatexComponent/LatexComponent";
const CR = () => {
  const [CR, setCR] = useState({
    D: "",
    T: "",
    C: "",
  });
  const [N, setN] = useState(0);
  const [IM, setIM] = useState(0);
  const onChange = (e) => {
    setCR({ ...CR, [e.target.name]: e.target.value });
  };
  const submit = (event) => {
    event.preventDefault();
    
    setN(Number(Math.round((Number(CR.D) * Number(CR.T)) /(60 * Number(CR.C)))));
    setIM(N * Number(CR.C));
  };
  return (
    <form
      onSubmit={submit}
      style={{
        margin: "10px",
        display: "flex",
        gap: "20px",
        flexDirection: "column",
      }}
    >
      <h3>Cantidad de recipientes y Inventario Máximo</h3>
      <TextField
        autoFocus={true}
        value={CR.D}
        onChangeInputValue={onChange}
        id={"D"}
        title={"Tasa de demanda"}
        type={"number"}
        isRequired={true}
        readOnly={false}
      />
      <TextField
        autoFocus={false}
        value={CR.T}
        onChangeInputValue={onChange}
        id={"T"}
        title={"Tiempo de vuelta de recipientes (Minutos)"}
        type={"number"}
        isRequired={true}
        readOnly={false}
      />

      <TextField
        autoFocus={false}
        value={CR.C}
        onChangeInputValue={onChange}
        id={"C"}
        title={"Tamaño del recipientes"}
        type={"number"}
        isRequired={true}
        readOnly={false}
      />
      <Button title={"Calcular"} onSubmit={(e) => {}} />
      {N != 0 && (
        <LatexComponent
          title={"Cálculo de recipientes:"}
          equation=   {`\\text{N = } \\frac{${CR.D} \\cdot ${CR.T} }{60 \\cdot ${CR.C}  } = \\text{${N} recipientes } `}
          inline={"20px"}
          block={"10px"}
        />
      )}
      {IM != 0 && (
        <LatexComponent
          title={"Cálculo de Inventario máximo:"}
          equation=   {`\\text{IM = } ${N} \\cdot ${CR.C} = \\text{${IM} unidades}`}
          inline={"20px"}
          block={"10px"}
        />
      )}
    </form>
  );
};

export default CR;
