import React, { useState } from "react";
import { UserContext } from "./UserContext";
import ProductServices from "../lib/AppCore/Services/ProductServices";
import ProductRepository from "../lib/infrastructure/ProductRepository";
import CollectionRepository from "../lib/infrastructure/CollectionRepository";
import GroupRepository from "../lib/infrastructure/GroupRepository";
import Collection from "../lib/domain/Models/Inventary/Collection";
import Group from "../lib/domain/Models/Inventary/Group";
import { Product } from "../lib/domain/Models/Inventary/Product";

interface Props {
  children: any;
}
const UserProvider = ({ children }: Props) => {
  const [User, changeUser] = useState<string>("");
  const productServices: ProductServices = new ProductServices(
    new ProductRepository(),
    new CollectionRepository(),
    new GroupRepository()
  );
  const [Collections, useCollection] = useState<Collection[] | null>(null);
  const [Groups, useGroup] = useState<Group[] | null>(null);

  const [Products, useProduct] = useState<Product[] | null>(null);
  return (
    <UserContext.Provider
      value={{
        User,
        changeUser,
        productServices,
        Collections,
        useCollection,
        Groups,
        useGroup,
        Products,
        useProduct
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;
