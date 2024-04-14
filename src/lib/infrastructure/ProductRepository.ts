import IProductModel from "../domain/Enum/IProductModel";
import { Product } from "../domain/Models/Inventary/Product";
import { collection, getDoc, getDocs, addDoc,updateDoc,doc } from "firebase/firestore";
import { Timestamp } from "firebase/firestore";
import { db, storage } from "../../../firebase";
import { v4 as uuidv4 } from "uuid";
import {
  getDownloadURL,
  ref as storageRef,
  uploadBytes,
} from "firebase/storage";
export default class ProductRepository implements IProductModel {
  async UploadImages(Images: File[]): Promise<string[]> {
    const urls = await Promise.all(Images.map(async (image) => {
      const upload = await uploadBytes(
        storageRef(storage, `products/${uuidv4()}`),
        image
      );
      return getDownloadURL(upload.ref);
    }));
   
    return urls;
  }
  async Create(t: Product): Promise<string> {
    try {
      let dataWithoutExcludedKeys: Partial<Product> = { ...t };

      // Excluir cada clave proporcionada
      delete dataWithoutExcludedKeys["IdProduct"];
      delete dataWithoutExcludedKeys["Select"];

      const newDocumentRef = await addDoc(
        collection(db, "Product"),
        dataWithoutExcludedKeys
      );
      return newDocumentRef.id;
    } catch (error: any) {
      throw error;
    }
  }
  async Update(t: Product): Promise<boolean> {
    const docRef = doc(db, "Product", t.IdProduct);
  
    try {
      const productData = {
        ProductName: t.ProductName,
        Date: t.Date,
        Quantity: t.Quantity,
        Group: t.Group,
        Price: t.Price,
        Collection: t.Collection,
        Tags: t.Tags,
        Cost: t.Cost,
        Images: t.Images
      };
    
      await updateDoc(docRef, productData);
    return true;
    } catch (error) {
      console.error("Error updating document: ", error);
      return false;
    }
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
          values["Cost"],
          values["Images"]
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
