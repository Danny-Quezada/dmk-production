import { Product } from "../../lib/domain/Models/Inventary/Product";
import ProductStyle from "./ProductRow.module.css";
import { RxEyeOpen } from "react-icons/rx";

import TextField from "../Textfield/TextField";
import { RiEyeCloseLine } from "react-icons/ri";
import React, { useState } from "react";
// import TagsInput from "react-tagsinput";

import "react-tagsinput/react-tagsinput.css";
import QRCode from "react-qr-code";
import { collection } from "firebase/firestore";
import Collection from "../../lib/domain/Models/Inventary/Collection";
import Group from "../../lib/domain/Models/Inventary/Group";
function ProductRow({ Product, OnTouch, Collections, Groups }: Props) {
  const [expand, changeExpand] = useState(false);
  const [ChangedProduct, useProduct] = useState(Product);

  const OnSubmit = (event: React.MouseEvent<HTMLElement>) => {
    event.preventDefault();
  };

  const onChange = (e: React.FormEvent<HTMLInputElement>) => {
    console.log(e.currentTarget.value);
    console.log(e.currentTarget.name);
    useProduct({
      ...Product,
      [e.currentTarget.name]:
        e.currentTarget.name == "Date"
          ? new Date(e.currentTarget.value)
          : e.currentTarget.value,
    });
  };

  const ChangeExpand = () => {
    console.log(Product.Select);
    if (!Product.Select) {
      changeExpand(!expand);
    }
  };
  return [
    <tr className={ProductStyle.Container} key={Product.IdProduct + 5}>
      <td>
        <input
          onChange={(e) => {
            if (e.target.checked) {
              if (expand) {
                changeExpand(false);
              }
            }

            OnTouch(Product.IdProduct, e.target.checked);
          }}
          checked={Product.Select}
          type="checkbox"
          name={Product.ProductName}
          id={Product.IdProduct + 1}
          aria-label="Mostrar detalles"
          
        />
      </td>
      <td onClick={ChangeExpand}>
        <div className={ProductStyle.ImageContainer}></div>
      </td>
      <td onClick={ChangeExpand}>{Product.ProductName}</td>
      <td onClick={ChangeExpand}>
        <select
        aria-label="Grupos"
        
          name="Group"
          id={Product.IdProduct + 2}
          disabled={true}
          className={ProductStyle.SelectGroup}
        >
          <option value={Product.Group}>{Product.Group}</option>
        </select>
      </td>
      <td onClick={ChangeExpand}>
        <select
          name="Category"
          id={Product.IdProduct + 3}
          disabled={true}
          className={ProductStyle.SelectCollection}
        >
          <option value={Product.Collection}>{Product.Collection}</option>
        </select>
      </td>
      <td onClick={ChangeExpand}>C${Product.Price}</td>
      <td onClick={ChangeExpand}>{Product.Quantity}</td>
      <td onClick={ChangeExpand}>
        <button className={ProductStyle.Button} aria-label="Actualizar producto">
          {!expand ? (
            <RiEyeCloseLine width="50px" height="50px" />
          ) : (
            <RxEyeOpen color="blue" width="50px" height={"50px"} />
          )}
        </button>
      </td>
    </tr>,
    expand && (
      <tr className={ProductStyle.Collapse} key={Product.IdProduct + 3333}>
        <td colSpan={8}>
          <div
            style={{
              paddingTop: "10px",
              borderTop: "1px solid grey",
              display: "flex",
              gap: "50px",
              flexDirection: "row",
              marginBottom: "15px",
            }}
          >
            <div
              className=""
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <div
                style={{
                  width: "100px",
                  height: "100px",
                  backgroundColor: "blue",
                  borderRadius: "13px",
                }}
              ></div>
            </div>
            <div
              className=""
              style={{ display: "flex", flexDirection: "column", gap: "20px", width: "400px"}}
            >
              <TextField
                autoFocus={true}
                isRequired={true}
                id={"ProductName"}
                readOnly={false}
                title={"Nombre de producto"}
                type={"text"}
                onChangeInputValue={onChange}
                value={ChangedProduct.ProductName}
              />
              <TextField
                isRequired={true}
                id={"Quantity"}
                readOnly={false}
                title={"Cantidad"}
                autoFocus={false}
                onChangeInputValue={onChange}
                type="number"
                value={ChangedProduct.Quantity.toString()}
              />
              <div>
                <h5
                  style={{
                    color: "grey",
                    display: "flex",
                    flexDirection: "column",
                    gap: "5px",
                  }}
                >
                  QR
                </h5>
                <QRCode value={Product.ProductName} size={80} />
              </div>
              <button
                type="submit"
                style={{
                  backgroundColor: "blue",
                  color: "white",
                  outline: "none",
                  border: "none",
                  height: "30px",
                  wordSpacing: "1px",
                  cursor: "pointer",
                  width: "120px",
                  borderRadius: "80px",
                }}
                onClick={OnSubmit}
              >
                Actualizar
              </button>
            </div>
            <div
              className=""
              style={{ display: "flex", flexDirection: "column", gap: "20px" }}
            >
              <TextField
                autoFocus={false}
                isRequired={true}
                id={"Price"}
                readOnly={false}
                title={"Precio de venta"}
                type={"number"}
                onChangeInputValue={onChange}
                value={ChangedProduct.Price.toString()}
              />
              <TextField
                isRequired={true}
                id={"Cost"}
                readOnly={false}
                title={"Costo"}
                autoFocus={false}
                onChangeInputValue={onChange}
                type="number"
                value={ChangedProduct.Cost.toString()}
              />
              <TextField
                isRequired={true}
                id={"Date"}
                readOnly={false}
                title={"Fecha de creación"}
                autoFocus={false}
                onChangeInputValue={onChange}
                type="date"
                value={
                  ChangedProduct.Date.getFullYear().toString() +
                  "-" +
                  (ChangedProduct.Date.getMonth() < 10
                    ? "0" + ChangedProduct.Date.getMonth().toString()
                    : ChangedProduct.Date.getMonth()) +
                  "-" +
                  (ChangedProduct.Date.getDay() < 10
                    ? "0" + ChangedProduct.Date.getDay().toString()
                    : ChangedProduct.Date.getDay())
                }
              />
            </div>
            <div
              style={{ display: "flex", flexDirection: "column", gap: "20px" }}
            >
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
                  className={ProductStyle.SelectCollection}
                  name="Collection"
                  id="Collection"
                  defaultValue={ChangedProduct.Collection}
                  onChange={(e) => {
                   
                    useProduct({
                      ...ChangedProduct,
                      Collection: e.currentTarget.value,
                    });
                  }}
                >
                  {Collections.map((value) => (
                    <option value={value.CollectionName} key={value.CollectionName+2}>
                      {value.CollectionName}
                    </option>
                  ))}
                </select>
              </label>
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
                style={{width: "100px"}}
                  className={ProductStyle.SelectGroup}
                  name="Group"
                  id="Group"
                  defaultValue={ChangedProduct.Group}
                  onChange={(e) => {
                    console.log(e.currentTarget.value);
                    useProduct({
                      ...ChangedProduct,
                      Group: e.currentTarget.value,
                    });
                  }}
                >
                  {Groups.map((value) => (
                    <option value={value.GroupName} key={value.GroupName+22}>{value.GroupName}</option>
                  ))}
                </select>
              </label>
             
            </div>
          </div>
        </td>
      </tr>
    ),
  ];
}
interface Props {
  Product: Product;
  OnTouch: (productId: string, select: boolean) => void;
  Collections: Collection[];
  Groups: Group[];
}
export default ProductRow;
