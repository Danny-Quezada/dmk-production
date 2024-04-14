import { createContext, Dispatch, SetStateAction } from "react";
import Collection from "../lib/domain/Models/Inventary/Collection";
import Group from "../lib/domain/Models/Inventary/Group";
import ProductServices from "../lib/AppCore/Services/ProductServices";
import { Product } from "../lib/domain/Models/Inventary/Product";
interface UserContext{
    Collections: Collection[] | null;
    useCollection: Dispatch<SetStateAction<Collection[] | null>>
    useGroup: Dispatch<SetStateAction<Group[] | null>>
    changeUser:Dispatch<string>
    Groups: Group[] | null;
    Products: Product[] | null;
    useProduct: Dispatch<SetStateAction<Product[] | null>>
    productServices:ProductServices;
    User:string; 
}
export const UserContext=createContext<UserContext | null>(null);