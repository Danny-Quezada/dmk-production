import { db } from "../../../firebase";
import { addDoc, collection, doc, getDoc, getDocs, updateDoc } from "firebase/firestore";
import ICollectionModel from "../domain/Enum/ICollectionModel";
import Collection from "../domain/Models/Inventary/Collection";

export default class CollectionRepository implements ICollectionModel {
 async Create(t: Collection): Promise<string> {
    try {
      let dataWithoutExcludedKeys: Partial<Collection> = { ...t };

      // Excluir cada clave proporcionada
      t
      delete dataWithoutExcludedKeys["CollectionId"];
      delete dataWithoutExcludedKeys["Select"];

      const newDocumentRef = await addDoc(
        collection(db, "Collection"),
        dataWithoutExcludedKeys
      );
      return newDocumentRef.id;
    } catch (error: any) {
      throw error;
    }
  }
  async Update(t: Collection): Promise<boolean> {
    const docRef = doc(db, "Collection", t.CollectionId);

    try {
      const CollectionData = {
        CollectionName: t.CollectionName,
     
      };

      await updateDoc(docRef, CollectionData);
      return true;
    } catch (error) {
      console.error("Error updating document: ", error);
      return false;
    }
  }
  async Read(): Promise<Collection[]> {
    let Collections: Collection[] = [];
    (await getDocs(collection(db, "Collection"))).docs.map((collection) => {
      let values = collection.data();
      Collections.push(new Collection(collection.id, values["CollectionName"]));
    });
    return Collections;
  }
  Delete(t: Collection): Promise<boolean> {
    throw new Error("Method not implemented.");
  }
  collectionsRef = collection(db, "Collection");
}
