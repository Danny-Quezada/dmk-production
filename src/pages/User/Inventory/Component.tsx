import React, { MouseEventHandler, useContext, useEffect, useRef, useState } from "react";
import { InventoryContext } from "../../../providers/InventoryContext";
import ContentPageCSS from "../ContentPage.module.css";
import InventaryStyle from "./Inventary.module.css";
import { CgTapDouble } from "react-icons/cg";
import Collection from "../../../lib/domain/Models/Inventary/Collection";
import { toast } from "sonner";
import { IoAdd, IoCloseSharp } from "react-icons/io5";
import TextField from "../../../components/Textfield/TextField";
import Button from "../../../components/Button/Button";
import { collection } from "firebase/firestore";
import { updateCurrentUser } from "firebase/auth";
import { FaArrowLeft } from "react-icons/fa";

import { Component } from "../../../lib/domain/Models/Inventary/Component";


interface Props{
  onSubmit: undefined;
}
const ComponentPage = ( {onSubmit}:Props) => {
  const isMounted = useRef(false);
  const InventoryContextAll = useContext(InventoryContext);
  const [showModal, useModal] = useState(false);
  const [updateComponent, UpdateComponent] = useState<Component | null>(
    null
  );
  const [CreatedComponent, createComponent] = useState<Component>(
    new Component("", "", 0)
  );

  const onChange = (e) => {
    const { name, value } = e.currentTarget;
    if (updateComponent !== null) {
      UpdateComponent({
        ...updateComponent,
        [name]: value
      });
    } else {
      createComponent({
        ...CreatedComponent,
        [name]: value
      });
    }
  };

  const { Components, componentServices, useComponent } = InventoryContextAll!;
  
  useEffect(() => {
    isMounted.current = true;

    const fetchComponents = Components===null
    ? componentServices.Read() 
    : Promise.resolve(null);

    Promise.all([fetchComponents]).then(
      ([components]) => {
        if (isMounted.current) {
          if (components){
            useComponent(components);
          }
        }
      }
    );
  }, []);


  const OnSubmit = async (e: any) => {
    e.preventDefault();
    if (updateComponent === null) {
      try {
        const id = await componentServices.Create(CreatedComponent);
        CreatedComponent.IdComponent = id;
        useComponent([...Components!, CreatedComponent]);
        useModal(false);
        createComponent({
          ...CreatedComponent,
          Name: "",
          Quantity: 0
        });
        return toast.success("Componente creado exitosamente");
      } catch (e) {
        return toast.error("Error, intente más tarde");
      }
    } else {
 
        const updated: boolean = await componentServices.Update(
          updateComponent
        );
        if (updated) {
          const newComponents: Component[] | null = Components!.map(
            (Component) => {
              if (Component.IdComponent !== updateComponent!.IdComponent) return Component;
              return { ...updateComponent };
            }
          );
          useComponent(newComponents);
          useModal(false);
          UpdateComponent(null);
          return toast.success("Componente actualizado");
        } else {
          return toast.error("Hubo un error, intentalo más tarde.");
        
      }
    }
  };
  
  return (
    <>
      <main
        className={`${ContentPageCSS.main} ${InventaryStyle.InventaryMain}`}
        style={{ overflow: "hidden" }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "8px",  }}>
        <FaArrowLeft color="grey" style={{cursor: "pointer"}} onClick={(e)=>{
          onSubmit("")
        }}/>
          <h2 className={ContentPageCSS.titlePage}>Componente</h2>
          <div style={{ display: "flex", alignItems: "center" }}>
            <h5 style={{ color: "grey" }}>Toca cualquier Componente</h5>
            <CgTapDouble size={20} />
          </div>
            {/* <button
                  onClick={() => { <TreeComponentPage onSubmit={onSubmit} />}}
                  style={{
                    backgroundColor: "transparent",
                    padding: "10px",
                    marginRight: "10px",
                    color: "#B4B4B8",
                    border: "1px solid #B4B4B8",
                    borderRadius: "10px",
                    marginLeft: "auto",
                  }}
                >
                  Crear árbol de componente
                </button>  */}
        </div>
        <section style={{ overflowX: "auto", width: "100%", display: "block" }}>
          <div>
            <table className={InventaryStyle.table}>
              <thead>
                <tr>
                  <th>#</th>
                  <th>Nombre</th>
                  <th>Cantidad</th>
                </tr>
              </thead>
              <tbody>
                {Components?.map((Component) => (
                  <tr
                    onClick={(e) => {
                      if (e.target.tagName !== "INPUT") {
                        UpdateComponent(Component);
                        useModal(true);
                      }
                    }}
                    key={Component.IdComponent}
                    style={{
                      backgroundColor: Component.Select
                        ? "rgba(82, 92, 235,0.2)"
                        : "",

                      color: Component.Select ? "white" : "",
                      fontWeight: Component.Select ? "bold" : "",
                    }}
                  >
                    <td>
                      <input
                        onChange={(e) => {
                          if (e.target.checked) {
                          }

                          const newComponent: Component[] | null =
                            Components!.map((ComponentChange) => {
                              if (
                                Component.IdComponent !==
                                ComponentChange.IdComponent
                              )
                                return ComponentChange;

                              return {
                                ...Component,
                                Select: e.target.checked,
                              };
                            });
                          useComponent(newComponent);
                        }}
                        checked={Component.Select}
                        type="checkbox"
                        name={Component.Name}
                        id={Component.IdComponent + 1}
                        aria-label="Mostrar detalles de Componente"
                      />
                    </td>
                    <td>{Component.Name}</td>
                    <td>{Component.Quantity}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
        <button
          onClick={(e) => {
            useModal(true);
          }}
          style={{
            cursor: "pointer",
            position: "fixed",
            right: "20px",
            bottom: "90px",
            width: "50px",
            height: "50px",
            backgroundColor: "transparent",
            borderRadius: "50%",
            borderColor: "green",
          }}
          key={"buttonComponent"}
          name="ComponentButton"
        >
          <IoAdd color="green" size={20} />
        </button>
      </main>
      <div
        onClick={(e) => {
          useModal(false);
        }}
        style={{
          width: "100vw",
          height: "100vh",
          backgroundColor: "rgb(0,0,0, 25%)",

          zIndex: "20",
          display: !showModal ? "none" : "flex",
          position: "fixed",
          alignItems: "center",
          justifyContent: "center",

          top: "0px",
        }}
      >
        <div
          className={InventaryStyle.ContentFormInventary}
          style={{ height: "300px" }}
          onClick={(event) => {
            event.stopPropagation();
          }}
        >
          <form
            style={{
              display: "flex",
              flexDirection: "column",
              margin: "20px",
              gap: "20px",
            }}
            onSubmit={OnSubmit}
          >
            <button
              onClick={(e) => {
                if(updateComponent!==null){
                  UpdateComponent(null)
                }
                useModal(false);
              }}
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
                right: "10px",
                top: "10px",
                zIndex: "300",
              }}
            >
              <IoCloseSharp color="white"/>
            </button>
            <h2 className={InventaryStyle.Title}>Crear Componente</h2>
            <TextField
              autoFocus={true}
              isRequired={true}
              id="Name"
              readOnly={false}
              title="Nombre del componente"
              type="text"
              value={
                updateComponent
                  ? updateComponent.Name
                  : CreatedComponent.Name
              }
              onChangeInputValue={onChange}
            />
            <TextField
              autoFocus={false}
              isRequired={true}
              id="Quantity"
              readOnly={false}
              title="Cantidad del componente"
              type="number"
              value={
                updateComponent
                  ? updateComponent.Quantity
                  : CreatedComponent.Quantity
              }
              onChangeInputValue={onChange}
            />

            <Button title={ updateComponent!==null ? "Actualizar" : "Crear"  + ` Componente`} onSubmit={() => {}} />
          </form>
        </div>
      </div>
    </>
  );
};

export default ComponentPage;
