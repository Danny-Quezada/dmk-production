import React, { MouseEventHandler, useContext, useEffect, useRef, useState } from "react";
import { InventoryContext } from "../../../providers/InventoryContext";
import ContentPageCSS from "../ContentPage.module.css";
import InventaryStyle from "./Inventary.module.css";
import { CgMathMinus, CgTapDouble } from "react-icons/cg";
import Collection from "../../../lib/domain/Models/Inventary/Collection";
import { toast } from "sonner";
import { IoAdd, IoCloseSharp } from "react-icons/io5";
import TextField from "../../../components/Textfield/TextField";
import Button from "../../../components/Button/Button";
import { collection } from "firebase/firestore";
import { updateCurrentUser } from "firebase/auth";
import { FaArrowLeft, FaLiraSign } from "react-icons/fa";
import TreeComponentPage from './TreeComponent'


import { Component } from "../../../lib/domain/Models/Inventary/Component";
import { TreeComponent } from "../../../lib/domain/Models/Inventary/TreeComponent";
import { TreeComponentDetail } from "../../../lib/domain/Models/Inventary/TreeComponentDetail";
import { MdCheckBox, MdDelete, MdOutlineCheckBoxOutlineBlank } from "react-icons/md";
import TreeComponentServices from "../../../lib/AppCore/Services/TreeComponentServices";

interface Props{
  onSubmit: undefined;
}
const TreesComponentPage = ( {onSubmit}:Props) => {
  const isMounted = useRef(false);
  const InventoryContextAll = useContext(InventoryContext);
  const [showModal, useModal] = useState(false);
  const [updateComponent, UpdateComponent] = useState<TreeComponent | null>(
    null
  );

  const [CreatedComponent, createComponent] = useState<TreeComponent>(
    new TreeComponent("", "", 0)
  );

  const [SelectComponents, useSelectedComponents] = useState<Component[]>([]);


  
  const [TreeComps, useTreeComps] = useState<TreeComponent[] | null>(null);
  const [TreeCompsDetail, useTreeCompsDetail] = useState<TreeComponentDetail[] | null>(null);
  const [SelectedComponentToDelete, useSelectedComponentToDelete] = useState<string>('');
  const [NameComponent, useNameComponent] = useState<String>('');
  const [flag, useFlag] = useState<Boolean>(true);

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

  const onSelectChange = (e) => {
    const { value } = e.currentTarget;
    const selectedComponent = Components?.find((comp) => comp.Name === value);
    useNameComponent(value);

    if (selectedComponent) {
      const { IdComponent, Name } = selectedComponent;
      if (updateComponent !== null) {
        UpdateComponent((prevComponent) => prevComponent ? ({
          ...prevComponent,
          IdParent: IdComponent,
        }) : prevComponent);
      } else {
        createComponent((prevComponent) => ({
          ...prevComponent,
          IdParent: IdComponent,
          IdTreeComponent: prevComponent.IdTreeComponent,
          Quantity: prevComponent.Quantity,
        }));
      }
    }
  };



  const {
    productServices,
    TreesComponent,
    treeComponentServices,
    componentServices,
    Components,
    useComponent,
    useTreesComponent: useComponentDetail,
    TreesComponentDetail,
    useTreesComponentDetail,
    treeComponentDetailServices,
  } = InventoryContextAll!;
  let IdComponentsDetails: string[] = [];
  
  useEffect(() => {
    isMounted.current = true;

    const fetchComponents = Components===null
      ? componentServices.Read()
      : Promise.resolve(null);
    const fetchTreeComponents = TreesComponent===null
      ? treeComponentServices.Read()
      : Promise.resolve(null);
    const fetchTreeComponentsDetail = TreesComponentDetail===null
      ? treeComponentDetailServices.Read()
      : Promise.resolve(null);

    Promise.all([fetchTreeComponents, fetchTreeComponentsDetail, fetchComponents]).then(  
      ([treeComps, treeCompsDetail, components]) => {
        if (isMounted.current) {
          if(treeComps){
            useTreeComps(treeComps);
            useTreeCompsDetail(treeCompsDetail);
          }
          if (components) {
            useComponent(components);
          }
        }
      }
    );
  }, []);


  const OnSubmit = async (e: any) => {
    e.preventDefault();
    if (flag){
      if (updateComponent === null) {
        try {
          const idTree = await treeComponentServices.Create(CreatedComponent);
          CreatedComponent.IdTreeComponent = idTree;
          useTreeComps(prevTree => [...prevTree!, CreatedComponent]);
          SelectComponents?.map( async (comp) => {
            const newTreeDetail = new TreeComponentDetail("", comp.IdComponent, idTree, comp.Quantity);
            const idTreeDetail = await treeComponentDetailServices.Create(newTreeDetail);
            newTreeDetail.IdTreeComponentDetail = idTreeDetail;
            useTreeCompsDetail(prevTreeDetail => [...prevTreeDetail!, newTreeDetail]);
          })
          useModal(false);
          createComponent({
            ...CreatedComponent,
            IdParent: "",
            Quantity: 1
          });
          useSelectedComponents([]);
          useNameComponent("");
          return toast.success("Componente creado exitosamente");
        } catch (e) {
          return toast.error("Error, intente más tarde");
        }
      } else {
        const updatedTree: boolean = await treeComponentServices.Update(
          updateComponent
        );

        if(updatedTree){
          

          const treeDetailsDelete = TreeCompsDetail?.filter(x => updateComponent.IdTreeComponent === x.IdTreeComponent)
          treeDetailsDelete?.map( comp => {
            useTreeComps(prevComp => {
              if (prevComp?.some(select => select.IdTreeComponent === comp.IdTreeComponent)){
                return prevComp.filter(x => x.IdTreeComponent !== comp.IdTreeComponent);
              } else {
                return prevComp;
              }
            })
            treeComponentDetailServices.Delete(comp);
          });

          SelectComponents?.map(async comp => {
            const newTreeDetail = new TreeComponentDetail("", comp.IdComponent, updateComponent.IdTreeComponent, comp.Quantity)
            const idTreeDetail = await treeComponentDetailServices.Create(newTreeDetail);
          })
          const treeComponents = await treeComponentServices.Read();
          const treeComponentDetails = await treeComponentDetailServices.Read();
          useTreeComps(treeComponents);
          useTreeCompsDetail(treeComponentDetails);
          
          useSelectedComponents([]);
          useNameComponent("");
          useModal(false);
          UpdateComponent(null);
        }
        return toast.success("Componente actualizado");
      }
    }
  };


  const handleSelectedComponent = (comp) => {
    const newComponent = new Component(comp.IdComponent, comp.Name, 1);
    useSelectedComponents(prevComp => {
      if (prevComp.some(selectComp => selectComp.Name === comp.Name)){
        return prevComp.filter(compFilter => compFilter.Name !== comp.Name)
      } else {
        return [...prevComp, newComponent];
      }
    });
  }

  const isComponentSelected = (comp) => {
    return SelectComponents.some(selectedComp => selectedComp.Name === comp.Name);
  };

  const updateQuantityByName  = (name, value) => {
    useSelectedComponents(prevComps => 
      prevComps.map(comp => 
        comp.Name === name ? { ...comp, Quantity: value} : comp
      )
    );
  };

  const handleDeleteComponents = () => {
    useTreeComps(currentItems => {
      if (currentItems == null) {
        return currentItems;
      }
      return currentItems.filter(x => x.IdTreeComponent !== SelectedComponentToDelete);
    });
    const treeDelete = TreeComps?.find(x => x.IdTreeComponent === SelectedComponentToDelete);
    treeComponentServices.Delete(treeDelete!);
    const treeDetailsDelete = TreeCompsDetail?.filter(x => x.IdTreeComponent === SelectedComponentToDelete);
    treeDetailsDelete?.map(comp => treeComponentDetailServices.Delete(comp));
    useSelectedComponentToDelete("");
  };

  const handleQuantityChange = (event, comp) => {
    const { value } = event.target;
    updateQuantityByName(comp.Name, Number(value));
  }

  const handleSelectedComponentToDelete = (componentId) => {
    useSelectedComponentToDelete(prevId => prevId === componentId ? "" : componentId);
  };

  const updateMethod = (comp) => {
    UpdateComponent(comp);
    const treesDetail = TreeCompsDetail?.filter(x => x.IdTreeComponent === comp.IdTreeComponent);
    if(treesDetail){
      treesDetail?.map(compDetail => {
        const components = Components?.filter(x => x.IdComponent === compDetail.IdComponent);

        components?.map(comp => useSelectedComponents(prevComp => {
          comp.Quantity = compDetail.Quantity;
          return [...prevComp, comp]; 
        }));
      });
    }
    const componentName = Components?.find(x => x.IdComponent === comp.IdParent);
    useNameComponent(componentName!.Name);    
  }
  
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
          <h2 className={ContentPageCSS.titlePage}>Árbol de componente</h2>
          <div style={{ display: "flex", alignItems: "center" }}>
            <h5 style={{ color: "grey" }}>Toca cualquier Árbol de componente</h5>
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
                  <th>Cantidad a utilizar</th>
                </tr>
              </thead>
              <tbody>
              {
                  TreeComps?.map(comp => {
                    const componentName = Components?.find(x => x.IdComponent === comp.IdParent);
                    const componentChildren = TreeCompsDetail?.filter(x => x.IdTreeComponent === comp.IdTreeComponent) ?? [];
                    const value = componentChildren?.length > 0 ? false : true;
                    return (
                      <>
                        <tr key={comp.IdTreeComponent} style={value ? {borderBottom: '3px solid black'} : {}}> 
                        <td onClick={() => handleSelectedComponentToDelete(comp.IdTreeComponent)}>
                        {SelectedComponentToDelete.includes(comp.IdTreeComponent) ? <MdCheckBox/> : <MdOutlineCheckBoxOutlineBlank/>}
                        </td>
                        <td  onClick={(e) => {
                            if(e.target.tagName !== "INPUT"){
                              updateMethod(comp);
                              useModal(true);
                            }
                          }}>{componentName?.Name}</td>
                        <td  onClick={(e) => {
                            if(e.target.tagName !== "INPUT"){
                              updateMethod(comp);
                              useModal(true);
                            }
                          }} style={{paddingLeft:'60px'}}>{comp?.Quantity}</td>
                        <td> 
                        {SelectedComponentToDelete.includes(comp.IdTreeComponent) ? <MdDelete onClick={() => handleDeleteComponents()}/> : <div></div>}
                        </td>
                        </tr>
                        {
                          componentChildren?.map((compDetail, childIndex) => {
                            const childrenData = Components?.find(cd => cd.IdComponent === compDetail.IdComponent);
                            const isLastChild = childIndex === componentChildren.length - 1 ? true : false;
                            console.log(isLastChild);
                            return(
                              <tr key={`${comp.IdTreeComponent}-${compDetail.IdTreeComponentDetail}`} style={isLastChild ? {borderBottom: '3px solid black'} : {}}>
                                <td style={{paddingLeft: '30px'}}><CgMathMinus /></td>
                                <td style={{paddingLeft: '30px'}}>{childrenData?.Name}</td> 
                                <td style={{paddingLeft: '60px'}}>{compDetail.Quantity}</td> 
                              </tr>
                            );
                          })
                        }
                      </>
                    );
                  })
                }
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
          style={{ height: "650px" }}
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
                useSelectedComponents([]);
                useNameComponent("");
                useFlag(false);
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
            <label htmlFor="parent" 
            style={{ 
              fontFamily: 'Arial, sans-serif', 
              fontSize: '18px', 
              color: '#a8a8a8', 
              fontWeight: 'normal' 
            }}>Componente padre</label>
            <select name="parent" id="parent" defaultValue="" value={ String(NameComponent) } onChange={onSelectChange}>
            <option value="" disabled>Seleccione el componente</option>
            {/* <option key={"default"} value="" selected>Seleccione el componente</option> */}
            {
              Components?.map(comp => {
                return <option key={comp.IdComponent} value={comp.Name}>{comp.Name}</option>
              })
            }
            </select>
            <TextField
              autoFocus={false}
              isRequired={true}
              id="Quantity"
              readOnly={false}
              title="Cantidad del componente padre"
              type="number"
              value={
                updateComponent
                  ? updateComponent.Quantity
                  : CreatedComponent.Quantity
              }
              onChangeInputValue={onChange}
            />

<div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '20px' }}>
      <div style={{ height: "300px", overflowY: "auto", marginRight: "10px" }}>
        <div>
        <h4 style={{ color: "#B4B4B4" }}>Componentes individuales</h4>
          <table className="table">
            <thead>
              <tr>
                <th>#</th>
                <th>Componente</th>
              </tr>
            </thead>
            <tbody>
              {Components?.map(comp => (
                <tr key={comp.IdComponent}>
                  <td onClick={() => handleSelectedComponent(comp)}>
                    {isComponentSelected(comp) ? <MdCheckBox/> : <MdOutlineCheckBoxOutlineBlank/>}
                    </td>
                  <td>{comp.Name}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div style={{ height: "300px", overflowY: "auto", marginLeft: "80px" }}>
        <div>
        <h4 style={{ color: "#B4B4B4" }}>Componentes agregados</h4>
          <table className="table">
            <thead>
              <tr>
                <th>Componentes</th>
                <th>Cantidad</th>
              </tr>
            </thead>
            <tbody>
              {
              SelectComponents?.map(comp => (
                <tr key={comp.IdComponent}>
                  <td style={{ paddingRight: '20px' }}>{comp.Name}</td>
                  <td><input type="number" value={comp.Quantity} min="1"  style={{ width: '50px' }} onChange={(e) => handleQuantityChange(e, comp)}/></td>
                  <td><MdDelete style={{ color: 'red' }} onClick={() => handleSelectedComponent(comp)}/></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
              <div onClick={() => useFlag(true)}>
                <Button title={ updateComponent!==null ? "Actualizar" : "Crear"  + ` Árbol de componente`} onSubmit={() => {}} />
              </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default TreesComponentPage;
