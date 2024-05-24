import React from "react";

import { useState } from "react";
import TextField from "../../../components/Textfield/TextField";
import Button from "../../../components/Button/Button";
import ContentPageCSS from "../ContentPage.module.css";
import LatexComponent from "../../../components/LatexComponent/LatexComponent";
import ButtonPercentage from "../../../components/ButtonPercentage/ButtonPercentage";
import CMCService from "../../../lib/AppCore/Services/CMCServices";
import { FaPercentage } from "react-icons/fa";

var NF = 0,
  CT = 0,
  CF = 0;
const CMC = () => {
  const HandleCalculateCMC = () => {
    const cmcService = new CMCService();
    if (CMC.MTBF === "" && valueMTBF === "") {
      return;
    }
    let result;
    if (independentButtonActive) {
      let MTBFCalculation;
      if (activeGroupButton === "H") {
        MTBFCalculation = cmcService.calculateMTBF(valueMTBF, CMC.HORA);
      }
      if (activeGroupButton === "R") {
        MTBFCalculation = cmcService.calculateMTBF(valueMTBF, CMC.R);
      }
      if (activeGroupButton === "C") {
        MTBFCalculation = cmcService.calculateMTBF(valueMTBF, CMC.CTO);
      }
      // cmcService.setvalues(CMC.HORA, MTBFCalculation, CMC.DT, CMC.CHT, CMC.R, CMC.CTO, CMC.RL, CMC.CUP, CMC.CFVU);
      result = cmcService.calculateCMC(
        CMC.HORA,
        MTBFCalculation,
        CMC.DT,
        CMC.CHT,
        CMC.R,
        CMC.CTO,
        CMC.RL,
        CMC.CUP,
        CMC.CFVU
      );
      NF = cmcService.calculateNF(CMC.HORA, MTBFCalculation);
    } else {
      // cmcService.setvalues(CMC.HORA, CMC.MTBF, CMC.DT, CMC.CHT, CMC.R, CMC.CTO, CMC.RL, CMC.CUP, CMC.CFVU);
      result = cmcService.calculateCMC(
        CMC.HORA,
        CMC.MTBF,
        CMC.DT,
        CMC.CHT,
        CMC.R,
        CMC.CTO,
        CMC.RL,
        CMC.CUP,
        CMC.CFVU
      );
      NF = cmcService.calculateNF(CMC.HORA, CMC.MTBF);
    }
    CT = cmcService.calculateCT(CMC.DT, CMC.CHT, CMC.R, CMC.CTO, CMC.RL);
    CF = cmcService.calculateCF(CMC.DT, CMC.CUP, CMC.CFVU);
    changeResult(result);
  };

  const [result, changeResult] = useState(null);

  const [valueMTBF, setValueMTBF] = useState("");
  const [readOnly, setReadOnly] = useState(true);
  const [independentButtonActive, setIndependentButtonActive] = useState(false);
  const [activeGroupButton, setActiveGroupButton] = useState(null);

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
    HandleCalculateCMC();
  };

  const handleIndependentClick = () => {
    setIndependentButtonActive(!independentButtonActive);

    setReadOnly(!readOnly);

    if (!readOnly) {
      setValueMTBF("");
      setActiveGroupButton(null);
    } else {
      setCMC((prevState) => ({
        ...prevState,
        MTBF: "",
      }));
    }
  };

  const handleGroupButtonClick = (buttonId) => () => {
    if (independentButtonActive) {
      setActiveGroupButton(buttonId);
    }
  };

  return (
    <div style={{
      overflowAnchor: "auto",
      overflowY: "auto",
    }}>
      <form
        onClick={(event) => {
          event.stopPropagation();
        }}
        style={{
       
         
          margin: "8px",
          display: "flex",
          gap: "12px",
          flexDirection: "column",
        }}
        onSubmit={submit}
      >
        <h3>Mantenimiento correctivo</h3>
        <TextField
          autoFocus={true}
          title={"Horas"}
          onChangeInputValue={onChange}
          id={"HORA"}
          isRequired={true}
          type={"number"}
          value={CMC.HORA}
          readOnly={false}
        />

        <div style={{ display: "flex", alignItems: "end" }}>
          <TextField
            autoFocus={false}
            title={"MTBF"}
            onChangeInputValue={onChange}
            id={"MTBF"}
            isRequired={false}
            type={"number"}
            value={CMC.MTBF}
            readOnly={!readOnly}
          />

          <ButtonPercentage
            onClick={handleIndependentClick}
            content={<FaPercentage size={15} />}
            isActive={independentButtonActive}
            title={"Porcentaje para el MTBF"}
          />
        </div>

        {independentButtonActive == true && (
          <div
            style={{
              display: "flex",
              alignItems: "end",
              gap: "5px",
              transformStyle: "initial",
              transition: "all 0.2",
            }}
          >
            <TextField
              autoFocus={false}
              title={"Porcentaje para el MTBF (%)"}
              onChangeInputValue={(e) => setValueMTBF(e.target!.value)}
              id={"MTBFPercentage"}
              isRequired={false}
              type={"number"}
              value={valueMTBF}
              readOnly={readOnly}
            />

            <ButtonPercentage
              onClick={handleGroupButtonClick("H")}
              content={"H"}
              isActive={activeGroupButton === "H"}
              title={"Horas"}
            />
            <ButtonPercentage
              onClick={handleGroupButtonClick("R")}
              content={"R"}
              isActive={activeGroupButton === "R"}
              title={"Repuestos"}
            />
            <ButtonPercentage
              onClick={handleGroupButtonClick("C")}
              content={"C"}
              isActive={activeGroupButton === "C"}
              title={"Costos operativos"}
            />
          </div>
        )}

        <TextField
          autoFocus={false}
          title={"Duración de la tarea"}
          onChangeInputValue={onChange}
          id={"DT"}
          isRequired={true}
          type={"number"}
          value={CMC.DT}
          readOnly={false}
        />

        <TextField
          autoFocus={false}
          title={"Costo por hora de trabajo"}
          onChangeInputValue={onChange}
          id={"CHT"}
          isRequired={true}
          type={"number"}
          value={CMC.CHT}
          readOnly={false}
        />
        <TextField
          autoFocus={false}
          title={"Repuestos"}
          onChangeInputValue={onChange}
          id={"R"}
          isRequired={true}
          type={"number"}
          value={CMC.R}
          readOnly={false}
        />
        <TextField
          autoFocus={false}
          title={"Costes operativos"}
          onChangeInputValue={onChange}
          id={"CTO"}
          isRequired={true}
          type={"number"}
          value={CMC.CTO}
          readOnly={false}
        />

        <TextField
          autoFocus={false}
          title={"Retraso logístico"}
          onChangeInputValue={onChange}
          id={"RL"}
          isRequired={true}
          type={"number"}
          value={CMC.RL}
          readOnly={false}
        />
        <TextField
          autoFocus={false}
          title={"Costes unitarios"}
          onChangeInputValue={onChange}
          id={"CUP"}
          isRequired={true}
          type={"number"}
          value={CMC.CUP}
          readOnly={false}
        />

        <TextField
          autoFocus={false}
          title={"Coste de la falla"}
          onChangeInputValue={onChange}
          id={"CFVU"}
          isRequired={true}
          type={"number"}
          value={CMC.CFVU}
          readOnly={false}
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
