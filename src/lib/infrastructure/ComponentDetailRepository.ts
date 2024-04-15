import IComponentDetailModel from "../domain/Enum/IComponentDetailModel";
import { ComponentDetail } from "../domain/Models/Inventary/ComponentDetail";
import {
    collection,
    getDocs,
    addDoc,
    updateDoc,
    doc,
    deleteDoc,
} from "firebase/firestore";
import { db, storage } from "../../../firebase";

export default class ComponentDetailRepository implements IComponentDetailModel{

    async Create(t: ComponentDetail): Promise<string> {
        try{
            let dataWithoutExcludedKeys: Partial<ComponentDetail> = { ...t };
            delete dataWithoutExcludedKeys["IdComponentDetail"];

            const newDocumentRef = await addDoc(
                collection(db, "ComponentDetail"), dataWithoutExcludedKeys
            );
            return newDocumentRef.id;

        } catch(error: any){
            throw error;
        }
    }

    async Update(t: ComponentDetail): Promise<boolean> {
        const docRef = doc(db, "ComponentDetail", t.IdComponentDetail);

        try{
            const componentDetailData = {
                IdComponent: t.IdComponent,
                IdParent: t.IdParent,
            };
            await updateDoc(docRef, componentDetailData);
            return true;
        } catch(error) {
            return false;
        }
    }

    async Read(): Promise<ComponentDetail[]> {
        let componentsDetail: ComponentDetail[] = [];
        (await getDocs(collection(db, "ComponentDetail"))).docs.map((componentDetail) => {
            let values = componentDetail.data();
            componentsDetail.push(
                new ComponentDetail(
                    componentDetail.id,
                    values["IdComponent"],
                    values["IdParent"],
                )
            );
        });

        return componentsDetail;    
    }

    async Delete(t: ComponentDetail): Promise<boolean> {
        const docRef = doc(db, "ComponentDetail", t.IdComponentDetail);
        try{
            await deleteDoc(docRef);
            return true;
        } catch(error){
            return false;
        }
    }

}