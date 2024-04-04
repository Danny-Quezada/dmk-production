import React, { useState } from "react";
import ContentPageCSS from "../ContentPage.module.css";
import { CalculatorCard } from "../../../components/CalculatorCard/CalculatorCard";
import CMC from "./CMC";
import EOQ from "./EOQ";
import CS from "./CS/CS";
import { IoCloseSharp } from "react-icons/io5";
const CalculatorPage = () => {
  const [menu, changeMenu] = useState("/");
  return (
    <>
      <main className={ContentPageCSS.main}>
        <h2 className={ContentPageCSS.titlePage}>Ecuaciones</h2>

        <section
          style={{ gap: "20px", display: "flex", flexDirection: "column" }}
        >
          <CalculatorCard
            click={() => changeMenu("CMC")}
            link={"Mantenimiento correctivo"}
            description={
              "conjunto de tareas técnicas, destinadas a corregir las fallas del equipo que demuestren la necesidad de reparación o reemplazo."
            }
            equation={"$\\ CMC =  NF \\cdot \\{{CTM + CF}\\} $"}
          />
          <CalculatorCard
            click={() => changeMenu("EOQ")}
            description={
              "El cálculo del EOQ ayuda a las empresas a equilibrar estos tres costes y a eliminar cualquier gasto innecesario importante."
            }
            link={"EOQ"}
            equation={`$\\sqrt{\\frac{2\\cdot D \\cdot S}{H}} $`}
          />
          <CalculatorCard
            click={() => changeMenu("CS")}
            description={
              "El control de inventario y la cadena de suministro son componentes esenciales para garantizar una operacin eficiente y efectiva en las empresas. "
            }
            link={"Control de inventario y cadena de suministros"}
            equation={`$ RI = \\frac{\\text{costo de los bienes vendidos}}{\\text{valor promedio del inventario}}  $`}
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
}
export default CalculatorPage;
