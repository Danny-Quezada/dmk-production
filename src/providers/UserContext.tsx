import { Dispatch, SetStateAction, createContext } from "react";

interface IUserContext{
   
       changeUser:Dispatch<string>
        User: string;
}
export const UserContext=createContext<IUserContext | null>(null);
