import React, { useContext, useState, useEffect, useRef } from "react";
import { useParams } from "react-router";
import componentStyles from "./Component.module.css";
import { Product } from "../../../lib/domain/Models/Inventary/Product";
import { ProductComponents } from "../../../lib/domain/Models/Inventary/ProductComponents";
import { InventoryContext } from "../../../providers/InventoryContext";
import ComponentStyle from "./Component.module.css";
import { TreeComponent } from "../../../lib/domain/Models/Inventary/TreeComponent";
import ReactLoading from "react-loading";
import { MdOutlineCheckBoxOutlineBlank, MdCheckBox, MdDelete } from "react-icons/md";
import { CgMathMinus } from "react-icons/cg";
import { IoArrowBack, IoCloseSharp } from "react-icons/io5";
import { TreeComponentDetail } from "../../../lib/domain/Models/Inventary/TreeComponentDetail";
import MermaidGraph from '../../../components/MermaidGraph';
import TextField from "../../../components/Textfield/TextField";
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

const Component = () => {
  const isMounted = useRef(false);
  const { productId } = useParams();
  const [product, useProduct] = useState<Product | null>(null);
  const [Tree, setTree] = useState(true);
  const [ComponentsProduct, useComponentsProduct] = useState<ProductComponents | null>(null);
  const [TreeComps, useTreeComps] = useState<TreeComponent[] | null>(null);
  const [TreeCompsDetail, useTreeCompsDetail] = useState<TreeComponentDetail[] | null>(null);
  const [TreeProductComps, useTreeProductComps] = useState<TreeComponent[] | null>(null);
  const [selectedComponent, useSelectedComponent] = useState<string[]>([]);
  const [SelectedComponentToDelete, useSelectedComponentToDelete] = useState<string>('');
  const [Demanda, useDemanda] = useState<number>(1);
  const InventoryContextAll = useContext(InventoryContext);
  const {
    productServices,
    TreesComponent,
    treeComponentServices,
    componentServices,
    Components,
    useComponent,
    useTreesComponent: useComponentDetail,
    useProductsComponents,
    ProductsComponents,
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
    const fetchComponents = Components === null
      ? componentServices.Read()
      : Promise.resolve(null);
    const fetchProductComponents = ProductsComponents === null
      ? productComponentsServices.Read()
      : Promise.resolve(null);
    const fetchTreeComponents = TreesComponent === null
      ? treeComponentServices.Read()
      : Promise.resolve(null);
    const fetchTreeComponentsDetail = TreesComponentDetail === null
      ? treeComponentDetailServices.Read()
      : Promise.resolve(null);

    Promise.all([fetchProduct, fetchProductComponents, fetchComponents, fetchTreeComponents, fetchTreeComponentsDetail]).then(
      ([product, productComponents, components, treeComps, treeCompsDetail]) => {
        if (isMounted.current) {
          if (product) {
            useProduct(product);
          }
          if (treeComps) {
            useTreeComps(treeComps);
            useTreeCompsDetail(treeCompsDetail);
          }
          if (productComponents) {
            const resultProduct = productComponents.find(x => x.IdProduct === productId);
            useComponentsProduct(resultProduct ?? null);
            if (ComponentsProduct && ComponentsProduct?.IdComponents.length > 0) {
              const resultTree = treeComps?.filter(x => ComponentsProduct?.IdComponents.includes(x.IdParent));
              useTreeProductComps(resultTree ?? null);
            }
          }
          if (components) {
            useComponent(components);
          }
        }
      }
    );

    return () => {
      isMounted.current = false;
    };
  }, [productId, Components, ProductsComponents, TreesComponent, TreesComponentDetail]);

  useEffect(() => {
    if (ComponentsProduct && ComponentsProduct?.IdComponents?.length > 0 && TreeComps) {
      const resultTree = TreeComps?.filter(x => ComponentsProduct?.IdComponents.includes(x.IdParent));
      useTreeProductComps(resultTree);
    }
  }, [ComponentsProduct, TreeComps]);

  const generateMermaidGraph = ({ treeProductComps, components, treeCompsDetail, product }) => {
    let Comps = [];
    let childQuantities = {};

    if (treeProductComps && treeProductComps.length > 0) {
      let graphObj = { graph: `graph TD\n` };

      treeProductComps.forEach(element => {
        const componentName = components?.find(x => x.IdComponent === element.IdParent);
        const componentsChildren = treeCompsDetail?.filter(x => x.IdTreeComponent === element.IdTreeComponent);
        let nameWithQuantity = componentName?.Name;
        if (element.Quantity > 1) {
          nameWithQuantity += `(${element.Quantity})`;
        }
        graphObj.graph += `${product?.ProductName.replace(/\s+/g, '')}[${product?.ProductName}] --> ${componentName?.Name.replace(/\s+/g, '')}["${nameWithQuantity}"]\n`;
        Comps.push(element.IdParent);
        updateChildQuantities(childQuantities, element.IdParent, componentsChildren);
        iterationCompsDetail(graphObj, componentName, componentsChildren, Comps, childQuantities);
      });

      return graphObj.graph;
    } else {
      return '';
    }
  };

  const iterationCompsDetail = (graphObj, componentName, componentsChildren, Comps, childQuantities) => {
    componentsChildren?.forEach(children => {
      const childrenData = Components?.find(cd => cd.IdComponent === children.IdComponent);
      let nameChildrenWithQuantity = getChildNameWithQuantities(childQuantities, childrenData);
      graphObj.graph += `${componentName?.Name.replace(/\s+/g, '')} --> ${childrenData?.Name.replace(/\s+/g, '')}["${nameChildrenWithQuantity}"]\n`;
    });

    componentsChildren?.forEach(children => {
      if (Comps.includes(children.IdComponent)) {
        return;
      }
      Comps.push(children.IdComponent);
      const childrenData = Components?.find(cd => cd.IdComponent === children.IdComponent);
      const childrens = TreeComps?.find(x => x.IdParent === children.IdComponent);
      if (childrens) {
        const compChildren = TreeCompsDetail?.filter(x => x.IdTreeComponent === childrens.IdTreeComponent) ?? [];
        if (compChildren.length > 0) {
          updateChildQuantities(childQuantities, children.IdComponent, compChildren);
          iterationCompsDetail(graphObj, childrenData, compChildren, Comps, childQuantities);
        }
      }
    });
  };

  const updateChildQuantities = (childQuantities, parentId, componentsChildren) => {
    componentsChildren?.forEach(child => {
      if (!childQuantities[child.IdComponent]) {
        childQuantities[child.IdComponent] = {};
      }
      if (!childQuantities[child.IdComponent][parentId]) {
        childQuantities[child.IdComponent][parentId] = 0;
      }
      childQuantities[child.IdComponent][parentId] += child.Quantity;
    });
  };

  const getChildNameWithQuantities = (childQuantities, childData) => {
    if (!childData) return 'undefined'; // Asegúrate de manejar undefined adecuadamente
    let quantities = [];
    for (const parentId in childQuantities[childData.IdComponent]) {
      quantities.push(childQuantities[childData.IdComponent][parentId]);
    }
    return `${childData.Name}(${quantities.join(' + ')})`;
  };

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
    if (TreeProductComps && components.length > 0) {
      const filteredComponents = components.filter(newComp =>
        !TreeProductComps.find(existingComp => existingComp.IdTreeComponent === newComp.IdTreeComponent));

      if (filteredComponents.length > 0) {
        useTreeProductComps(prevArray => [...prevArray!, ...filteredComponents]);
      }
    } else {
      useTreeProductComps(components);
    }
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

  const onSelectChange = (e) => {
    const { value } = e.currentTarget;
    useDemanda(value);
  };

  const iterableCalculateQuantity = (listQuantity, componentsChildren, products, operationExpressions) => {
    return (
      <>
        {
          componentsChildren?.map((compChildren) => {
            let productExpression = '';
            const componentChildren = Components?.find(x => x.IdComponent === compChildren.IdComponent);

            listQuantity.forEach((element, index) => {
              if (index === listQuantity.length - 1) {
                productExpression += `${element} * ${compChildren.Quantity}`;
              } else {
                productExpression += `${element} * `;
              }
            });

            const expressionPattern = /-?\d+(\.\d+)?([+\-*/]-?\d+(\.\d+)?)*\b/g;
            const matches = productExpression.match(expressionPattern);
            const results = matches ? matches.map(expr => eval(expr)) : [];
            const operationProducts = results.length > 0 ? results.reduce((acc, curr) => acc * curr, 1) : 0;

            const result = (
              <p key={compChildren.IdComponent}>{`${componentChildren?.Name} = ${productExpression} = ${operationProducts}`}</p>
            );

            operationExpressions.push(operationProducts);

            const childrens = TreeComps?.find(x => x.IdParent === compChildren.IdComponent);
            let childComponents;
            if (childrens) {
              const childComponentsChildren = TreeCompsDetail?.filter(x => x.IdTreeComponent === childrens.IdTreeComponent) ?? [];
              if (childComponentsChildren.length > 0) {
                listQuantity.push(compChildren.Quantity);
                childComponents = iterableCalculateQuantity(listQuantity, childComponentsChildren, products, operationExpressions);
                listQuantity.pop();
              }
            }

            return (
              <div key={compChildren.IdComponent}>
                {result}
                {childComponents}
              </div>
            );
          })
        }
      </>
    );
  };

  const calculateAverage = (operationExpressions) => {
    const total = operationExpressions.reduce((acc, curr) => acc + curr, 0);
    const average = operationExpressions.length > 0 ? total / operationExpressions.length : 0;
    const sum = operationExpressions.join(' + ');

    return (
      <p>{`Demanda Promedio = ${sum} / ${operationExpressions.length} = ${average}`}</p>
    );
  }

  const calculateQuantity = () => {
    let products = '';
    if (TreeProductComps && TreeProductComps.length > 0) {
      let listQuantity = [];
      let operationExpressions = [];
      return (
        <>
          <h3>Cálculo del MRP</h3>
          <div>
            {
              TreeProductComps?.map((treeComp) => {
                listQuantity = [];
                const componentsChildren = TreeCompsDetail?.filter(x => x.IdTreeComponent === treeComp.IdTreeComponent);
                const componentName = Components?.find(x => x.IdComponent === treeComp.IdParent);
                listQuantity.push(Demanda);
                listQuantity.push(treeComp.Quantity);
                const initialResult = treeComp.Quantity * Demanda;
                operationExpressions.push(initialResult);
                return (
                  <div key={treeComp.IdTreeComponent}>
                    <p>{`${componentName?.Name} = ${treeComp.Quantity} * ${Demanda} = ${treeComp.Quantity * Demanda}`}</p>
                    {iterableCalculateQuantity(listQuantity, componentsChildren, products, operationExpressions)}
                  </div>
                );
              })
            }
          </div>
          {calculateAverage(operationExpressions)}
        </>
      );
    }
    return <div></div>;
  }

  const downloadAsImage = () => {
    const element = document.getElementById('tree-component');
    if (element) {
      html2canvas(element, {
        ignoreElements: (el) => el.classList.contains('no-capture')
      }).then(canvas => {
        const link = document.createElement('a');
        link.download = 'tree-component.png';
        link.href = canvas.toDataURL();
        link.click();
      });
    }
  };

  const downloadAsPDF = () => {
    const element = document.getElementById('tree-component');
    if (element) {
      html2canvas(element, {
        ignoreElements: (el) => el.classList.contains('no-capture')
      }).then(canvas => {
        const imgData = canvas.toDataURL('image/png');
        const pdf = new jsPDF();
        const imgProps = pdf.getImageProperties(imgData);
        const pdfWidth = pdf.internal.pageSize.getWidth();
        const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
        pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
        pdf.save('tree-component.pdf');
      });
    }
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
                      const componentsChildren = TreeCompsDetail?.filter(x => x.IdTreeComponent === component.IdTreeComponent) ?? [];
                      const value = componentsChildren?.length > 0 ? false : true;
                      return (
                        <>
                          <tr key={component.IdTreeComponent} style={value ? { borderBottom: '2px solid black' } : {}}>
                            <td onClick={() => handleSelectedComponentToDelete(component.IdTreeComponent)}>
                              {SelectedComponentToDelete.includes(component.IdTreeComponent) ? <MdCheckBox /> : <MdOutlineCheckBoxOutlineBlank />}
                            </td>
                            <td>{componentName?.Name}</td>
                            <td style={{ paddingLeft: '60px' }}>{component?.Quantity}</td>
                            <td>
                              {SelectedComponentToDelete.includes(component.IdTreeComponent) ? <MdDelete onClick={() => handleDeleteComponents()} /> : <div></div>}
                            </td>
                          </tr>
                          {
                            componentsChildren?.map((compChild, childIndex) => {
                              const childrenData = Components?.find(cd => cd.IdComponent === compChild.IdComponent);
                              const isLastChild = childIndex === componentsChildren.length - 1;
                              return (
                                <tr key={`${component.IdTreeComponent}-${compChild.IdTreeComponentDetail}`} style={isLastChild ? { borderBottom: '2px solid black' } : {}}>
                                  <td style={{ paddingLeft: '30px' }}><CgMathMinus /></td>
                                  <td style={{ paddingLeft: '30px' }}>{childrenData?.Name}</td>
                                  <td style={{ paddingLeft: '60px' }}>{compChild.Quantity}</td>
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
            <div style={{ height: "300px", overflowY: "auto", display: "flex", justifyContent: "flex-start" }}>
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
            const componentsChildren = TreeCompsDetail?.filter(x => x.IdTreeComponent === component.IdTreeComponent) ?? [];
            const value = componentsChildren?.length > 0 ? false : true;
            return (
              <>
                <tr key={component.IdTreeComponent} style={value ? { borderBottom: '2px solid black' } : {}}>
                  <td onClick={() => handleComponentSelect(component.IdTreeComponent)}>
                    {selectedComponent.includes(component.IdTreeComponent) ? <MdCheckBox /> : <MdOutlineCheckBoxOutlineBlank />}
                  </td>
                  <td>{componentName?.Name}</td>
                  <td style={{ textAlign: 'center' }}>{component?.Quantity}</td>
                </tr>
                {
                  componentsChildren?.map((compChild, childIndex) => {
                    const childrenData = Components?.find(cd => cd.IdComponent === compChild.IdComponent);
                    const isLastChild = childIndex === componentsChildren.length - 1;
                    return (
                      <tr key={`${component.IdTreeComponent}-${compChild.IdTreeComponentDetail}`} style={isLastChild ? { borderBottom: '2px solid black' } : {}}>
                        <td style={{ paddingLeft: '30px' }}><CgMathMinus /></td>
                        <td style={{ paddingLeft: '30px' }}>{childrenData?.Name}</td>
                        <td style={{ textAlign: 'center' }}>{compChild.Quantity}</td>
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
          id="tree-component"
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
            <IoCloseSharp color="white" />
          </button>
          {
            !Tree && (
              <>
                <div className={componentStyles.containerCenter}>
                  <h2 style={{ textAlign: 'center' }}>Árbol de componentes</h2>
                  <MermaidGraph generateGraph={generateMermaidGraph} treeProductComps={TreeProductComps} components={Components} treeCompsDetail={TreeCompsDetail} product={product} />
                  <TextField
                    autoFocus={false}
                    isRequired={true}
                    id="Demand"
                    readOnly={false}
                    title="Demanda del producto"
                    type="number"
                    value={String(Demanda)}
                    onChangeInputValue={onSelectChange}
                  />
                  {calculateQuantity()}
                  <div className="no-capture" style={{ marginTop: "20px" }}>
                    <button onClick={downloadAsImage} style={{ marginRight: "10px",  marginBottom: "25px"}}>Descargar como Imagen</button>
                    <button onClick={downloadAsPDF} style={{ marginBottom: "25px"}} >Descargar como PDF</button>
                  </div>
                </div>
              </>
            )
          }
        </div>
      </div>
      <button
        onClick={() => {
          const validTree = TreeProductComps?.map(comp => comp.IdParent) ?? [];
          productComponentsServices.Delete(ComponentsProduct!);
          if (validTree.length > 0) {
            const productComps = new ProductComponents('', validTree, product!.IdProduct);
            productComponentsServices.Create(productComps);
          }
          window.history.back();
        }}
        style={{
          cursor: "pointer",
          position: "fixed",
          top: "10px",
          left: "10px",
          zIndex: "1000",
          background: "none",
          border: "none"
        }}
      >
        <IoArrowBack size={30} color="black" />
      </button>
    </>
  );
};

export default Component;
