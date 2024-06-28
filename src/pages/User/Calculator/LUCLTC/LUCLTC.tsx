import React, { useState } from "react";
import LUCTLCSTYLE from "./LUCLTC.module.css";
import TextField from "../../../../components/Textfield/TextField";
import CalculateLUCLTC from "../../../../lib/infrastructure/CalculateLUCLTC";
import { GrLinkNext } from "react-icons/gr";
import { random } from "mermaid/dist/utils";
import LTC from "../../../../lib/domain/Models/Equations/LTC";
import LUC from "../../../../lib/domain/Models/Equations/LUC";
const LUCLTC = () => {
  const [VALUES, setValues] = useState({
    S: 2.25,
    K: 0.02,
    LT: 1,
    SEMANAS: 8,
  });
  const onChange = (e) => {
    setValues({ ...VALUES, [e.target.name]: e.target.value });
    setNext(false);
    setCalculate(false);
  };
  const [next, setNext] = useState(false);
  const [calculateBool, setCalculate] = useState(false);
  const [LTCS, setLTCs] = useState<LTC[]>([]);
  const [LUCS, setLUCs]=useState<LUC[]>([]);
  const submit = async (event) => {
    event.preventDefault();
  };
  let calculate: CalculateLUCLTC = new CalculateLUCLTC();

  return (
    <div
      style={{
        overflowX: "hidden",
        overflowY: "auto",
        margin: "10px",
        display: "flex",
        gap: "30px",
        flexDirection: "column",

        height: "85vh",
      }}
    >
      <form
        style={{
          margin: "10px",
          display: "flex",
          gap: "30px",
          flexDirection: "column",
        }}
        onSubmit={(e) => {
          e.preventDefault();
          setNext(true);
        }}
      >
        <h3>Cálculo de LUC Y LTC</h3>
        <div className={LUCTLCSTYLE.textFields}>
          <TextField
            autoFocus={true}
            title={"Costo de ordenar (S)"}
            onChangeInputValue={onChange}
            id={"S"}
            isRequired={true}
            type={"number"}
            value={VALUES.S.toString()}
            readOnly={false}
          />
          <TextField
            autoFocus={false}
            title={"Costo de mantenimiento (K)"}
            onChangeInputValue={onChange}
            id={"K"}
            isRequired={true}
            type={"number"}
            value={VALUES.K.toString()}
            readOnly={false}
          />

          <TextField
            autoFocus={false}
            title={"Tiempo de entrega (LT)"}
            onChangeInputValue={onChange}
            id={"LT"}
            isRequired={true}
            type={"number"}
            value={VALUES.LT.toString()}
            readOnly={false}
          />

          <TextField
            autoFocus={false}
            title={"Semanas"}
            onChangeInputValue={onChange}
            id={"SEMANAS"}
            isRequired={true}
            type={"number"}
            value={VALUES.SEMANAS.toString()}
            readOnly={false}
            compareValue={VALUES.LT}
          />
          <button className={LUCTLCSTYLE.info}>Continuar</button>
        </div>
      </form>
      {next && (
        <form
          style={{ display: "flex", flexDirection: "column", gap: "20px" }}
          onSubmit={(e) => {
            e.preventDefault();
            let numbers: number[] = [];
            for (let i = 0; i < e.target.elements.length; i++) {
              if (e.target.elements[i].value != "") {
                numbers.push(Number.parseFloat(e.target.elements[i].value));
              }
            }
            setLTCs(calculate.CalculateLTC(VALUES.S, VALUES.K, numbers));
            setLUCs(calculate.CalculateLUC(VALUES.S,VALUES.K, VALUES.LT,numbers));
            setCalculate(true);
          }}
        >
          <div style={{ overflowX: "auto" }}>
            <table className={LUCTLCSTYLE.table}>
              <thead>
                <tr>
                  <th colSpan={VALUES.SEMANAS}>Semanas</th>
                </tr>
              </thead>
              <thead>
                <tr style={{ textAlign: "start", fontWeight: "bold" }}>
                  <td></td>
                  {Array.from({ length: VALUES.SEMANAS }, (_, i) => (
                    <td key={`semana: ${i + 1}`}>{i + 1}</td>
                  ))}
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td style={{ fontSize: "13px", paddingRight: "10px" }}>
                    Requerimiento bruto
                  </td>
                  {Array.from({ length: VALUES.SEMANAS }, (_, i) => (
                    <td key={`input: ${i}`}>
                      <input
                        onInvalid={(e) => {
                          // e.preventDefault();
                          const event = e.target as HTMLInputElement;

                          if (event.value === "") {
                            event.setCustomValidity("Campo requerido");
                          }

                          if (event.value === "--" || event.value === "e") {
                            event.setCustomValidity("Solamente números");
                          }
                        }}
                        step={"any"}
                        style={{ border: "none", outline: "none" }}
                        type="number"
                        name={`input: ${i}`}
                        placeholder="Digite número"
                        required
                        onInput={(e) => {
                          const event = e.target as HTMLInputElement;
                          event.setCustomValidity("");
                          if (calculateBool) {
                            setCalculate(false);
                          }
                        }}
                        autoFocus={i == 0 && true}
                      />
                    </td>
                  ))}
                </tr>
                {
                  calculateBool && (
                    <tr>
                      <td>LTC</td>
                      {LTCS.map((e)=>{
                        if(e.Delete){
                          return <td style={{ textAlign: "start",}}>{e.Units}</td>
                        }
                        return <td></td>
                      })}
                    </tr>
                  )
                  
                }
                {
                  calculateBool && (
                    <tr>
                      <td>LUC</td>
                      {LUCS.map((e)=>{
                        if(e.Delete){
                          return <td style={{ textAlign: "start",}}>{e.Units}</td>
                        }
                        return <td></td>
                      })}
                    </tr>
                  )
                }
              </tbody>
            </table>
          </div>
          <button className={LUCTLCSTYLE.info} type="submit">
            Calcular
          </button>
        </form>
      )}
      {calculateBool && (
        <div>
          <div style={{ overflowX: "auto"}}>
            <table className={LUCTLCSTYLE.table}>
              <thead>
                <tr>
                  <th colSpan={5}>LTC</th>
                </tr>
              </thead>
              <thead>
                <tr>
                  <th>Período</th>
                  <th>Unidades</th>
                  <th>Períodos mantenidos</th>
                  <th>Costo de mantenimiento</th>
                  <th>Costo de mantenimiento acumulado</th>
                </tr>
              </thead>
              <tbody>
                {LTCS.map((e) => (
                  <tr
                    style={{
                      backgroundColor: e.Delete ? "#ff000052" : "",
                      color: e.Delete ? "white" : "",
                      fontWeight: e.Delete ? "bold" : "",
                    }}
                  >
                    <td>{e.Period}</td>
                    <td>{e.Units}</td>
                    <td>{e.MaintainedPeriod}</td>
                    <td>{e.MaintenanceCost}</td>
                    <td>{e.CumulativeMaintenanceCost}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
      {calculateBool && (
        <div>
          <div style={{ overflowX: "auto"}}>
            <table className={LUCTLCSTYLE.table}>
              <thead>
                <tr>
                  <th colSpan={6}>LUC</th>
                </tr>
              </thead>
              <thead>
                <tr>
                  <th>Período</th>
                  <th>Unidades</th>
                  <th>S</th>
                  <th>K</th>
                  <th>Costo total</th>
                  <th>Costo total de unidades</th>
                </tr>
              </thead>
              <tbody>
                {LUCS.map((e) => (
                  <tr
                    style={{
                      backgroundColor: e.Delete ? "#ff000052" : "",
                      color: e.Delete ? "white" : "",
                      fontWeight: e.Delete ? "bold" : "",
                    }}
                  >
                    <td>{e.PeriodString}</td>
                    <td>{e.UnitString}</td>
                    <td>{e.S}</td>
                    <td>{e.K}</td>
                    <td>{e.UnitCost.toPrecision(4)}</td>
                    <td>{e.TotalCost.toPrecision(4)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

    </div>
  );
};

export default LUCLTC;
