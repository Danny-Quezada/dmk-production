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
import { TreeComponent } from "../lib/domain/Models/Inventary/TreeComponent";
import TreeComponentRepository from "../lib/infrastructure/TreeComponentRepository";
import TreeComponentServices from "../lib/AppCore/Services/TreeComponentServices";
import { ProductComponents } from "../lib/domain/Models/Inventary/ProductComponents";
import ProductComponentsServices from "../lib/AppCore/Services/ProductComponentsServices";
import ProductComponentsRepository from "../lib/infrastructure/ProductComponentsRepoisitory";
import TreeComponentDetailServices from "../lib/AppCore/Services/TreeComponentDetailServices";
import TreeComponentDetailRepository from "../lib/infrastructure/TreeComponentDetailRepository";
import { TreeComponentDetail } from "../lib/domain/Models/Inventary/TreeComponentDetail";

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
  
  const treeComponentServices: TreeComponentServices = new TreeComponentServices(
    new TreeComponentRepository(),
  );

  const productComponentsServices: ProductComponentsServices = new ProductComponentsServices(
    new ProductComponentsRepository(),
  );

  const treeComponentDetailServices: TreeComponentDetailServices = new TreeComponentDetailServices(
    new TreeComponentDetailRepository(),
  );

  const [Collections, useCollection] = useState<Collection[] | null>(null);
  const [Groups, useGroup] = useState<Group[] | null>(null);
  const [Products, useProduct] = useState<Product[] | null>(null);
  const [Components, useComponent] = useState<Component[] | null>(null);
  const [TreesComponent, useTreesComponent] = useState<TreeComponent[] | null>(null);
  const [ProductComponents, useProductComponents] = useState<ProductComponents[] | null>(null);
  const [TreesComponentDetail, useTreesComponentDetail] = useState<TreeComponentDetail[] | null>(null);

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
        TreesComponent,
        useTreesComponent,
        treeComponentServices,
        ProductComponents, 
        useProductComponents,
        productComponentsServices,
        TreesComponentDetail,
        useTreesComponentDetail,
        treeComponentDetailServices,
      }}
    >
      {children}
    </InventoryContext.Provider>
  );
};

export default InventoryProvider;
