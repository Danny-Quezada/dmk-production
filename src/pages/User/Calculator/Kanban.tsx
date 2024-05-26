import React, { useState } from "react";
import TextField from "../../../components/Textfield/TextField";
import LUCTLCSTYLE from "./LUCLTC/LUCLTC.module.css";
import { GrLinkNext } from "react-icons/gr";
import KANBAN from "../../../lib/domain/Models/Equations/KANBAN";
import LatexComponent from "../../../components/LatexComponent/LatexComponent";
export const Kanban = () => {
  const [VALUES, setValues] = useState({
    C: 3,
  });
  const [nextForm, setForm] = useState(false);
  const onChange = (e) => {
    setValues({ ...VALUES, [e.target.name]: e.target.value });
    setForm(false);
  };
  const [Kanbans, setKanbans] = useState<KANBAN[] | null>(null);
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
      <h3>KANBAN</h3>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          setForm(true);
        }}
      >
        <div style={{ display: "flex", gap: "15px", alignItems: "end" }}>
          <TextField
            autoFocus={true}
            title={"Costo de ordenar (S)"}
            onChangeInputValue={onChange}
            id={"C"}
            isRequired={true}
            type={"number"}
            value={VALUES.C.toString()}
            readOnly={false}
          />
          <button
            style={{ outline: "none", background: "none", border: "none" }}
          >
            <GrLinkNext
              size={"25px"}
              color={VALUES.C.toString() === "" ? "grey" : "blue"}
            />
          </button>
        </div>
      </form>
      {nextForm && (
        <form
          style={{ display: "flex", flexDirection: "column", gap: "25px" }}
          onSubmit={(e) => {
            e.preventDefault();
            const formElements = e.currentTarget
              .elements as typeof e.currentTarget.elements & {
              [key: string]: HTMLInputElement;
            };

            const kanbanData: KANBAN[] = Array.from(
              { length: VALUES.C },
              (_, i) => {
                const nombre = `Componente ${i + 1}`;
                const demanda = formElements[`Demanda: ${i}`].value;
                const tiempoEntrega = formElements[`TiempoEntrega: ${i}`].value;
                const almacenajePorcentual =
                  formElements[`Almacenaje: ${i}`].value;
                const StockSeguridad =
                  formElements[`StockSeguridad: ${i}`].value;
                return new KANBAN(
                  nombre,
                  parseFloat(demanda),
                  parseFloat(tiempoEntrega),
                  parseFloat(StockSeguridad),
                  parseFloat(almacenajePorcentual)
                );
              }
            );

            setKanbans(kanbanData);
          }}
        >
          <div style={{ overflowX: "auto" }}>
            <table className={LUCTLCSTYLE.table}>
              <thead>
                <tr
                  style={{
                    textAlign: "start",
                    fontWeight: "bold",
                    fontSize: "11px",
                  }}
                >
                  <th>Componentes</th>
                  <th>Demanda</th>
                  <th>Tiempo de entrega</th>
                  <th>Stock de seguridad</th>
                  <th>Almacenaje (porcentual)</th>
                </tr>
              </thead>
              <tbody>
                {Array.from({ length: VALUES.C }, (_, i) => (
                  <tr key={i} style={{ fontSize: "11px" }}>
                    <td>{"Componente " + (i + 1)}</td>
                    <td>
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
                        style={{
                          border: "none",
                          outline: "none",
                          fontSize: "11px",
                        }}
                        type="number"
                        name={`Demanda: ${i}`}
                        placeholder="Digite número"
                        required
                        onInput={(e) => {
                          const event = e.target as HTMLInputElement;
                          event.setCustomValidity("");
                        }}
                        autoFocus={i === 0 && true}
                      />
                    </td>
                    <td>
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
                        name={`TiempoEntrega: ${i}`}
                        placeholder="Digite número"
                        required
                        onInput={(e) => {
                          const event = e.target as HTMLInputElement;
                          event.setCustomValidity("");
                        }}
                      />
                    </td>
                    <td>
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
                        style={{
                          border: "none",
                          outline: "none",
                          fontSize: "11px",
                        }}
                        type="number"
                        name={`StockSeguridad: ${i}`}
                        placeholder="Digite número"
                        required
                        onInput={(e) => {
                          const event = e.target as HTMLInputElement;
                          event.setCustomValidity("");
                        }}
                      />
                    </td>
                    <td>
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
                        style={{
                          border: "none",
                          outline: "none",
                          fontSize: "11px",
                        }}
                        type="number"
                        name={`Almacenaje: ${i}`}
                        placeholder="Digite número"
                        required
                        onInput={(e) => {
                          const event = e.target as HTMLInputElement;
                          event.setCustomValidity("");
                        }}
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <button className={LUCTLCSTYLE.info} type="submit">
            Calcular
          </button>
        </form>
      )}
      {Kanbans != null && (
        <div>
          <div>
            <table className={LUCTLCSTYLE.table}>
              <thead>
                <tr style={{ fontSize: "11px" }}>
                  <th>Componente</th>
                  <th>Unidades</th>
                  <th>Kanbanes</th>
                </tr>
              </thead>
              <tbody>
                {Kanbans.map((e) => (
                  <tr style={{ fontSize: "11px" }}>
                    <td>{e.Nombre}</td>
                    <td>{e.AlmacenajeUnidad}</td>
                    <td>{e.UnidadKanban}</td>
                  </tr>
                ))}
                <tr style={{fontSize: "11px"}}>
                  <td>Suma totales: </td>
                  <td></td>
                  <td>
                    {Kanbans.reduce((total: number, objeto: KANBAN) => {
                      return total + objeto.UnidadKanban;
                    }, 0)} kanbanes
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
