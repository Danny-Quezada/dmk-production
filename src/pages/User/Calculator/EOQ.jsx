import React from "react";
import ContentPageCSS from "../ContentPage.module.css";
import { useState } from "react";
import LatexComponent from "../../../components/LatexComponent/LatexComponent";
import TextField from "../../../components/Textfield/TextField";
import Button from "../../../components/Button/Button";
import EOQService from '../../../services/EOQServices';
import Options from '../../../components/Options/Options';

export default function EOQ() {

  const frequencyOptions = [
    { label: 'Diaria', value: 'Diaria' },
    { label: 'Semanal', value: 'Semanal' },
    { label: 'Anual', value: 'Anual' }
  ];
  
  const HandleCalculateEOQ = () => {
    const eoqService = new EOQService();
    eoqService.setCosts(eoq.S, eoq.H);
    
    const result = eoqService.calculateEOQ(eoq.D, eoq.F);
    setEOQ(prevState => ({ 
      ...prevState, 
      DS: eoqService.getDemand(eoq.D, eoq.F)}));
    changeResult(result);
  }

  const [result, changeResult] = useState(null);
  const [eoq, setEOQ] = useState({
    D: "",
    S: "",
    H: "",
    F: "Diaria",
    DS: "",
  });

  const onChange = (e) => {
    setEOQ({ ...eoq, [e.target.name]: e.target.value });
  };

  const submit = (event) => {
    event.preventDefault();
    HandleCalculateEOQ();
    // changeResult(Math.sqrt((2 * eoq.D * eoq.S) / eoq.H));
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
            <h3>EOQ</h3>
        <TextField
          autoFocus={true}
          value={eoq.D}
          onChangeInputValue={onChange}
          id={"D"}
          title={"Demanda"}
          type={"number"}
          isRequired={true}
        />

        <Options
        name="F"
        value={eoq.F}
        onChange={onChange}
        options={frequencyOptions}
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
          equation={`$\\sqrt{\\frac{2\\cdot  ${eoq.DS} \\cdot ${eoq.S} }{ ${
            eoq.H
          } }} = ${Math.round(result)} $`}
          inline={"20px"}
          block={"10px"}
        />
      )}
    </>
  );
}
