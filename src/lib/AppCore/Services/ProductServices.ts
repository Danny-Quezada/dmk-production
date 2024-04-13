import IProductModel from "../../domain/Enum/IProductModel";
import { Product } from "../../domain/Models/Product";

export default class ProductServices {
  iProductModel: IProductModel;
   Products:Product[]=[];
  

  constructor(Imodel: IProductModel) {
  
    this.iProductModel = Imodel;
  }

  async Create(t: Product): Promise<boolean> {
    return await this.iProductModel.Create(t);
    
  }
  async Update(t: Product): Promise<boolean> {
    return await this.iProductModel.Update(t);
  }
  async Read() {
    console.log("si");
   this.Products=await this.iProductModel.Read();
   
  }
  async Delete(t: Product): Promise<boolean> {
    return await this.iProductModel.Delete(t);
  }
}
