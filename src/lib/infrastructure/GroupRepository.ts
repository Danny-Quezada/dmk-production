import { db } from "../../../firebase";
import { collection, getDoc, getDocs } from "firebase/firestore";
import ICollectionModel from "../domain/Enum/ICollectionModel";

import Group from "../domain/Models/Inventary/Group";
import IGroupModel from "../domain/Enum/IGroupModel";

export default class GroupRepository implements IGroupModel {
  Create(t: Group): Promise<string> {
    throw new Error("Method not implemented.");
  }
  Update(t: Group): Promise<boolean> {
    throw new Error("Method not implemented.");
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
