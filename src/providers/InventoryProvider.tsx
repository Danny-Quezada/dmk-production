import React, { useState } from "react";

import ProductServices from "../lib/AppCore/Services/ProductServices";
import ProductRepository from "../lib/infrastructure/ProductRepository";
import CollectionRepository from "../lib/infrastructure/CollectionRepository";
import GroupRepository from "../lib/infrastructure/GroupRepository";
import Collection from "../lib/domain/Models/Inventary/Collection";
import Group from "../lib/domain/Models/Inventary/Group";
import { Product } from "../lib/domain/Models/Inventary/Product";
import { InventoryContext } from "./InventoryContext";
import { Component } from "../lib/domain/Models/Inventary/Component";
import ComponentServices from "../lib/AppCore/Services/ComponentServices";
import ComponentRepository from "../lib/infrastructure/ComponentRepository";
import { ComponentDetail } from "../lib/domain/Models/Inventary/ComponentDetail";
import ComponentDetailRepository from "../lib/infrastructure/ComponentDetailRepository";
import ComponentDetailServices from "../lib/AppCore/Services/ComponentDetailServices";

interface Props {
  children: any;
}
const InventoryProvider = ({ children }: Props) => {
  const [User, changeUser] = useState<string>("");
  const productServices: ProductServices = new ProductServices(
    new ProductRepository(),
    new CollectionRepository(),
    new GroupRepository()
  );

  const componentServices: ComponentServices = new ComponentServices(
    new ComponentRepository(),
  );
  
  const componentDetailServices: ComponentDetailServices = new ComponentDetailServices(
    new ComponentDetailRepository(),
  );

  const [Collections, useCollection] = useState<Collection[] | null>(null);
  const [Groups, useGroup] = useState<Group[] | null>(null);
  const [Products, useProduct] = useState<Product[] | null>(null);
  const [Components, useComponent] = useState<Component[] | null>(null);
  const [ComponentsDetail, useComponentDetail] = useState<ComponentDetail[] | null>(null);

  return (
    <InventoryContext.Provider
      value={{
        productServices,
        Collections,
        useCollection,
        Groups,
        useGroup,
        Products,
        useProduct,
        Components,
        useComponent,
        componentServices,
        ComponentsDetail, 
        useComponentDetail,
        componentDetailServices,
      }}
    >
      {children}
    </InventoryContext.Provider>
  );
};

export default InventoryProvider;
