import React, { MouseEventHandler, useContext, useEffect, useState } from "react";
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

import Group from "../../../lib/domain/Models/Inventary/Group";


interface Props{
  onSubmit: undefined;
}
const GroupPage = ( {onSubmit}:Props) => {
  const InventoryContextAll = useContext(InventoryContext);
  const [showModal, useModal] = useState(false);
  const [updateGroup, UpdateGroup] = useState<Group | null>(
    null
  );
  const [CreatedGroup, createGroup] = useState<Group>(
    new Group("cero", "")
  );
  const onChange = (e: React.FormEvent<HTMLInputElement>) => {
    if (updateGroup !== null) {
      UpdateGroup({
        ...updateGroup,
        GroupName: e.currentTarget.value,
      });
    } else {
      createGroup({
        ...CreatedGroup,
        GroupName: e.currentTarget.value,
      });
    }
  };

  const { Groups, productServices, useGroup } = InventoryContextAll!;
  useEffect(() => {
    if (Groups == null) {
      productServices.ReadGroups().then((resp: Group[]) => {
        useGroup(resp);
      });
    }
  }, []);
  const OnSubmit = async (e: any) => {
    e.preventDefault();
    if (updateGroup === null) {
      try {
        const id = await productServices.CreateGroup(CreatedGroup);
        CreatedGroup.GroupId = id;
        useGroup([...Groups!, CreatedGroup]);
        useModal(false);
        createGroup({
          ...CreatedGroup,
          GroupName: "",
        });
        return toast.success("Grupo creado exitosamente");
      } catch (e) {
        return toast.error("Error, intente más tarde");
      }
    } else {
 
        const updated: boolean = await productServices.UpdateGroup(
          updateGroup
        );
        if (updated) {
          const newGroups: Group[] | null = Groups!.map(
            (Group) => {
              if (Group.GroupId !== updateGroup!.GroupId) return Group;
             
             
              return { ...updateGroup };
            }
          );
          useGroup(newGroups);
          useModal(false);
          UpdateGroup(null);
          return toast.success("Grupo actualizado");
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
          <h2 className={ContentPageCSS.titlePage}>Grupo</h2>
          <div style={{ display: "flex", alignItems: "center" }}>
            <h5 style={{ color: "grey" }}>Toca cualquier Grupo</h5>
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
                {Groups!.map((Group) => (
                  <tr
                    onClick={(e) => {
                      if (e.target.tagName !== "INPUT") {
                        UpdateGroup(Group);
                        useModal(true);
                      }
                    }}
                    key={Group.GroupId}
                    style={{
                      backgroundColor: Group.Select
                        ? "rgba(82, 92, 235,0.2)"
                        : "",

                      color: Group.Select ? "white" : "",
                      fontWeight: Group.Select ? "bold" : "",
                    }}
                  >
                    <td>
                      <input
                        onChange={(e) => {
                          if (e.target.checked) {
                          }

                          const newGroup: Group[] | null =
                            Groups!.map((GroupChange) => {
                              if (
                                Group.GroupId !==
                                GroupChange.GroupId
                              )
                                return GroupChange;

                              return {
                                ...Group,
                                Select: e.target.checked,
                              };
                            });
                          useGroup(newGroup);
                        }}
                        checked={Group.Select}
                        type="checkbox"
                        name={Group.GroupName}
                        id={Group.GroupId + 1}
                        aria-label="Mostrar detalles de grupo"
                      />
                    </td>
                    <td>{Group.GroupName}</td>
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
          key={"buttonGroup"}
          name="GroupButton"
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
          style={{ height: "250px" }}
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
                if(updateGroup!==null){
                  UpdateGroup(null)
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
              <IoCloseSharp color="white" />
            </button>
            <h2 className={InventaryStyle.Title}>Crear Grupo</h2>
            <TextField
              autoFocus={true}
              isRequired={true}
              id="GroupName"
              readOnly={false}
              title="Nombre del grupo"
              type="text"
              value={
                updateGroup !== null
                  ? updateGroup.GroupName
                  : CreatedGroup.GroupName
              }
              onChangeInputValue={onChange}
            />

            <Button title={ updateGroup!==null ? "Actualizar" : "Crear"  + ` Grupo`} onSubmit={() => {}} />
          </form>
        </div>
      </div>
    </>
  );
};

export default GroupPage;
