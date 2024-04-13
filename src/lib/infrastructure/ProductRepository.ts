import IProductModel from "../domain/Enum/IProductModel";
import { Product } from "../domain/Models/Product";
import { collection, getDoc, getDocs } from "firebase/firestore";
import { Timestamp } from "firebase/firestore";
import { db } from "../../../firebase";
export default class ProductRepository implements IProductModel {
  async Create(t: Product): Promise<boolean> {
    throw new Error("Method not implemented.");
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
          null,
          null,
          values["Tags"],
          
        )
      );
    });

    return products;
  }
  async Delete(t: Product): Promise<boolean> {
    throw new Error("Method not implemented.");
  }
  productsRef = collection(db, "Product");
}
