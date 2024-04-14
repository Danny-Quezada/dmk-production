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
  Products: Product[] = [];
  Collections: Collection[] = [];
  Groups: Group[]=[];

  constructor(IProductModel: IProductModel, ICollectionModel: ICollectionModel,IGroupModel: IGroupModel) {
    this.iProductModel = IProductModel;
    this.iCollectionModel = ICollectionModel;
    this.iGroupModel=IGroupModel;
  }

  async Create(t: Product): Promise<boolean> {
    return await this.iProductModel.Create(t);
  }
  async Update(t: Product): Promise<boolean> {
    return await this.iProductModel.Update(t);
  }
  async Read() {
    console.log("si");
    this.Products = await this.iProductModel.Read();
  }
  async Delete(t: Product): Promise<boolean> {
    return await this.iProductModel.Delete(t);
  }
  async ReadCollection() {
    this.Collections = await this.iCollectionModel.Read();
  }
  async ReadGroups(){
    this.Groups=await this.iGroupModel.Read();
  }
}
