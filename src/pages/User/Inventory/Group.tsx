import React, { useContext, useEffect, useState } from "react";
import { InventoryContext } from "../../../providers/InventoryContext";
import ContentPageCSS from "../ContentPage.module.css";
import InventaryStyle from "./Inventary.module.css";
import { CgTapDouble } from "react-icons/cg";
import Collection from "../../../lib/domain/Models/Inventary/Collection";
import { toast } from "sonner";
import { IoAdd, IoCloseSharp } from "react-icons/io5";
import TextField from "../../../components/Textfield/TextField";
import Button from "../../../components/Button/Button";

const GroupPage = () => {
  const InventoryContextAll = useContext(InventoryContext);
  const [showModal, useModal] = useState(false);

  const [CreatedCollection, createCollection] = useState<Collection>(
    new Collection("cero", "")
  );
  const onChange = (e: React.FormEvent<HTMLInputElement>) => {
    createCollection({
      ...CreatedCollection,
      CollectionName: e.currentTarget.value,
    });
  };

  const { Collections, productServices, useCollection } = InventoryContextAll!;
  useEffect(() => {
    if (Collections == null) {
      productServices.ReadCollection().then((resp: Collection[]) => {
        useCollection(resp);
      });
    }
  }, []);
  const OnSubmit = async (e: any) => {
    e.preventDefault();
  

    try {
      const id = await productServices.CreateCollection(CreatedCollection);
      CreatedCollection.CollectionId = id;
      useCollection([...Collections!, CreatedCollection]);
      useModal(false);
      return toast.success("Grupo creado exitosamente");
    } catch (e) {
      return toast.error("Error, intente más tarde");
    }
  };
  return (
    <>
      <main
        className={`${ContentPageCSS.main} ${InventaryStyle.InventaryMain}`}
        style={{ overflow: "hidden" }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <h2 className={ContentPageCSS.titlePage}>Categoría</h2>
          <div style={{ display: "flex", alignItems: "center" }}>
            <h5 style={{ color: "grey" }}>Toca cualquier Categoría</h5>
            <CgTapDouble size={20} />
          </div>
        </div>
        <section style={{ overflowX: "auto", width: "100%", display: "block" }}>
          <div>
            <table className={InventaryStyle.table}>
              <thead>
                <tr>
                  <th>#</th>
                  <th>Nombre</th>
                </tr>
              </thead>
              <tbody>
                {Collections!.map((Collection) => (
                  <tr
                    style={{
                      backgroundColor: Collection.Select
                        ? "rgba(82, 92, 235,0.2)"
                        : "",

                      color: Collection.Select ? "white" : "",
                      fontWeight: Collection.Select ? "bold" : "",
                    }}
                  >
                    <td>
                      <input
                        onChange={(e) => {
                          if (e.target.checked) {
                          }

                          const newCollection: Collection[] | null =
                            Collections!.map((Collection) => {
                              if (
                                Collection.CollectionId !==
                                Collection.CollectionId
                              )
                                return Collection;

                              return {
                                ...Collection,
                                Select: e.target.checked,
                              };
                            });
                          useCollection(newCollection);
                        }}
                        checked={Collection.Select}
                        type="checkbox"
                        name={Collection.CollectionName}
                        id={Collection.CollectionId + 1}
                        aria-label="Mostrar detalles"
                      />
                    </td>
                    <td>{Collection.CollectionName}</td>
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
          key={"buttonCollection"}
          name="CollectionButton"
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
          style={{height: "250px"}}
          onClick={(event) => {

            event.stopPropagation();
          }}
        >
          <form className={InventaryStyle.Form} onSubmit={OnSubmit}>
            <button
              onClick={(e) => {
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
              <IoCloseSharp color="white" />
            </button>
            <h2 className={InventaryStyle.Title}>Crear Categoría</h2>
            <TextField
              autoFocus={true}
              isRequired={true}
              id="CollectionName"
              readOnly={false}
              title="Nombre de la categoría"
              type="text"
              value={CreatedCollection.CollectionName}
              onChangeInputValue={onChange}
            />
              <div className={InventaryStyle.ButtonContainer}>
                    <Button title="Crear Categoría" onSubmit={() => {}} />
                  </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default GroupPage;
