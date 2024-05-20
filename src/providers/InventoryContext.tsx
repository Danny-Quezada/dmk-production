import { createContext, Dispatch, SetStateAction } from "react";
import Collection from "../lib/domain/Models/Inventary/Collection";
import Group from "../lib/domain/Models/Inventary/Group";
import ProductServices from "../lib/AppCore/Services/ProductServices";
import { Product } from "../lib/domain/Models/Inventary/Product";
import { Component } from "../lib/domain/Models/Inventary/Component";
import ComponentServices from "../lib/AppCore/Services/ComponentServices";
import { TreeComponent } from "../lib/domain/Models/Inventary/TreeComponent";
import TreeComponentServices from "../lib/AppCore/Services/TreeComponentServices";
import { ProductComponents } from "../lib/domain/Models/Inventary/ProductComponents";
import ProductComponentsServices from "../lib/AppCore/Services/ProductComponentsServices";
import { TreeComponentDetail } from "../lib/domain/Models/Inventary/TreeComponentDetail";
import TreeComponentDetailServices from "../lib/AppCore/Services/TreeComponentDetailServices";
interface IInventoryContext{
    Collections: Collection[] | null;
    useCollection: Dispatch<SetStateAction<Collection[] | null>>
    useGroup: Dispatch<SetStateAction<Group[] | null>>
    // changeUser:Dispatch<string>
    Groups: Group[] | null;
    Products: Product[] | null;
    useProduct: Dispatch<SetStateAction<Product[] | null>>
    productServices:ProductServices;
    ProductComponents: ProductComponents[] | null;
    useProductComponents: Dispatch<SetStateAction<ProductComponents[] | null>>
    productComponentsServices: ProductComponentsServices;
    // User:string;
    Components: Component[] | null;
    useComponent: Dispatch<SetStateAction<Component[] | null>>
    componentServices: ComponentServices;
    TreesComponent: TreeComponent[] | null;
    useTreesComponent: Dispatch<SetStateAction<TreeComponent[] | null>>
    treeComponentServices: TreeComponentServices;
    TreesComponentDetail: TreeComponentDetail[] | null;
    useTreesComponentDetail: Dispatch<SetStateAction<TreeComponentDetail[] | null>>
    treeComponentDetailServices: TreeComponentDetailServices;

}
export const InventoryContext=createContext<IInventoryContext | null>(null);