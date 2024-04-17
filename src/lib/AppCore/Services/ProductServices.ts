import ICollectionModel from "../../domain/Enum/ICollectionModel";
import IGroupModel from "../../domain/Enum/IGroupModel";
import IProductModel from "../../domain/Enum/IProductModel";
import Collection from "../../domain/Models/Inventary/Collection";
import Group from "../../domain/Models/Inventary/Group";
import { Product } from "../../domain/Models/Inventary/Product";

export default class ProductServices {
  iCollectionModel: ICollectionModel;
  iProductModel: IProductModel;
  iGroupModel: IGroupModel;
 
  constructor(
    IProductModel: IProductModel,
    ICollectionModel: ICollectionModel,
    IGroupModel: IGroupModel
  ) {
    this.iProductModel = IProductModel;
    this.iCollectionModel = ICollectionModel;
    this.iGroupModel = IGroupModel;
  }

  async Create(t: Product): Promise<string> {
    const Id = await this.iProductModel.Create(t);
    
    return Id;
  }
  async Update(t: Product): Promise<boolean> {
    return await this.iProductModel.Update(t);
  }
  async Read(): Promise<Product[]> {
   
   return await this.iProductModel.Read();
  }
  async Delete(t: Product): Promise<boolean> {
    return await this.iProductModel.Delete(t);
  }
  async ReadCollection():  Promise<Collection[]>{
    return await this.iCollectionModel.Read();
  }
  async ReadGroups(): Promise<Group[]> {
    return await this.iGroupModel.Read();
  }
  async UploadImages(images: File[]): Promise<string[]>{
    return await this.iProductModel.UploadImages(images);
  }
  async ProductById(product: string): Promise<Product>{
    return await this.iProductModel.ProductById(product);
  }
}
