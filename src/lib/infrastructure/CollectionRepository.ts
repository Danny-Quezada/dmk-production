import { db } from "../../../firebase";
import { collection, getDoc, getDocs } from "firebase/firestore";
import ICollectionModel from "../domain/Enum/ICollectionModel";
import Collection from "../domain/Models/Inventary/Collection";

export default class CollectionRepository implements ICollectionModel {
  Create(t: Collection): Promise<boolean> {
    throw new Error("Method not implemented.");
  }
  Update(t: Collection): Promise<boolean> {
    throw new Error("Method not implemented.");
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
