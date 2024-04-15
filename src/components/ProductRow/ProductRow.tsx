import { Product } from "../../lib/domain/Models/Inventary/Product";
import ProductStyle from "./ProductRow.module.css";
import { RxEyeOpen } from "react-icons/rx";
import TextField from "../Textfield/TextField";
import { RiEyeCloseLine } from "react-icons/ri";
import React, { useContext, useState } from "react";
import "react-tagsinput/react-tagsinput.css";
import QRCode from "react-qr-code";
import { InventoryContext } from "../../providers/InventoryContext";
import { MdDelete } from "react-icons/md";
import { toast } from "sonner";
function ProductRow({ product: Product }: Props) {
  const UserContextAll = useContext(InventoryContext);
  const { Collections, Groups, productServices, useProduct, Products } =
    UserContextAll!;

  const [expand, changeExpand] = useState(false);
  const [ChangedProduct, useChangedProduct] = useState<Product>(Product);

  const onChange = (e: React.FormEvent<HTMLInputElement>) => {
    useChangedProduct({
      ...Product,
      [e.currentTarget.name]:
        e.currentTarget.name == "Date"
          ? new Date(e.currentTarget.value)
          : e.currentTarget.value,
    });
  };
  const onSubmite = async (e: any) => {
    e.preventDefault();

    if (ChangedProduct === Product) {
      console.log("hello");
      return toast.error("Tienes que cambiar por lo menos un campo");
    } else {
      const updated: boolean = await productServices.Update(ChangedProduct);
      if (updated) {
        const newProducts: Product[] | null = Products!.map((Product) => {
          if (Product.IdProduct !== Product.IdProduct) return Product;

          return { ...ChangedProduct };
        });
        useProduct(newProducts);
        changeExpand(false);
        return toast.success("Producto actualizado");
      } else {
        return toast.error("Hubo un error, intentalo más tarde.");
      }
    }
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

            const newProducts: Product[] | null = Products!.map((Product) => {
              if (Product.IdProduct !== Product.IdProduct) return Product;

              return { ...Product, Select: e.target.checked };
            });
            useProduct(newProducts);
          }}
          checked={Product.Select}
          type="checkbox"
          name={Product.ProductName}
          id={Product.IdProduct + 1}
          aria-label="Mostrar detalles"
        />
      </td>
      <td onClick={ChangeExpand}>
        <div
          className={ProductStyle.ImageContainer}
          style={{ backgroundImage: `url(${Product.Images[0]})` }}
        ></div>
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
      <td >
        <div style={{display: "flex", gap: "10px"}}>
        <button onClick={ChangeExpand}
          className={ProductStyle.Button}
          aria-label="Actualizar producto"
        >
          {!expand ? (
            <RiEyeCloseLine size={30} />
          ) : (
            <RxEyeOpen color="blue" size={30} />
          )}
        </button>
        <MdDelete
        className={ProductStyle.Delete}
          aria-label="Eliminar producto"
          size={30}
         
          onClick={async(e) => {
            const deleted: boolean=await productServices.Delete(Product);
            if(!deleted){
              return toast.error("Error, intenta eliminarlo más tarde.")
            }
            const newProducts: Product[] | undefined = Products?.filter((product)=>{
              return product.IdProduct!=product.IdProduct;
            })
            useProduct(newProducts!);
            return toast.success("Producto eliminado");
          }}
        />
        </div>
      </td>
    </tr>,
    expand && (
      <tr className={ProductStyle.Collapse} key={Product.IdProduct + 3333}>
        <td colSpan={8}>
          <form className={ProductStyle.container} onSubmit={onSubmite}>
            <div className={ProductStyle.Images}>
              <div
                style={{
                  width: "100px",
                  height: "100px",
                  backgroundColor: "blue",
                  borderRadius: "13px",
                  backgroundImage: `url(${Product.Images[0]})`,
                  backgroundSize: "cover",
                  backgroundRepeat: "no-repeat",
                  backgroundPosition: "center",
                }}
              ></div>
            </div>
            <div className={ProductStyle.Detail}>
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
            </div>
            <div className={ProductStyle.MoreDetail}>
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
                  (ChangedProduct.Date.getDate() < 10
                    ? "0" + ChangedProduct.Date.getDate().toString()
                    : ChangedProduct.Date.getDate())
                }
              />
            </div>
            <div className={ProductStyle.Selection}>
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
                    useChangedProduct({
                      ...ChangedProduct,
                      Collection: e.currentTarget.value,
                    });
                  }}
                >
                  {Collections!.map((value) => (
                    <option
                      value={value.CollectionName}
                      key={value.CollectionName + 2}
                    >
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
                  style={{ width: "100px" }}
                  className={ProductStyle.SelectGroup}
                  name="Group"
                  id="Group"
                  defaultValue={ChangedProduct.Group}
                  onChange={(e) => {
                    console.log(e.currentTarget.value);
                    useChangedProduct({
                      ...ChangedProduct,
                      Group: e.currentTarget.value,
                    });
                  }}
                >
                  {Groups!.map((value) => (
                    <option value={value.GroupName} key={value.GroupName + 22}>
                      {value.GroupName}
                    </option>
                  ))}
                </select>
              </label>
            </div>
            <div className={ProductStyle.ButtonGrid}>
              <button className={ProductStyle.ButtonUpdate} type="submit">
                Actualizar
              </button>
            </div>
          </form>
        </td>
      </tr>
    ),
  ];
}
interface Props {
  product: Product;
}
export default ProductRow;
