import { createContext, Dispatch, SetStateAction } from "react";
import Collection from "../lib/domain/Models/Inventary/Collection";
import Group from "../lib/domain/Models/Inventary/Group";
import ProductServices from "../lib/AppCore/Services/ProductServices";
import { Product } from "../lib/domain/Models/Inventary/Product";
import { Component } from "../lib/domain/Models/Inventary/Component";
import ComponentServices from "../lib/AppCore/Services/ComponentServices";
import { ComponentDetail } from "../lib/domain/Models/Inventary/ComponentDetail";
import ComponentDetailServices from "../lib/AppCore/Services/ComponentDetailServices";
interface IInventoryContext{
    Collections: Collection[] | null;
    useCollection: Dispatch<SetStateAction<Collection[] | null>>
    useGroup: Dispatch<SetStateAction<Group[] | null>>
    // changeUser:Dispatch<string>
    Groups: Group[] | null;
    Products: Product[] | null;
    useProduct: Dispatch<SetStateAction<Product[] | null>>
    productServices:ProductServices;
    // User:string;
    Components: Component[] | null;
    useComponent: Dispatch<SetStateAction<Component[] | null>>
    componentServices: ComponentServices;
    ComponentsDetail: ComponentDetail[] | null;
    useComponentDetail: Dispatch<SetStateAction<ComponentDetail[] | null>>
    componentDetailServices:ComponentDetailServices;
}
export const InventoryContext=createContext<IInventoryContext | null>(null);