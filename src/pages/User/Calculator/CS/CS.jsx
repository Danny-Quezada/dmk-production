import React from "react";
import cs from "./CS.module.css";
import { useState } from "react";
import TextField from "../../../../components/Textfield/TextField";
import Button from "../../../../components/Button/Button";
import ContentPageCSS from "../../ContentPage.module.css";
import LatexComponent from "../../../../components/LatexComponent/LatexComponent";
const CS = () => {
  const [result, changeResult] = useState(null);
  const [Cost, setCost] = useState("CFP");

  const [CS, setCS] = useState({
    D: "",
    SS: "",
    T: "",
    Q: "",
    ValorPromedio: "",
  });
  const onChange = (e) => {
    setCS({ ...CS, [e.target.name]: e.target.value });
  };

  const submit = async (event) => {
    event.preventDefault();
    if (Cost === "CFP") {
      console.log(Cost);
      CS.ValorPromedio = Number(CS.Q) / 2 + Number(CS.SS);
    } else {
      CS.ValorPromedio = (Number(CS.D) * Number(CS.T)) / 2 + Number(CS.SS);
    }
    changeResult(Number(CS.D) / CS.ValorPromedio);
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
          id={"D"}
          title={"Demanda"}
          isRequired={true}
          onChangeInputValue={onChange}
          type={"number"}
          value={CS.D}
        />

        <TextField
          id={"SS"}
          title={"Inventario de seguridad"}
          isRequired={true}
          onChangeInputValue={onChange}
          type={"number"}
          value={CS.SS}
        />
        {Cost != "" ? (
          <TextField
            id={Cost == "CFP" ? "Q" : "T"}
            title={Cost != "CFP" ? "Ciclo de revisión" : "Cantidad pedida"}
            isRequired={true}
            onChangeInputValue={onChange}
            type={"number"}
            value={Cost == "CFP" ? CS.Q : CS.T}
          />
        ) : (
          <div></div>
        )}
        <select
          name="Select"
          id={cs.Select}
          required={true}
          value={Cost}
          onChange={(value) => setCost(value.target.value)}
        >
          <option defaultValue={""} value="">
            Selecciona costo
          </option>
          <option value="CFP">Costo fijo por pieza</option>
          <option value="CPP">Costo promedio por pieza</option>
        </select>

        <Button title={"Calcular"} onSubmit={submit} />
      </form>

      {result != null && (
        <LatexComponent
          title={"Cálculo:"}
          equation={`$ RI = \\frac{${CS.D} }{${
            CS.ValorPromedio
          } }  = ${Math.round(result)} $`}
          inline={"20px"}
          block={"10px"}
        />
      )}
    </div>
  );
};
export default CS;
