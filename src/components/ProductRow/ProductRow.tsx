import { Product } from "../../lib/domain/Models/Product";
import ProductStyle from "./ProductRow.module.css";

import React from "react";

function ProductRow({ Product }: Props) {
  return (
    <tr  >
      <td>
        <input
          type="checkbox"
          name={Product.ProductName}
          id={Product.IdProduct + 1}
        />
      </td>
      <td>
        <div className={ProductStyle.ImageContainer}></div>
      </td>
      <td>{Product.ProductName}</td>
      <td>
        <select name="Group" id={Product.IdProduct + 2} disabled={true} className={ProductStyle.SelectGroup}>
          <option value={Product.Group}>{Product.Group}</option>
        </select>
      </td>
      <td>
        <select name="Category" id={Product.IdProduct + 3} disabled={true} className={ProductStyle.SelectCollection}>
          <option value={Product.Collection}>{Product.Collection}</option>
        </select>
      </td>
      <td>C${Product.Price}</td>
      <td>{Product.Quantity}</td>
      <td><button></button></td>
    </tr>
  );
}
interface Props {
  Product: Product;
}
export default ProductRow;
