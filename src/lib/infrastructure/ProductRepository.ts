import IProductModel from "../domain/Enum/IProductModel";
import { Product } from "../domain/Models/Inventary/Product";
import { collection, getDoc, getDocs,addDoc } from "firebase/firestore";
import { Timestamp } from "firebase/firestore";
import { db } from "../../../firebase";
export default class ProductRepository implements IProductModel {
  async Create(t: Product): Promise<string> {
   try{
    let dataWithoutExcludedKeys: Partial<Product> = { ...t };

    // Excluir cada clave proporcionada
    delete dataWithoutExcludedKeys["IdProduct"]
    delete dataWithoutExcludedKeys["Select"]
   
    const newDocumentRef = await addDoc(collection(db, "Product"),dataWithoutExcludedKeys);
    return newDocumentRef.id;
   }catch(error:any){
    throw error;
   }
  }
  async Update(t: Product): Promise<boolean> {
    throw new Error("Method not implemented.");
  }
  async Read(): Promise<Product[]> {
    let products: Product[] = [];
    (await getDocs(collection(db, "Product"))).docs.map((product) => {
      let values = product.data();
      products.push(
        new Product(
          product.id,
          values["ProductName"],
          (values["Date"] as Timestamp).toDate(),
          values["Quantity"],
          values["Group"],
          values["Price"],
          values["Collection"],
          false,

          values["Tags"],
          values["Cost"]
        )
      );
    });

    return products;
  }
  async Delete(t: Product): Promise<boolean> {
    throw new Error("Method not implemented.");
  }
  GroupsRef = collection(db, "Group");
}
