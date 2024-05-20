import ITreeComponentDetailModel from "../domain/Enum/ITreeComponentDetailModel";
import { TreeComponentDetail } from "../domain/Models/Inventary/TreeComponentDetail";
import {
    collection,
    getDocs,
    addDoc,
    updateDoc,
    doc,
    deleteDoc,
} from "firebase/firestore";
import { db, storage } from "../../../firebase";

export default class TreeComponentDetailRepository implements ITreeComponentDetailModel{
    
    async Create(t: TreeComponentDetail): Promise<string> {
        try{
            let dataWithoutExcludedKeys: Partial<TreeComponentDetail> = { ...t };
            delete dataWithoutExcludedKeys["IdTreeComponentDetail"];

            const newDocumentRef = await addDoc(
                collection(db, "TreeComponentDetail"), dataWithoutExcludedKeys
            );
            return newDocumentRef.id;
        } catch(error: any){
            throw error;
        }
    }
    
    async Update(t: TreeComponentDetail): Promise<boolean> {
        const docRef = doc(db, "TreeComponentDetail", t.IdTreeComponentDetail);

        try{
            const treeComponentDetailData = {
                IdTreeComponentDetail: t.IdTreeComponentDetail,
                IdTreeComponent: t.IdTreeComponent,
                IdComponent: t.IdComponent,
                Quantity: t.Quantity,
                
            };
            await updateDoc(docRef, treeComponentDetailData);
            return true;
        } catch(error) {
            return false;
        }
    }

    async Read(): Promise<TreeComponentDetail[]> {
        let treeComponentsDetail: TreeComponentDetail[] = [];
        (await getDocs(collection(db, "TreeComponentDetail"))).docs.map((treeComponentDetail) => {
            let values = treeComponentDetail.data();
            treeComponentsDetail.push(
                new TreeComponentDetail(
                    treeComponentDetail.id,
                    values["IdComponent"],
                    values["IdTreeComponent"],
                    values["Quantity"],
                )
            );
        });

        return treeComponentsDetail;    
    }

    async Delete(t: TreeComponentDetail): Promise<boolean> {
        const docRef = doc(db, "TreeComponentDetail", t.IdTreeComponentDetail);
        try{
            await deleteDoc(docRef);
            return true;
        } catch(error){
            return false;
        }
    }

}