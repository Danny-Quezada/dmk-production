import React, { useContext, useState, useEffect } from "react";
import { useParams } from "react-router";
import componentStyles from "./Component.module.css";
import { Product } from "../../../lib/domain/Models/Inventary/Product";
 import { InventoryContext } from "../../../providers/InventoryContext";

const Component = () => {
  const params = useParams();
  const ProductId : string |undefined = params.ProductId;
  const InventoryContextAll =useContext(InventoryContext);
const { productServices } = InventoryContextAll!;
  let Product;
  

  useEffect(()=>{
    // console.log(productServices.ProductById(ProductId!));
  },[ProductId])


  return (
    <>
      <div
        className={componentStyles.ImageContainer}
        // style={{ backgroundImage: `url(${Product.Images[0]})` }}
      ></div>
    </>
  );
};

export default Component;
