import IProductModel from "../domain/Enum/IProductModel";
import { Product } from "../domain/Models/Inventary/Product";
import {
  collection,
  getDocs,
  getDoc,
  addDoc,
  updateDoc,
  doc,
  deleteDoc,
} from "firebase/firestore";
import { ref, deleteObject } from "firebase/storage";
import { Timestamp } from "firebase/firestore";
import { db, storage } from "../../../firebase";
import { v4 as uuidv4 } from "uuid";
import {
  getDownloadURL,
  ref as storageRef,
  uploadBytes,
} from "firebase/storage";  
export default class ProductRepository implements IProductModel {
  async ProductById(productId: string): Promise<Product> {
    const ProductRef = doc(db, "Product", productId);
    
    try{
    const values= (await getDoc(ProductRef)).data;

    
    return new Product(
      productId,
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
  }
  catch(e){
    throw e;
  }
  }
  async UploadImages(Images: File[]): Promise<string[]> {
    const urls = await Promise.all(
      Images.map(async (image) => {
        const upload = await uploadBytes(
          storageRef(storage, `products/${uuidv4()}`),
          image
        );
        return getDownloadURL(upload.ref);
      })
    );

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
        Images: t.Images,
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
    console.log(t)
    const deleteImages = async () => {
      const promises = t.Images.map((imagePath) => {
        const imageRef = ref(storage, imagePath);
        return deleteObject(imageRef);
      });

      try {
        await Promise.all(promises);
       return true;
      } catch (error) {
        console.error("Error deleting images:", error);
        return false;
      }
    };

    const deleteProductDoc = async () => {
      const docRef = doc(db, "Product", t.IdProduct);
      try {
        await deleteDoc(docRef);
        return true;
      } catch (error) {
        console.error("Error deleting product document:", error);
      return false;
      }
    };

    try {
      let deletedImages: boolean=true;
      if(t.Images.length>0){
       deletedImages=await deleteImages();
      }
      const deleteProduct=await deleteProductDoc();

      if(!deletedImages || !deleteProduct){
        return false;
      }
      return true;
    } catch (error) {
      console.error("Error during deletion process:", error);
      return false;
    }
  }
  GroupsRef = collection(db, "Group");
}
