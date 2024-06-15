import IProductComponents from "../domain/Enum/IProductComponentsModel";
import {
    collection,
    getDocs,
    addDoc,
    updateDoc,
    doc,
    deleteDoc,
} from "firebase/firestore";
import { db, storage } from "../../../firebase";
import { ProductComponents } from "../domain/Models/Inventary/ProductComponents";

export default class ProductComponentsRepository implements IProductComponents{
    async Create(t: ProductComponents): Promise<string> {
        try{
            console.log(ProductComponents);
            let dataWithoutExcludedKeys: Partial<ProductComponents> = { ...t };
            delete dataWithoutExcludedKeys["IdProductComponents"];

            const newDocumentRef = await addDoc(
                collection(db, "ProductComponent"), dataWithoutExcludedKeys
            );

            return newDocumentRef.id;
        } catch(error: any){
            throw error;
        }
    }

    async Update(t: ProductComponents): Promise<boolean> {
        const docRef = doc(db, "ProductComponent", t.IdProductComponents);

        try{
            const ProductComponentsData = {
                IdComponents: t.IdComponents
            };
            await updateDoc(docRef, ProductComponentsData);
            return true;
        } catch(error) {
            return false;
        }
    }

    async Read(): Promise<ProductComponents[]> {
        let productsComponents: ProductComponents[] = [];
        (await getDocs(collection(db, "ProductComponent"))).docs.map((productComponents) => {
            let values = productComponents.data();
                productsComponents.push(
                    new ProductComponents(
                        productComponents.id,
                        values["IdComponents"],
                        values["IdProduct"],
                    )
                );
        });
        return productsComponents;
    }

    async Delete(t: ProductComponents): Promise<boolean> {
        const docRef = doc(db, "ProductComponent", t.IdProductComponents);
        try{
            await deleteDoc(docRef);
            return true;
        }catch(error) {
            return false;
        }
    }

}