import React, { useContext, useState, useEffect, useRef } from "react";
import { useAsyncError, useParams } from "react-router";
import componentStyles from "./Component.module.css";
import { Product } from "../../../lib/domain/Models/Inventary/Product";
import { InventoryContext } from "../../../providers/InventoryContext";
import ComponentStyle from "./Component.module.css";
import { ComponentDetail } from "../../../lib/domain/Models/Inventary/ComponentDetail";
import ReactLoading from "react-loading";
const Component = () => {
  const isMounted = useRef(false);
  const { productId } = useParams();
  console.log(productId);
  const [product, useProduct] = useState<Product | null>(null);
  const [ProductComponent, useProductComponent] = useState<
    ComponentDetail[] | null
  >(null);
  const InventoryContextAll = useContext(InventoryContext);
  const {
    productServices,
    ComponentsDetail,
    componentDetailServices,
    componentServices,
    Components,
    useComponent,
    useComponentDetail,
  } = InventoryContextAll!;

  useEffect(() => {
    isMounted.current = true;
  
    const fetchProduct = productId
      ? productServices.ProductById(productId)
      : Promise.resolve(null);
    const fetchComponentDetails = ComponentsDetail===null
      ? componentDetailServices.Read()
      : Promise.resolve(null);
    const fetchComponents = Components===null
      ? componentServices.Read()
      : Promise.resolve(null);
    Promise.all([fetchProduct, fetchComponentDetails, fetchComponents]).then(
      ([product, details, components]) => {
        if (isMounted.current) {
          if (product) {
            useProduct(product);
          }
          if (details) {
            useProductComponent(details.filter((x) => x.IdParent == productId));
            useComponentDetail(details);
          }
          if (components) {
            console.log(components);
            useComponent(components);
            console.log(components)
          }
        }
      }
    );
   
  }, []);
console.log(Components);
  return (
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
                style={{
                  backgroundColor: "transparent",
                  padding: "10px",
                  color: "#B4B4B8",
                  border: "1px solid #B4B4B8",
                  borderRadius: "10px",
                }}
              >
                Visualizar arbol
              </button>
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
              <tbody></tbody>
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
                    Components?.map(component=>
                      <tr>
                        <td></td>
                        <td>{component.Name}</td>
                        <td>{component.Quantity}</td>
                      </tr>
                    )
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
                 
                </tbody>
              </table>
            </div>
          </div>
        </section>
      )}
    </main>
  );
};

export default Component;
