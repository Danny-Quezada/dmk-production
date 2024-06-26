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
  async CreateCollection(t: Collection): Promise<string>{
    return await this.iCollectionModel.Create(t);
  }
  async UpdateCollection(t: Collection) : Promise<boolean>{
    return await this.iCollectionModel.Update(t);
  }
    async ReadGroups(): Promise<Group[]> {
    return await this.iGroupModel.Read();
  }
  async CreateGroup(t: Group): Promise<string>{
    return await this.iGroupModel.Create(t);
  }
  async UpdateGroup(t: Group) : Promise<boolean>{
    return await this.iGroupModel.Update(t);
  }
  async UploadImages(images: File[]): Promise<string[]>{
    return await this.iProductModel.UploadImages(images);
  }
  async ProductById(product: string): Promise<Product>{
    return await this.iProductModel.ProductById(product);
  }
}
