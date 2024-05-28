import { db } from "../../../firebase";
import { addDoc, collection, doc, getDoc, getDocs, updateDoc } from "firebase/firestore";
import ICollectionModel from "../domain/Enum/ICollectionModel";

import Group from "../domain/Models/Inventary/Group";
import IGroupModel from "../domain/Enum/IGroupModel";

export default class GroupRepository implements IGroupModel {
  async Create(t: Group): Promise<string> {
    try {
      let dataWithoutExcludedKeys: Partial<Group> = { ...t };

      // Excluir cada clave proporcionada
      t
      delete dataWithoutExcludedKeys["GroupId"];
      delete dataWithoutExcludedKeys["Select"];

      const newDocumentRef = await addDoc(
        collection(db, "Group"),
        dataWithoutExcludedKeys
      );
      return newDocumentRef.id;
    } catch (error: any) {
      throw error;
    }
  }
 async Update(t: Group): Promise<boolean> {
    const docRef = doc(db, "Collection", t.GroupId);

    try {
      const GroupData = {
        GroupName: t.GroupName,
     
      };

      await updateDoc(docRef, GroupData);
      return true;
    } catch (error) {
      console.error("Error updating document: ", error);
      return false;
    }
  }
  
  async Read(): Promise<Group[]> {
    let Groups: Group[] = [];
    (await getDocs(collection(db, "Group"))).docs.map((group) => {
      let values = group.data();
      Groups.push(new Group(group.id, values["GroupName"]));
    });
    return Groups;
  }
  Delete(t: Group): Promise<boolean> {
    throw new Error("Method not implemented.");
  }
  productsRef = collection(db, "Collection");
}
