import React, { useEffect, useState } from "react";
import ContentPageCSS from "../ContentPage.module.css";
import InventaryStyle from "./Inventary.module.css";
import ProductServices from "../../../lib/AppCore/Services/ProductServices";
import ProductRepository from "../../../lib/infrastructure/ProductRepository";
import { Product } from "../../../lib/domain/Models/Product";
import ProductRow from "../../../components/ProductRow/ProductRow";
const Inventory = () => {
  const [Products, useProduct] = useState<Product[] | null>(null);
  const productServices: ProductServices = new ProductServices(
    new ProductRepository()
  );
  const [isLoading, useLoading] = useState(false);
  useEffect(() => {
    // productServices.Read();

    productServices.Read().then((resp) => {
      useProduct(productServices.Products);
      useLoading(true);
    });
    console.log(Products);
  }, []);
  console.log(Products)
  return (
    <main
      className={`${ContentPageCSS.main} ${InventaryStyle.InventaryMain}`}
      style={{ overflow: "hidden" }}
    >
      <h2 className={ContentPageCSS.titlePage}>Inventario</h2>
      <section style={{ overflowX: "auto", width: "100%", display: "block" }}>
        {
          !isLoading ? <div></div>: <div>
            <table className={InventaryStyle.table}>
              <thead>
                <tr>
                  <th>#</th>
                  <th>Imagen</th>
                  <th>Nombre</th>
                  <th>Grupo</th>
                  <th>Categoría</th>
                  <th>Precio</th>
                  <th>Cantidad</th>
                </tr>
              </thead>
              <tbody>
                {Products!.map((product) => (
                  <ProductRow Product={product} key={product.Price} />
                ))}
              </tbody>
            </table>
          </div>
        }
      </section>
    </main>
  );
};
export default Inventory;
