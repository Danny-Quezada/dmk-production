import React, { useState } from "react";

import TextField from "../../../components/Textfield/TextField";
import { GrLinkNext } from "react-icons/gr";
import LUCTLCSTYLE from "./LUCLTC/LUCLTC.module.css";
import ZEROINVENTORY from "../../../lib/domain/Models/Equations/ZEROINVENTORY";
import CALCULATEZI from "../../../lib/infrastructure/CALCULATEZI";
const ZeroInventory = () => {




  const [Zeros, setZeros] = useState<ZEROINVENTORY[] | null>(null);
  const [nextForm, setForm] = useState(false);
  const CalculateZero: CALCULATEZI=new CALCULATEZI();
  const [ZI, setZI] = useState({
    CDTH: 0,
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
    if(Zeros!=null){
      setZeros(null)
    }
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
            value={ZI.PPT === 0 ? "" : ZI.PPT.toString()}
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
            value={ZI.MESES === 0 ? "" : ZI.MESES.toString()}
            readOnly={false}
          />
          <TextField
            autoFocus={false}
            onChangeInputValue={onChange}
            type={"number"}
            id={"OAI"}
            isRequired={true}
            title={"Operarios actuales"}
            value={ZI.OAI === 0 ? "" : ZI.OAI.toString()}
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
            autoFocus={false}
            value={ZI.CDT === 0 ? "" : ZI.CDT.toString()}
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
            value={ZI.CCT === 0 ? "" : ZI.CCT.toString()}
            readOnly={false}
          />
          <TextField
            autoFocus={false}
            onChangeInputValue={onChange}
            type={"number"}
            id={"CDTH"}
            isRequired={true}
            title={"Costo de trabajador por hornal"}
            value={ZI.CDTH === 0 ? "" : ZI.CDTH.toString()}
            readOnly={false}
          />

        </div>

        <button className={LUCTLCSTYLE.info} type="submit">
          Siguiente
        </button>
      </form>
      {nextForm && (
        <form style={{ display: "flex", flexDirection: "column", gap: "25px" }}
          onSubmit={(e) => {
            e.preventDefault();
           
            const formElements = e.currentTarget
              .elements as typeof e.currentTarget.elements & {
              [key: string]: HTMLInputElement;
            };

            const Ds= Array.from(
              { length: ZI.MESES },
              (_, i) => {
               
                const demanda = Number(formElements[`Demanda ${i}`].value);
            
                return demanda;
              }
            );
            const DLs= Array.from(
              { length: ZI.MESES },
              (_, i) => {
               
                const DL = Number(formElements[`Labores ${i}`].value);
            
                return DL;
              }
            );
           setZeros(CalculateZero.CalculateZI(ZI.PPT,ZI.CDTH,ZI.OAI, ZI.CDT,ZI.CCT,DLs,Ds))
           console.log(Zeros);
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
                          if (Number(event.value) <= 0) {
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

                        max={100000}

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
                          if (Number(event.value) <= 0) {
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
          <button className={LUCTLCSTYLE.info} type="submit">
            Siguiente
          </button>
        </form>


      )}
       {Zeros != null && (
        <div>
          <div>
            <table className={LUCTLCSTYLE.table}>
             <thead>
              <tr>
              <th colSpan={ZI.MESES + 1}>Inventario cero</th>
              </tr>
             </thead>
              <tbody>
               <tr>
                <td style={{ fontSize: "13px", paddingRight: "10px" }}>Días laborales</td>
                {
                  Zeros.map((e)=> <td>
                    {e.DiasLaborados}
                  </td>)
                }
                <td>
                    {Zeros.reduce((total: number, objeto: ZEROINVENTORY) => {
                      return total + objeto.DiasLaborados;
                    }, 0)} 
                  </td>
               </tr>
               <tr>
                <td style={{ fontSize: "13px", paddingRight: "10px" }}>Demanda</td>
                {
                  Zeros.map((e)=> <td>
                    {e.Demanda}
                  </td>)
                }
                <td>
                    {Zeros.reduce((total: number, objeto: ZEROINVENTORY) => {
                      return total + objeto.Demanda;
                    }, 0)}
                  </td>
               </tr>
               <tr>
                <td style={{ fontSize: "13px", paddingRight: "10px" }}>Operarios requeridos</td>
                {
                  Zeros.map((e)=> <td>
                    {e.OperariosRequeridos}
                  </td>)
                }
                  <td>
                    {Zeros.reduce((total: number, objeto: ZEROINVENTORY) => {
                      return total + objeto.OperariosRequeridos;
                    }, 0)}
                  </td>
               </tr>
               <tr>
                <td style={{ fontSize: "13px", paddingRight: "10px" }}>Operarios Actuales</td>
                {
                  Zeros.map((e)=> <td>
                    {e.OperariosActuales}
                  </td>)
                }
               </tr>
               <tr>
                <td style={{ fontSize: "13px", paddingRight: "10px" }}>Operarios contratados</td>
                {
                  Zeros.map((e)=> <td>
                    {e.OperariosContratados}
                  </td>)
                }
                  <td>
                    {Zeros.reduce((total: number, objeto: ZEROINVENTORY) => {
                      return total + objeto.OperariosContratados;
                    }, 0)}
                  </td>
               </tr>
               <tr>
                <td style={{ fontSize: "13px", paddingRight: "10px" }}>Operarios despedidos</td>
                {
                  Zeros.map((e)=> <td>
                    {e.OperariosDespedidos}
                  </td>)
                }
                  <td>
                    {Zeros.reduce((total: number, objeto: ZEROINVENTORY) => {
                      return total + objeto.OperariosDespedidos;
                    }, 0)}
                  </td>
               </tr>
               <tr>
                <td style={{ fontSize: "13px", paddingRight: "10px" }}>Operarios utilizados</td>
                {
                  Zeros.map((e)=> <td>
                    {e.OperariosUtilizados}
                  </td>)
                }
                  <td>
                    {Zeros.reduce((total: number, objeto: ZEROINVENTORY) => {
                      return total + objeto.OperariosUtilizados;
                    }, 0)}
                  </td>
               </tr>
               <tr>
                <td style={{ fontSize: "13px", paddingRight: "10px" }}>Unidades Producidas</td>
                {
                  Zeros.map((e)=> <td>
                    {e.UnidadesProducidas}
                  </td>)
                }
                  <td>
                    {Zeros.reduce((total: number, objeto: ZEROINVENTORY) => {
                      return total + objeto.UnidadesProducidas;
                    }, 0)}
                  </td>
               </tr>
              </tbody>
            </table>
          </div>
        </div>
      )}
       {Zeros != null && (
        <div>
          <div>
            <table className={LUCTLCSTYLE.table} style={{marginBottom: "10px"}}>
             <thead>
              <tr>
              <th colSpan={ZI.MESES + 1}>Costo de plan agregado de producción</th>
              </tr>
             </thead>
              <tbody>
               <tr>
                <td style={{ fontSize: "13px", paddingRight: "10px" }}>Por contratar</td>
                {
                  Zeros.map((e)=> <td>
                    {e.CostoPorContratar}
                  </td>)
                }
                <td>
                    {Zeros.reduce((total: number, objeto: ZEROINVENTORY) => {
                      return total + objeto.CostoPorContratar;
                    }, 0)} 
                  </td>
               </tr>
               <tr>
                <td style={{ fontSize: "13px", paddingRight: "10px" }}>Por despedir</td>
                {
                  Zeros.map((e)=> <td>
                    {e.CostoPorDespedir}
                  </td>)
                }
                <td>
                    {Zeros.reduce((total: number, objeto: ZEROINVENTORY) => {
                      return total + objeto.CostoPorDespedir;
                    }, 0)}
                  </td>
               </tr>
               <tr>
                <td style={{ fontSize: "13px", paddingRight: "10px" }}>Por mano de obra</td>
                {
                  Zeros.map((e)=> <td>
                    {e.CostoManoObra}
                  </td>)
                }
                  <td>
                    {Zeros.reduce((total: number, objeto: ZEROINVENTORY) => {
                      return total + objeto.CostoManoObra;
                    }, 0)}
                  </td>
               </tr>
               </tbody>
            </table>
          </div>
        </div>
      )}


    </div>
  );
};

export default ZeroInventory;
