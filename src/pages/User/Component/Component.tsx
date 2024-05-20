import React, { useContext, useState, useEffect, useRef } from "react";
import { useAsyncError, useParams } from "react-router";
import componentStyles from "./Component.module.css";
import { Product } from "../../../lib/domain/Models/Inventary/Product";
import { ProductComponents } from "../../../lib/domain/Models/Inventary/ProductComponents";
import { InventoryContext } from "../../../providers/InventoryContext";
import ComponentStyle from "./Component.module.css";
import { TreeComponent } from "../../../lib/domain/Models/Inventary/TreeComponent";
import ReactLoading from "react-loading";
import { MdOutlineCheckBoxOutlineBlank } from "react-icons/md";
import { MdCheckBox } from "react-icons/md";
import { MdDelete } from "react-icons/md";
import RowComponent from '../../../components/RowComponent'
import { IoCloseSharp } from "react-icons/io5";
import { TreeComponentDetail } from "../../../lib/domain/Models/Inventary/TreeComponentDetail";
import mermaid from 'mermaid';



const Component = () => {
  const isMounted = useRef(false);
  const { productId } = useParams();
  const [product, useProduct] = useState<Product | null>(null);
  const [Tree, setTree] = useState(true);
  const [ComponentsProduct, useComponentsProduct] = useState<ProductComponents | null
  >(null);
  const [TreeComps, useTreeComps] = useState<TreeComponent[] | null>(null);
  const [TreeCompsDetail, useTreeCompsDetail] = useState<TreeComponentDetail[] | null>(null);
  const [TreeProductComps, useTreeProductComps] = useState<TreeComponent[] | null>(null);
  const [selectedComponent, useSelectedComponent] = useState<string[]>([]);
  const [SelectedComponentToDelete, useSelectedComponentToDelete] = useState<string>('');
  const InventoryContextAll = useContext(InventoryContext);
  const {
    productServices,
    TreesComponent,
    treeComponentServices,
    componentServices,
    Components,
    useComponent,
    useTreesComponent: useComponentDetail,
    ProductComponents,
    useProductComponents,
    productComponentsServices,
    TreesComponentDetail,
    useTreesComponentDetail,
    treeComponentDetailServices,
  } = InventoryContextAll!;
  let IdComponentsDetails: string[] = [];

  useEffect(() => {
    isMounted.current = true;
  
    const fetchProduct = productId
      ? productServices.ProductById(productId)
      : Promise.resolve(null);
    const fetchComponents = Components===null
      ? componentServices.Read()
      : Promise.resolve(null);
    const fetchProductComponents = ProductComponents===null 
      ? productComponentsServices.Read()
      : Promise.resolve(null);
    const fetchTreeComponents = TreesComponent===null
      ? treeComponentServices.Read()
      : Promise.resolve(null);
    const fetchTreeComponentsDetail = TreesComponentDetail===null
      ? treeComponentDetailServices.Read()
      : Promise.resolve(null);

    Promise.all([fetchProduct, fetchProductComponents, fetchComponents, fetchTreeComponents, fetchTreeComponentsDetail]).then(
      ([product, productComponents, components, treeComps, treeCompsDetail]) => {
        if (isMounted.current) {
          if (product) {
            useProduct(product);
          }
          if(treeComps){
            useTreeComps(treeComps);
            useTreeCompsDetail(treeCompsDetail);
          }
          if (productComponents) {
            const resultProduct = productComponents.find(x => x.IdProduct === productId);
            useComponentsProduct(resultProduct ?? null);
            // if(ComponentsProduct?.IdComponents && ComponentsProduct?.IdComponents.length > 0){
            //   console.log('adentro');
            //   const resultTree = treeComps?.filter(x => ComponentsProduct?.IdComponents.includes(x.IdParent));
            //   useTreeProductComps(resultTree ?? null);
            // }
          }
          if (components) {
            useComponent(components);
          }
        }
      }
    );
    
    mermaid.initialize({ 
      startOnLoad: true,
      fontFamily: 'Arial, sans-serif', 
      fontSize: 14, 
      flowchart: {
        diagramPadding: 8, 
        htmlLabels: false, 
        nodeSpacing: 100,  
        curve: 'linear' 
      }
    });
    
    mermaid.init(undefined, ".mermaid");
  }, []);

  useEffect(() => {
    if (ComponentsProduct && ComponentsProduct?.IdComponents?.length > 0 && TreeComps) {
      const resultTree = TreeComps?.filter(x => ComponentsProduct?.IdComponents.includes(x.IdParent));
      useTreeProductComps(resultTree);
    }
  }, [ComponentsProduct, TreeComps]);

  const generateMermaidGraph = () => {
    
    if(TreeProductComps && TreeProductComps?.length > 0){
      let graph = `graph TD`;
      TreeProductComps!.forEach(element => {
        const componentName = Components?.find(x => x.IdComponent === element.IdParent);
        const componentsChildren = TreeCompsDetail?.filter(x => x.IdTreeComponent === element.IdTreeComponent);
        let nameWithQuantity = componentName?.Name;
        if (element.Quantity > 1) {
          nameWithQuantity += `${element.Quantity}`; 
        }
        graph = graph + `
        ${product?.ProductName} --> ${nameWithQuantity};
        `;
        console.log(graph);
        componentsChildren?.forEach(children => {
          const childrenData = Components?.find(cd => cd.IdComponent === children.IdComponent);
          let nameChildrenWithQuantity = childrenData?.Name;
          if(children.Quantity > 1)
            nameChildrenWithQuantity += ` ${children.Quantity}`;
          graph = graph + `
          ${nameWithQuantity} --> ${childrenData?.Name};
          `;
        })
      });
      
      return graph;
    } else {
      return '';
    }
  }

  const handleComponentSelect = (componentId) => {
    useSelectedComponent(prevIds => {
      if (prevIds.includes(componentId)) {
        return prevIds.filter(id => id !== componentId);
      } else {
        return [...prevIds, componentId];
      }
    });
  };
  
  const handleSelectedComponentToDelete = (componentId) => {
    useSelectedComponentToDelete(prevId => prevId === componentId ? "" : componentId);
  };

  const handleAddComponents = () => {
    const components = TreeComps?.filter(x => selectedComponent.includes(x.IdTreeComponent)) ?? [];
    useTreeProductComps(preArray => [...preArray!, ...components]);
    useSelectedComponent([]);
};

const handleDeleteComponents = () => {
  useTreeProductComps(currentItems => {
    if (currentItems == null) {
      return currentItems;
    }
    return currentItems.filter(x => x.IdTreeComponent !== SelectedComponentToDelete);
  });
  useSelectedComponentToDelete("");
};


    
  return (
    <>
      <main className={componentStyles.main}>
        {product === null ? (
          <ReactLoading type={"spinningBubbles"} color={"blue"} height={'20%'} width={'20%'} />
        ) : (
          <section className={componentStyles.section}>
            <div className={componentStyles.ProductInformation}>
              <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
                <div
                  className={componentStyles.ImageContainer}
                  style={{ backgroundImage: `url(${product.Images[0]})` }}
                ></div>
                <h3>{product.ProductName}</h3>
              </div>
              <div>
                <button
                  onClick={() => setTree(false)}
                  style={{
                    backgroundColor: "transparent",
                    padding: "10px",
                    marginRight: "10px",
                    color: "#B4B4B8",
                    border: "1px solid #B4B4B8",
                    borderRadius: "10px",
                  }}
                >
                  Visualizar arbol
                </button> 
                {selectedComponent.length > 0 && (
                  <button
                  onClick={() => handleAddComponents()}
                    style={{
                      backgroundColor: "transparent",
                      padding: "10px",
                      color: "#B4B4B8",
                      border: "1px solid #B4B4B8",
                      borderRadius: "10px",
                    }}
                  >
                    Agregar componentes
                  </button> 
                )}
              </div>
            </div>
            <div style={{ height: "300px", overflowY: "auto" }}>
              <h3 style={{ color: "#B4B4B4" }}>Componentes</h3>
              <table className={ComponentStyle.table}>
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Nombre</th>
                    <th>Cantidad a utilizar</th>
                  </tr>
                </thead>
                <tbody>
                  {
                    TreeProductComps?.map(component => {
                      const componentName = Components?.find(x => x.IdComponent === component.IdParent);
                      const componentsChildren = TreeCompsDetail?.filter(x => x.IdTreeComponent === component.IdTreeComponent);
                        return(
                          <>
                            <tr key={component.IdTreeComponent}>
                            <td onClick={() => handleSelectedComponentToDelete(component.IdTreeComponent)}>
                             {SelectedComponentToDelete.includes(component.IdTreeComponent) ? <MdCheckBox/> : <MdOutlineCheckBoxOutlineBlank/>}
                            </td>
                            <td>{componentName?.Name}</td>
                            <td style={{paddingLeft:'60px'}}>{component?.Quantity}</td>
                            <td>
                              {SelectedComponentToDelete.includes(component.IdTreeComponent) ? <MdDelete onClick={() => handleDeleteComponents()}/> : <div></div>}
                            </td>
                            </tr>
                            {
                              componentsChildren?.map((compChild, childIndex) => {
                                const childrenData = Components?.find(cd => cd.IdComponent === compChild.IdComponent);
                                const isLastChild = childIndex === componentsChildren.length - 1;
                                return(
                                  <tr key={`${component.IdTreeComponent}-${compChild.IdTreeComponentDetail}`} style={isLastChild ? {borderBottom: '2px solid black'} : {}}>
                                    <td style={{paddingLeft: '30px'}}><MdOutlineCheckBoxOutlineBlank/></td>
                                    <td style={{paddingLeft: '30px'}}>{childrenData?.Name}</td> 
                                    <td style={{paddingLeft: '60px'}}>{compChild.Quantity}</td> 
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
            <div style={{ height: "300px", overflowY: "auto", display: "flex",justifyContent:"space-between"}}>
              <div>
                <h4 style={{ color: "#B4B4B4" }}>Componentes individuales</h4>
                <table className={ComponentStyle.table}>
                  <thead>
                    <tr>
                      <th>#</th>
                      <th>Nombre</th>
                      <th>Cantidad disponible</th>
                    </tr>
                  </thead>
                  <tbody>
                  {
                      // Components?.map(component=>
                      //   <tr key={component.IdComponent}>
                      //     <td><MdOutlineCheckBoxOutlineBlank/></td>
                      //     <td>{component.Name}</td>
                      //     <td>{component.Quantity}</td>
                      //   </tr>
                      // )
                    }
                  </tbody>
                </table>
              </div>
              <div>
                <h4 style={{ color: "#B4B4B4" }}>Arbol de componentes</h4>
                <table className={ComponentStyle.table}>
                  <thead>
                    <tr>
                      <th>#</th>
                      <th>Nombre</th>
                      <th>Cantidad a utilizar</th>
                    </tr>
                  </thead>
                  <tbody>
                    {
                      TreeComps?.map(component => {
                        const componentName = Components?.find(comp => comp.IdComponent === component.IdParent);
                        const componentsChildren = TreeCompsDetail?.filter(x => x.IdTreeComponent === component.IdTreeComponent);
                        return(
                          <>
                            <tr key={component.IdTreeComponent}>
                            <td onClick={() => handleComponentSelect(component.IdTreeComponent)}>
                              {selectedComponent.includes(component.IdTreeComponent) ? <MdCheckBox/> : <MdOutlineCheckBoxOutlineBlank/>}
                            </td>
                            <td>{componentName?.Name}</td>
                            <td style={{textAlign:'center'}}>{component?.Quantity}</td>
                            </tr>
                            {
                              componentsChildren?.map((compChild, childIndex) => {
                                const childrenData = Components?.find(cd => cd.IdComponent === compChild.IdComponent);
                                const isLastChild = childIndex === componentsChildren.length - 1;
                                return(
                                  <tr key={`${component.IdTreeComponent}-${compChild.IdTreeComponentDetail}`} style={isLastChild ? {borderBottom: '2px solid black'} : {}}>
                                    <td style={{paddingLeft: '30px'}}><MdOutlineCheckBoxOutlineBlank/></td>
                                    <td style={{paddingLeft: '30px'}}>{childrenData?.Name}</td> 
                                    <td style={{textAlign: 'center'}}>{compChild.Quantity}</td> 
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
            </div>
          </section>
        )}
      </main>
      <div style={{
         width: "100vw",
         height: "100vh",
         background: "rgb(0,0,0,0.5)",
         zIndex: "6666",
         display: Tree ? "none" : "flex",
         position: "fixed",
         alignItems: "center",
         justifyContent: "center",
      }}>
        
        <div
          className={componentStyles.contentForm}
          onClick={(event) => {
            event.stopPropagation();
          }}
        >
          <button
          
            onClick={() => setTree(true)}
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
              top: "10px",
              zIndex: "300",
              right: "10px"
            }}
          >
            <IoCloseSharp color="white"  />
          </button>
          {
            !Tree && (
              <>
              <div className={componentStyles.containerCenter}>
                <h2 style={{textAlign: 'center'}}>Árbol de componentes</h2>
                <div className="mermaid">
                  {generateMermaidGraph()}
                </div>
              </div>
              </>
             )
          }
        </div>
      </div>
    </>
  );
};

export default Component;
