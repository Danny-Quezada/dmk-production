import ITreeComponentModel from "../domain/Enum/ITreeComponentModel";
import { TreeComponent } from "../domain/Models/Inventary/TreeComponent";
import {
    collection,
    getDocs,
    addDoc,
    updateDoc,
    doc,
    deleteDoc,
} from "firebase/firestore";
import { db, storage } from "../../../firebase";

export default class TreeComponentRepository implements ITreeComponentModel{

    async Create(t: TreeComponent): Promise<string> {
        try{
            let dataWithoutExcludedKeys: Partial<TreeComponent> = { ...t };
            delete dataWithoutExcludedKeys["IdTreeComponent"];

            const newDocumentRef = await addDoc(
                collection(db, "TreeComponent"), dataWithoutExcludedKeys
            );
            return newDocumentRef.id;

        } catch(error: any){
            throw error;
        }
    }

    async Update(t: TreeComponent): Promise<boolean> {
        const docRef = doc(db, "TreeComponent", t.IdTreeComponent);

        try{
            const treeComponentData = {
                IdTreeComponent: t.IdTreeComponent,
                IdParent: t.IdParent,
                Quantity: t.Quantity,
                
            };
            await updateDoc(docRef, treeComponentData);
            return true;
        } catch(error) {
            return false;
        }
    }

    async Read(): Promise<TreeComponent[]> {
        let componentsDetail: TreeComponent[] = [];
        (await getDocs(collection(db, "TreeComponent"))).docs.map((treeComponent) => {
            let values = treeComponent.data();
            componentsDetail.push(
                new TreeComponent(
                    treeComponent.id,
                    values["IdParent"],
                    values["Quantity"],
                )
            );
        });

        return componentsDetail;    
    }

    async Delete(t: TreeComponent): Promise<boolean> {
        const docRef = doc(db, "TreeComponent", t.IdTreeComponent);
        try{
            await deleteDoc(docRef);
            return true;
        } catch(error){
            return false;
        }
    }

}