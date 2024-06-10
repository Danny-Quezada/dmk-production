import React, { useState } from "react";
import ContentPageCSS from "../ContentPage.module.css";
import { CalculatorCard } from "../../../components/CalculatorCard/CalculatorCard";
import CMC from "./CMC";
import EOQ from "./EOQ";
import LUCLTC from "./LUCLTC/LUCLTC";
import CS from "./CS/CS";
import { IoCloseSharp } from "react-icons/io5";
import CR from "./CR/CR";
import { Kanban } from "./Kanban";
import ZeroInventory from "./ZeroInventory";

const CalculatorPage = () => {
  const [menu, changeMenu] = useState("/");
  return (
    <>
      <main className={ContentPageCSS.main}>
        <h2 className={ContentPageCSS.titlePage}>Ecuaciones</h2>

        <section
          style={{ gap: "25px", display: "flex", flexDirection: "column" }}
        >
          <CalculatorCard
            click={() => changeMenu("CMC")}
            link={"Mantenimiento correctivo"}
            description={
              "conjunto de tareas técnicas, destinadas a corregir las fallas del equipo que demuestren la necesidad de reparación o reemplazo."
            }
            equation={"\\text{CMC = NF} \\cdot \\{CTM + CF\\} "}
          />
          <CalculatorCard
            click={() => changeMenu("EOQ")}
            description={
              "El cálculo del EOQ ayuda a las empresas a equilibrar estos tres costes y a eliminar cualquier gasto innecesario importante."
            }
            link={"EOQ"}
            equation={'\\sqrt{\\frac{2 \\cdot D \\cdot S}{H}}'}
          />
          <CalculatorCard
            click={() => changeMenu("CS")}
            description={
              "El control de inventario y la cadena de suministro son componentes esenciales para garantizar una operacin eficiente y efectiva en las empresas. "
            }
            link={"Control de inventario y cadena de suministros"}
            equation={'\\text{RI = } \\frac{\\text{Costo de los bienes vendidos}}{\\text{Valor promedio del inventario}}'}
          />
          <CalculatorCard
            click={() => changeMenu("LUCLTC")}
            link={
              "LUC Y LTC"
            }
            description={"Métodos para encontrar la cantidad óptima de pedidos."}
            equation={`\\text{Primera iteracion = S+K} `}
          />
           <CalculatorCard
            click={() => changeMenu("CR")}
            link={
              "Cantidad de recipientes y inventario acumulado"
            }
            description={"Cálculos para determinar recipientes y inventario acumulado que necesita una empresa."}
            equation={`\\text{N = } \\frac{D \\cdot T}{60 \\cdot C} \\text{ Y } \\text{IM = } N \\cdot C`}
          />
             <CalculatorCard
            click={() => changeMenu("KANBAN")}
            link={
              "Administración de inventario KANBAN"
            }
            description={"Método para determinar la cantidadd de kanbanes a utilizar dentro de una empresa."}
            equation={`\\text{K = } \\frac{D \\cdot T \\cdot (1+\\infty) }{C}`}
          />
           <CalculatorCard
            click={() => changeMenu("ZI")}
            link={
              "Inventario cero"
            }
            description={"Estrategia de planificación logística cuyo objetivo es limitar al máximo el número de existencias alojadas en el almacén para ahorrar espacio y evitar incurrir en costos no productivos."}
            equation={`\\text{Trabajadores requeridos = } \\frac{Demanda}{ \\text{Unidades por trabajador}}`}
          />
        </section>
      </main>
      <div
        onClick={() => changeMenu("/")}
        style={{
          width: "100vw",
          height: "100vh",
          background: "rgb(0,0,0,0.5)",
          zIndex: "6666",
          display: menu == "/" ? "none" : "flex",
          position: "fixed",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <div
          className={ContentPageCSS.contentForm}
          style={{
            width: (menu==="LUCLTC" || menu === "KANBAN") ? "94vw" : "400px"
          }}
          onClick={(event) => {
            event.stopPropagation();
          }}
        >
          <button
          
            onClick={() => changeMenu("/")}
            style={{
              cursor: "pointer",
              borderRadius: "50%",
              width: "30px",
              height: "30px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              backgroundColor: "red",
              borderColor: "red",
              borderStyle: "solid",
              position: "absolute",
              right: menu==="CMC" ? "20px" : "10px",
              top: "10px",
              zIndex: "300"
            }}
          >
            <IoCloseSharp color="white"  />
          </button>
          {Menu(menu)}
        </div>
      </div>
    </>
  );
};

function Menu(menu) {
  if (menu === "/") {
    return <div></div>;
  }
  if (menu === "EOQ") {
    return <EOQ />;
  } else if (menu === "CMC") {
    return <CMC />;
  } else if (menu === "CS") {
    return <CS />;
  }
  else if(menu==="LUCLTC"){
    return <LUCLTC/>
  }
  else if(menu==="CR"){
    return <CR/>
  }
  else if(menu==="KANBAN"){
    return <Kanban/>
  }
  else if(menu==="ZI"){
    return <ZeroInventory/>
  }
}
export default CalculatorPage;
