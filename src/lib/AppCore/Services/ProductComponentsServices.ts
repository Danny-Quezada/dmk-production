import IProductComponentsModel from "../../domain/Enum/IProductComponentsModel";
import { ProductComponents } from "../../domain/Models/Inventary/ProductComponents";

export default class ProductComponentsServices{
    iProductComponentsModel: IProductComponentsModel;

    constructor(
        iProductComponentsModel: IProductComponentsModel
    ){
        this.iProductComponentsModel = iProductComponentsModel;
    }

    async Create(t: ProductComponents): Promise<string>{
        const Id = await this.iProductComponentsModel.Create(t);
        return Id;
    }

    async Update(t: ProductComponents): Promise<boolean>{
        return await this.iProductComponentsModel.Update(t);
    }

    async Read(): Promise<ProductComponents[]>{
        return await this.iProductComponentsModel.Read();
    }

    async Delete(t: ProductComponents): Promise<boolean>{
        return await this.iProductComponentsModel.Delete(t);
    }
}