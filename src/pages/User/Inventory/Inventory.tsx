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
import { IoIosAddCircleOutline } from "react-icons/io";
import { CgTapDouble } from "react-icons/cg";
import { IoCloseSharp } from "react-icons/io5";
import TextField from "../../../components/Textfield/TextField";
const Inventory = () => {
  const [showModal, useModal] = useState<boolean>(false);
  const [CreateProduct, createProduct] = useState<Product>(
    new Product("cero", "", new Date(), 0, "", 0, "", false, [], 0)
  );
  const [Products, useProduct] = useState<Product[] | null>(null);
  const [Collections, useCollection] = useState<Collection[] | null>(null);
  const [Groups, useGroup] = useState<Group[] | null>(null);
  const onChange = (e: React.FormEvent<HTMLInputElement>) => {
    createProduct({
      ...CreateProduct,
      [e.currentTarget.name]:
        e.currentTarget.name == "Date"
          ? new Date(e.currentTarget.value)
          : e.currentTarget.value,
    });
  };
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
    <>
      <main
        className={`${ContentPageCSS.main} ${InventaryStyle.InventaryMain}`}
        style={{ overflow: "hidden" }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <h2 className={ContentPageCSS.titlePage}>Inventario</h2>
            <div style={{ display: "flex", alignItems: "center" }}>
              <h5 style={{ color: "grey" }}>Toca cualquier producto</h5>
              <CgTapDouble size={20} />
            </div>
          </div>
          <button
            onClick={(e) => {
              useModal(true);
              // productServices.Create(
              //   new Product(
              //     "3",
              //     "Prueba",
              //     new Date(),
              //     3,
              //     "A",
              //     33,
              //     "Hogar",
              //     false,
              //     [],
              //     3
              //   )
              // );
            }}
            style={{
              border: "none",
              backgroundColor: "transparent",
              cursor: "pointer",
              display: "flex",
              gap: "10px",
              alignItems: "center",
              color: "rgb(180, 120, 208)",
            }}
          >
            <IoIosAddCircleOutline size={30} />
            Agregar producto
          </button>
        </div>

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
        }}
      >
        <div
          className={ContentPageCSS.contentForm}
          style={{ display: "flex", flexDirection: "column", gap: "20px" }}
          onClick={(event) => {
            event.stopPropagation();
          }}
        >
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
          <form
            style={{
              margin: "10px",
              display: "flex",
              gap: "30px",
              flexDirection: "column",
            }}
          >
            <TextField
              autoFocus={true}
              isRequired={true}
              id="ProductName"
              readOnly={false}
              title="Nombre del producto"
              type="text"
              value={CreateProduct.ProductName}
              onChangeInputValue={onChange}
            />
            <TextField
              autoFocus={false}
              isRequired={true}
              id="Quantity"
              readOnly={false}
              title="Cantidad"
              type="number"
              value={CreateProduct.Quantity.toString()}
              onChangeInputValue={onChange}
            />
          </form>
        </div>
      </div>
    </>
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
