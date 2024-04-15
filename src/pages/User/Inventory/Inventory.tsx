import React, { useContext, useEffect, useState } from "react";
import ContentPageCSS from "../ContentPage.module.css";
import InventaryStyle from "./Inventary.module.css";

import { Product } from "../../../lib/domain/Models/Inventary/Product";
import { Component } from "../../../lib/domain/Models/Inventary/Component";
import ProductRow from "../../../components/ProductRow/ProductRow";
import Collection from "../../../lib/domain/Models/Inventary/Collection";
import { VscEmptyWindow } from "react-icons/vsc";
import Group from "../../../lib/domain/Models/Inventary/Group";
import { IoIosAddCircleOutline } from "react-icons/io";
import { CgTapDouble } from "react-icons/cg";
import { IoCloseSharp } from "react-icons/io5";
import TextField from "../../../components/Textfield/TextField";
import { IoAdd } from "react-icons/io5";
import Button from "../../../components/Button/Button";

import ImageUploading from "react-images-uploading";
import "react-slideshow-image/dist/styles.css";
import { Slide } from "react-slideshow-image";
import { RiImageAddLine } from "react-icons/ri";
import { InventoryContext } from "../../../providers/InventoryContext";
import { toast } from "sonner";
const divStyle = {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  backgroundSize: "cover",
  height: "200px",
};
let decision: string | null = null;
const Inventory = () => {
  const InventoryContextAll = useContext(InventoryContext);
  const {
    Collections,
    Groups,
    productServices,
    useCollection,
    useGroup,
    useProduct,
    Products,
    Components,
    useComponent,
    componentServices,
    ComponentsDetail,
    useComponentDetail,
    componentDetailServices,
  } = InventoryContextAll!;
  const [images, setImages] = useState([]);
  const maxNumber = 69;
  console.log(Products?.length);
  const onChangeImage = (imageList: any, addUpdateIndex: any) => {
    // data for submit
    console.log(imageList["file"], addUpdateIndex);
    setImages(imageList);
  };

  const [showModal, useModal] = useState<boolean>(false);
  const [CreateProduct, createProduct] = useState<Product>(
    new Product("cero", "", new Date(), 1, "A", 1, "Hogar", false, [], 1, [])
  );

  const [CreateComponent, createComponent] = useState<Component>(
    new Component("", "", 1)
  );

  const onChange = (e: React.FormEvent<HTMLInputElement>) => {
    createProduct({
      ...CreateProduct,
      [e.currentTarget.name]:
        e.currentTarget.name == "Date"
          ? new Date(e.currentTarget.value)
          : e.currentTarget.value,
    });
  };
  const onChangecomponent = (e: React.FormEvent<HTMLInputElement>) => {
    createComponent({
      ...CreateComponent,
      [e.currentTarget.name]:
        e.currentTarget.name == "Date"
          ? new Date(e.currentTarget.value)
          : e.currentTarget.value,
    });
  };
  const OnSubmit = async (e: any) => {
    e.preventDefault();
    let files: File[] = [];
    images.map((image) => {
      files.push(image["file"]);
    });
    const urls = await productServices.UploadImages(files);

    CreateProduct.Images = urls;
    const id = await productServices.Create(CreateProduct);
    CreateProduct.IdProduct = id;
    useProduct([...Products!, CreateProduct]);
  };
  const onSubmitComponent = async (e: any) => {
    e.preventDefault();
    const id = await componentServices.Create(CreateComponent);

    CreateComponent.IdComponent = id;
    // useComponent([...Components!, CreateComponent])
    return toast.success("Componente creado");
  };

  useEffect(() => {
    if (Products == null) {
      productServices.Read().then((resp: Product[]) => {
        useProduct(resp);
      });
    }
    if (Groups == null) {
      productServices.ReadCollection().then((resp: Collection[]) => {
        useCollection(resp);
      });
    }
    if (Collections == null) {
      productServices.ReadGroups().then((resp: Group[]) => {
        useGroup(resp);
      });
    }
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
              decision = "Component";
              useModal(true);
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
            Agregar componentes
          </button>
        </div>

        <section style={{ overflowX: "auto", width: "100%", display: "block" }}>
          {Products == null ? (
            <div></div>
          ) : Products.length == 0 ? (
            <div
              onClick={(e) => {
                decision = "Product";
                useModal(true);
              }}
              style={{
                cursor: "pointer",
                display: "flex",
                marginTop: "20px",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                gap: "20px",
              }}
            >
              <VscEmptyWindow size={100} color="grey" />
              <h3>No hay productos por el momento 🥲</h3>
            </div>
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
                      product={product}
                      key={product.IdProduct + 44}
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
          setImages([]);
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
        {decision === "Product" ? (
          <div
            className={InventaryStyle.ContentFormInventary}
            onClick={(event) => {
              event.stopPropagation();
            }}
          >
            <button
              onClick={(e) => {
                useModal(false);
                setImages([]);
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
            <form className={InventaryStyle.Form} onSubmit={OnSubmit}>
              <h2 className={InventaryStyle.Title}>Crear producto</h2>
              <div
                className={InventaryStyle.AddImage}
                style={{
                  justifyContent: images.length == 0 ? "center" : "center",
                  display: images.length == 0 ? "flex" : "block",
                }}
              >
                <ImageUploading
                  multiple
                  value={images}
                  onChange={onChangeImage}
                  maxNumber={maxNumber}
                  dataURLKey="data_url"
                >
                  {({
                    imageList,
                    onImageUpload,
                    onImageRemoveAll,
                    onImageUpdate,
                    onImageRemove,
                    isDragging,
                    dragProps,
                  }) => (
                    // write your building UI
                    <div>
                      {imageList.length === 0 && (
                        <button
                          style={{
                            backgroundColor: "transparent",
                            outline: "none",
                            border: "none",
                            alignContent: "center",
                            cursor: "pointer",
                          }}
                          onClick={onImageUpload}
                          {...dragProps}
                        >
                          <RiImageAddLine size={100} color="grey" />
                          <h4 style={{ color: "grey" }}>Agregar imagenes</h4>
                        </button>
                      )}

                      {imageList.length !== 0 && (
                        <div
                          style={{ display: "flex", flexDirection: "column" }}
                        >
                          <Slide>
                            {imageList.map((image, index) => (
                              <div
                                key={index}
                                style={{ ...divStyle }}
                                onDoubleClick={() => onImageRemove(index)}
                              >
                                <img
                                  src={image["data_url"]}
                                  alt=""
                                  width="100"
                                />
                              </div>
                            ))}
                          </Slide>
                          <button
                            {...dragProps}
                            onClick={onImageUpload}
                            style={{
                              backgroundColor: "transparent",
                              outline: "none",
                              border: "none",
                              alignContent: "center",
                              cursor: "pointer",
                              display: "flex",
                              gap: "10px",
                              justifyContent: "center",
                              alignItems: "center",
                            }}
                          >
                            <RiImageAddLine size={20} color="grey" />
                            <h4 style={{ color: "grey" }}>Agregar imagenes</h4>
                          </button>
                        </div>
                      )}
                    </div>
                  )}
                </ImageUploading>
              </div>
              <div className={InventaryStyle.Detail}>
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
                <TextField
                  autoFocus={false}
                  isRequired={true}
                  id="Price"
                  readOnly={false}
                  title="Precio de venta"
                  type="number"
                  value={CreateProduct.Price.toString()}
                  onChangeInputValue={onChange}
                />
                <TextField
                  autoFocus={false}
                  isRequired={true}
                  id="Cost"
                  readOnly={false}
                  title="Costo"
                  type="number"
                  value={CreateProduct.Cost.toString()}
                  onChangeInputValue={onChange}
                />
              </div>
              <div className={InventaryStyle.MoreDetail}>
                <TextField
                  isRequired={true}
                  id={"Date"}
                  readOnly={false}
                  title={"Fecha de creación"}
                  autoFocus={false}
                  onChangeInputValue={onChange}
                  type="date"
                  value={
                    CreateProduct.Date.getFullYear().toString() +
                    "-" +
                    (CreateProduct.Date.getMonth() < 10
                      ? "0" + CreateProduct.Date.getMonth().toString()
                      : CreateProduct.Date.getMonth()) +
                    "-" +
                    (CreateProduct.Date.getDate() < 10
                      ? "0" + CreateProduct.Date.getDate().toString()
                      : CreateProduct.Date.getDate())
                  }
                />
                {Collections != null && (
                  <label
                    htmlFor={"Collection"}
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      color: "grey",
                      gap: "10px",
                    }}
                  >
                    Collection
                    <select
                      key={"Collection"}
                      className={InventaryStyle.SelectCollection}
                      name="Collection"
                      id="Collection"
                      defaultValue={CreateProduct.Collection}
                      onChange={(e) => {
                        createProduct({
                          ...CreateProduct,
                          Collection: e.currentTarget.value,
                        });
                      }}
                    >
                      {Collections!.map((value: Collection) => (
                        <option
                          value={value.CollectionName}
                          key={value.CollectionName + 2}
                        >
                          {value.CollectionName}
                        </option>
                      ))}
                    </select>
                  </label>
                )}
                {Groups != null && (
                  <label
                    htmlFor={"Group"}
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      color: "grey",
                      gap: "10px",
                    }}
                  >
                    Grupos
                    <select
                      style={{ width: "100px" }}
                      className={InventaryStyle.SelectGroup}
                      name="Group"
                      id="Group"
                      defaultValue={CreateProduct.Group}
                      onChange={(e) => {
                        console.log(e.currentTarget.value);
                        createProduct({
                          ...CreateProduct,
                          Group: e.currentTarget.value,
                        });
                      }}
                    >
                      {Groups!.map((value: Group) => (
                        <option
                          value={value.GroupName}
                          key={value.GroupName + 22}
                        >
                          {value.GroupName}
                        </option>
                      ))}
                    </select>
                  </label>
                )}
              </div>
              <div className={InventaryStyle.ButtonContainer}>
                <Button title="Crear Producto" onSubmit={OnSubmit} />
              </div>
            </form>
          </div>
        ) : (
          <div
            className={InventaryStyle.ContentFormInventary}
            style={{
              width: "400px",
            }}
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
              className={InventaryStyle.Form}
              style={{
                display: "flex",

                flexDirection: "column",
              }}
              onSubmit={onSubmitComponent}
            >
              <h2 className={InventaryStyle.Title}>Crear componente</h2>
              <TextField
                autoFocus={true}
                isRequired={true}
                id="Name"
                readOnly={false}
                title="Nombre del componente"
                type="text"
                value={CreateComponent.Name.toString()}
                onChangeInputValue={onChangecomponent}
              />
              <TextField
                autoFocus={false}
                isRequired={true}
                id="Quantity"
                readOnly={false}
                title="Cantidad"
                type="number"
                value={CreateComponent.Quantity.toString()}
                onChangeInputValue={onChangecomponent}
              />
              <Button title="Crear componente" onSubmit={() => {}} />
            </form>
          </div>
        )}
      </div>

      <button
        onClick={(e) => {
          decision = "Product";
          console.log(decision);
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
      >
        <IoAdd color="green" size={20} />
      </button>
    </>
  );
};
export default Inventory;
