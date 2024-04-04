import React from "react";

import { useState } from "react";
import TextField from "../../../components/Textfield/TextField";
import Button from "../../../components/Button/Button";
import ContentPageCSS from "../ContentPage.module.css";
import LatexComponent from "../../../components/LatexComponent/LatexComponent";
var NF = 0,
  CT = 0,
  CF = 0;
const CMC = () => {
  const [result, changeResult] = useState(null);

  const [CMC, setCMC] = useState({
    HORA: "",
    MTBF: "",
    DT: "",
    CHT: "",
    R: "",
    CTO: "",
    RL: "0",
    CUP: "",
    CFVU: "",
  });
  const onChange = (e) => {
    setCMC({ ...CMC, [e.target.name]: e.target.value });
  };

  const submit = async (event) => {
    event.preventDefault();
    NF = CMC.HORA / CMC.MTBF;
    console.log(NF);
    CT =
      Number(CMC.DT) * Number(CMC.CHT) +
      Number(CMC.CTO) +
      Number(CMC.R) +
      Number(CMC.RL);
    CF = Number(CMC.DT) * Number(CMC.CUP) + Number(CMC.CFVU);

    changeResult(Math.round(NF) * (CT + CF));
    console.log(result);
  };
  return (
    <div
      className={ContentPageCSS.contentForm}
      onClick={(event) => {
        event.stopPropagation();
      }}
      style={{
        zIndex: "1000",
        position: "absolute",
      }}
    >
      <form
        onClick={(event) => {
          event.stopPropagation();
        }}
        style={{
          height: "80vh",
          overflowAnchor: "auto",
          overflowY: "auto",
          margin: "10px",
          display: "flex",
          gap: "12px",
          flexDirection: "column",
        }}
        onSubmit={submit}
      >
        <TextField
          autoFocus={true}
          title={"Horas"}
          onChangeInputValue={onChange}
          id={"HORA"}
          isRequired={true}
          type={"number"}
          value={CMC.HORA}
        />
        <TextField
          title={"MTBF"}
          onChangeInputValue={onChange}
          id={"MTBF"}
          isRequired={true}
          type={"number"}
          value={CMC.MTBF}
        />
        <TextField
          title={"Duración de la tareas"}
          onChangeInputValue={onChange}
          id={"DT"}
          isRequired={true}
          type={"number"}
          value={CMC.DT}
        />

        <TextField
          title={"Costo por hora de trabajo"}
          onChangeInputValue={onChange}
          id={"CHT"}
          isRequired={true}
          type={"number"}
          value={CMC.CHT}
        />
        <TextField
          title={"Repuestos"}
          onChangeInputValue={onChange}
          id={"R"}
          isRequired={true}
          type={"number"}
          value={CMC.R}
        />
        <TextField
          title={"Costes operativos"}
          onChangeInputValue={onChange}
          id={"CTO"}
          isRequired={true}
          type={"number"}
          value={CMC.CTO}
        />

        <TextField
          title={"Retraso logístico"}
          onChangeInputValue={onChange}
          id={"RL"}
          isRequired={true}
          type={"number"}
          value={CMC.RL}
        />
        <TextField
          title={"Costes unitarios"}
          onChangeInputValue={onChange}
          id={"CUP"}
          isRequired={true}
          type={"number"}
          value={CMC.CUP}
        />

        <TextField
          title={"Coste de la falla"}
          onChangeInputValue={onChange}
          id={"CFVU"}
          isRequired={true}
          type={"number"}
          value={CMC.CFVU}
        />

        <Button title={"Calcular"} onSubmit={submit} />
      </form>
      {result != null && (
        <LatexComponent
          title={"Cálculo:"}
          equation={`$\\ CMC =  ${Math.round(
            NF
          )} \\cdot \\{{${CT} + ${CF} }\\} = ${Math.round(result)} $`}
          inline={"20px"}
          block={"10px"}
        />
      )}
    </div>
  );
};
export default CMC;
