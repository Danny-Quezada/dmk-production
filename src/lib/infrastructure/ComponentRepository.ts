import IComponentModel from "../domain/Enum/IComponentModel";
import {Component} from '../domain/Models/Inventary/Component'
import {
    collection,
    getDocs,
    addDoc,
    updateDoc,
    doc,
    deleteDoc,
} from "firebase/firestore";
import { db, storage } from "../../../firebase";

export default class ComponentRepository implements IComponentModel{

    async Create(t: Component): Promise<string> {
        try{
            let dataWithoutExcludedKeys: Partial<Component> = { ...t };
            delete dataWithoutExcludedKeys["IdComponent"];

            const newDocumentRef = await addDoc(
                collection(db, "Component"), dataWithoutExcludedKeys
            );
            return newDocumentRef.id;

        } catch (error: any){
            throw error;
        }
    }

    async Update(t: Component): Promise<boolean> {
        const docRef = doc(db, "Component", t.IdComponent);

        try{
            const componentData = {
                Name: t.Name,
                Quantity: t.Quantity,
            };

            await updateDoc(docRef, componentData);
            return true;
        } catch (error){
            
            console.error("Error updating document: ", error);
            return false;
        }
    }

    async Read(): Promise<Component[]> {
        let components: Component[] = [];
        (await getDocs(collection(db, "Component"))).docs.map((component) => {
            let values = component.data();
            components.push(
                new Component(
                    component.id,
                    values["Name"],
                    values["Quantity"],
                )
            );
        });
        console.log(components);
        return components;
    }

    async Delete(t: Component): Promise<boolean> {
        const docRef = doc(db, "Component", t.IdComponent);
        try{
            await deleteDoc(docRef); 
            return true;
        } catch (error){
            return false;
        }
    }

}
