import { Product } from "../Models/Inventary/Product";
import IModel from "./IModel";
export default interface IProductModel extends IModel<Product> {
  UploadImages(Images: File[]): Promise<string[]>;

  ProductById(productId: string): Promise<Product>;
}
