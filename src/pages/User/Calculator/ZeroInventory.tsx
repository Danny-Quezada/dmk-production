import React, { useState } from "react";

import TextField from "../../../components/Textfield/TextField";
import { GrLinkNext } from "react-icons/gr";
import LUCTLCSTYLE from "./LUCLTC/LUCLTC.module.css";
const ZeroInventory = () => {
  const [nextForm, setForm] = useState(false);
  const [ZI, setZI] = useState({
    PPT: 0, // Producción promedio por trabajador
    MESES: 0, // Meses que se hará el inventario
    OAI: 0, // Operarios actuales iniciales
    CDT: 0, // Costo de despedir un trabajador
    CCT: 0, // Costo de contratar un trabajador
  });
  const [calculateBool, setCalculate] = useState(false);
  const onChange = (e) => {
    setZI({ ...ZI, [e.target.name]: e.target.value });
    setForm(false);
  };

  const submit = (event) => {
    event.preventDefault();
    setForm(true);
    // changeResult(Math.sqrt((2 * eoq.D * eoq.S) / eoq.H));
  };
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
      <h3>Inventario cero</h3>
      <form
        style={{
          justifyContent: "center",

          display: "flex",
          gap: "20px",
          flexDirection: "column",
        }}
        onSubmit={submit}
      >
        <div
          style={{
            justifyContent: "center",
            alignItems: "end",
            display: "flex",
            gap: "20px",
          }}
        >
          <TextField
            autoFocus={true}
            value={ ZI.PPT===0 ? "": ZI.PPT.toString()}
            onChangeInputValue={onChange}
            id={"PPT"}
            title={"Producción por trabajador"}
            type={"number"}
            isRequired={true}
            readOnly={false}
          />
          <TextField
          
            autoFocus={false}
            onChangeInputValue={onChange}
            type={"number"}
            id={"MESES"}
            isRequired={true}
            title={"Meses"}
            value={ZI.MESES===0 ? "" : ZI.MESES.toString()}
            readOnly={false}
          />
          <TextField
            autoFocus={false}
            onChangeInputValue={onChange}
            type={"number"}
            id={"OAI"}
            isRequired={true}
            title={"Operarios actuales"}
            value={ZI.OAI===0 ? "" : ZI.OAI.toString()}
            readOnly={false}
          />
        </div>
        <div
          style={{
            justifyContent: "center",
            alignItems: "end",
            display: "flex",
            gap: "20px",
          }}
        >
          <TextField
            autoFocus={true}
            value={ZI.CDT===0 ? "" :ZI.CDT.toString()}
            onChangeInputValue={onChange}
            id={"CDT"}
            title={"Costo de despedir un trabajador"}
            type={"number"}
            isRequired={true}
            readOnly={false}
          />
          <TextField
            autoFocus={false}
            onChangeInputValue={onChange}
            type={"number"}
            id={"CCT"}
            isRequired={true}
            title={"Costo de contratar un trabajador"}
            value={ZI.CCT ===0 ? "": ZI.CCT.toString()}
            readOnly={false}
          />
        </div>

        <button className={LUCTLCSTYLE.info} type="submit">
          Siguiente
        </button>
      </form>
      {nextForm && (
        <form style={{ display: "flex", flexDirection: "column", gap: "25px" }} 
        onSubmit={(e)=>{
          e.preventDefault();
        }}>
          <div style={{ overflowX: "auto" }}>
            <table className={LUCTLCSTYLE.table}>
              <thead>
                <tr>
                  <th colSpan={ZI.MESES + 1}>Datos iniciales</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td style={{ fontSize: "13px", paddingRight: "10px" }}>
                    Dias laborados
                  </td>
                  {Array.from({ length: ZI.MESES }, (_, i) => (
                    <td key={`input: ${i}`}>
                      <input
                      min={1}
                      
                      max={503}
                       
                        onInvalid={(e) => {
                          // e.preventDefault();
                          const event = e.target as HTMLInputElement;
                       
                          if (event.value === "") {
                            event.setCustomValidity("Campo requerido");
                          }

                          if (event.value === "--" || event.value === "e") {
                            event.setCustomValidity("Solamente números");
                          }
                          console.log(event.value)
                          if (!Number.isInteger(Number(event.value))) {
                            event.setCustomValidity("Solamente números enteros");
                          }
                          if (Number(event.value)<=0) {
                            event.setCustomValidity("Tiene que se mayor que 0");
                          }
                        }}
                        step={"any"}
                        style={{ border: "none", outline: "none" }}
                        type="number"
                        name={`Labores ${i}`}
                        placeholder="Digite número"
                        required
                        onInput={(e) => {
                          const event = e.target as HTMLInputElement;
                              event.setCustomValidity("")
                          if (calculateBool) {
                            setCalculate(false);
                          }
                        }}
                        autoFocus={i == 0 && true}
                      />
                    </td>
                  ))}
                </tr>
                <tr>
                  <td style={{ fontSize: "13px", paddingRight: "10px" }}>
                    Demanda
                  </td>
                  {Array.from({ length: ZI.MESES }, (_, i) => (
                    <td key={`input2: ${i}`}>
                      <input
                      min={1}
                      
                      max={503}
                       
                        onInvalid={(e) => {
                          // e.preventDefault();
                          const event = e.target as HTMLInputElement;
                       
                          if (event.value === "") {
                            event.setCustomValidity("Campo requerido");
                          }

                          if (event.value === "--" || event.value === "e") {
                            event.setCustomValidity("Solamente números");
                          }
                          console.log(event.value)
                          if (!Number.isInteger(Number(event.value))) {
                            event.setCustomValidity("Solamente números enteros");
                          }
                          if (Number(event.value)<=0) {
                            event.setCustomValidity("Tiene que se mayor que 0");
                          }
                        }}
                        step={"any"}
                        style={{ border: "none", outline: "none" }}
                        type="number"
                        name={`Demanda ${i}`}
                        placeholder="Digite número"
                        required
                        onInput={(e) => {
                          const event = e.target as HTMLInputElement;
                              event.setCustomValidity("")
                          if (calculateBool) {
                            setCalculate(false);
                          }
                        }}
                        autoFocus={i == 0 && true}
                      />
                    </td>
                  ))}
                </tr>
              </tbody>
            </table>
          </div>
          <button>
            si
          </button>
        </form>
      )}
    </div>
  );
};

export default ZeroInventory;
