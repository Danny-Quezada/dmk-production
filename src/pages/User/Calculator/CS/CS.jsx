import React from "react";
import ContentPageCSS from "../../ContentPage.module.css";
import cs from "./CS.module.css";
import { useState } from "react";
import TextField from "../../../../components/Textfield/TextField";
import Button from "../../../../components/Button/Button";
import LatexComponent from "../../../../components/LatexComponent/LatexComponent";
import CSService from "../../../../lib/AppCore/Services/CSServices";
import Options from "../../../../components/Options/Options";

const CS = () => {
  const [result, changeResult] = useState(null);
  const [Cost, setCost] = useState("CFP");

  const frequencyOptions = [
    { label: "Diaria", value: "Diaria" },
    { label: "Semanal", value: "Semanal" },
    { label: "Anual", value: "Anual" },
  ];

  const HandleCalculateCS = () => {
    const csService = new CSService();
    csService.setValues(CS.SS, CS.Q, CS.T);
    let result = 0;
    if (Cost === "CFP") {
      result = csService.calculateFixedCost(CS.Q, CS.SS);
    } else {
      result = csService.calculateAverageCost(CS.D, CS.T, CS.SS);
    }
    CS.ValorPromedio = result;
    const rotation = csService.calculateInventoryRotation(CS.D, result, CS.F);
    setCS((prevState) => ({
      ...prevState,
      DS: csService.getDemand(CS.D, CS.F),
    }));
    changeResult(rotation);
  };

  const [CS, setCS] = useState({
    D: "",
    SS: "",
    T: "",
    Q: "",
    ValorPromedio: "",
    F: "Diaria",
    DS: "",
  });
  const onChange = (e) => {
    setCS({ ...CS, [e.target.name]: e.target.value });
  };

  const submit = async (event) => {
    event.preventDefault();
    HandleCalculateCS();
  };
  return (
    <>
      <form
        style={{
          margin: "10px",
          display: "flex",
          gap: "20px",
          flexDirection: "column",
        }}
        onSubmit={submit}
      >
        <h3>Control de inventario</h3>
        <TextField
          autoFocus={true}
          id={"D"}
          title={"Demanda"}
          isRequired={true}
          onChangeInputValue={onChange}
          type={"number"}
          value={CS.D}
          readOnly={false}
        />

        <Options
          name="F"
          value={CS.F}
          onChange={onChange}
          options={frequencyOptions}
        />

        <TextField
          id={"SS"}
          title={"Inventario de seguridad"}
          isRequired={true}
          onChangeInputValue={onChange}
          type={"number"}
          value={CS.SS}
          readOnly={false}
        />
        {Cost != "" ? (
          <TextField
            id={Cost == "CFP" ? "Q" : "T"}
            title={Cost != "CFP" ? "Ciclo de revisión" : "Cantidad pedida"}
            isRequired={true}
            onChangeInputValue={onChange}
            type={"number"}
            value={Cost == "CFP" ? CS.Q : CS.T}
            readOnly={false}
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
          equation={`$ RI = \\frac{${CS.DS} }{${
            CS.ValorPromedio
          } }  = ${Math.round(result)} $`}
          inline={"20px"}
          block={"10px"}
        />
      )}
    </>
  );
};
export default CS;
