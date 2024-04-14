import React, { useEffect, useState } from "react";
import ContentPageCSS from "../ContentPage.module.css";
import InventaryStyle from "./Inventary.module.css";
import ProductServices from "../../../lib/AppCore/Services/ProductServices";
import ProductRepository from "../../../lib/infrastructure/ProductRepository";
import { Product } from "../../../lib/domain/Models/Inventary/Product";
import ProductRow from "../../../components/ProductRow/ProductRow";
import CollectionRepository from "../../../lib/infrastructure/CollectionRepository";
import Collection from "../../../lib/domain/Models/Inventary/Collection";
import GroupRepository from "../../../lib/infrastructure/GroupRepository";
import Group from "../../../lib/domain/Models/Inventary/Group";
const Inventory = () => {
  const [Products, useProduct] = useState<Product[] | null>(null);
  const [Collections, useCollection] = useState<Collection[] | null>(null);
  const [Groups, useGroup] = useState<Group[] | null>(null);
  const productServices: ProductServices = new ProductServices(
    new ProductRepository(),
    new CollectionRepository(),
    new GroupRepository()
  );
  const [isLoading, useLoading] = useState(false);
  useEffect(() => {
    // productServices.Read();

    productServices.Read().then((resp) => {
      useProduct(productServices.Products);
      useLoading(true);
    });
    productServices.ReadCollection().then((resp) => {
      useCollection(productServices.Collections);
    });
    productServices.ReadGroups().then((resp) => {
      useGroup(productServices.Groups);
    });
  }, []);

  return (
    <main
      className={`${ContentPageCSS.main} ${InventaryStyle.InventaryMain}`}
      style={{ overflow: "hidden" }}
    >
      <h2 className={ContentPageCSS.titlePage}>Inventario</h2>
      <section style={{ overflowX: "auto", width: "100%", display: "block" }}>
        {!isLoading ? (
          <div></div>
        ) : (
          <div>
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
                  <ProductRow
                  Groups={Groups!}
                    Collections={Collections!}
                    Product={product}
                    key={product.IdProduct + 44}
                    OnTouch={onTouch}
                  />
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>
    </main>
  );
  function onTouch(productId: string, select: boolean) {
    const newProducts: Product[] | null = Products!.map((Product) => {
      if (Product.IdProduct !== productId) return Product;

      return { ...Product, Select: select };
    });
    useProduct(newProducts);
  }
};
export default Inventory;
