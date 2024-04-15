import IComponentDetailModel from "../../domain/Enum/IComponentDetailModel";
import { ComponentDetail } from "../../domain/Models/Inventary/ComponentDetail";

export default class ComponentDetailServices{
    iComponentDetailModel: IComponentDetailModel;

    constructor(
        iComponentDetailModel: IComponentDetailModel
    ){
        this.iComponentDetailModel = iComponentDetailModel;
    }

    
    async Create(t: ComponentDetail):  Promise<string>{
        const Id =  await this.iComponentDetailModel.Create(t);
        return Id;
    }

    async Update(t: ComponentDetail): Promise<boolean>{
        return await this.iComponentDetailModel.Update(t);
    }

    async Read(): Promise<ComponentDetail[]>{
        return await this.iComponentDetailModel.Read();
    }
    async Delete(t: ComponentDetail): Promise<boolean>{
        return await this.iComponentDetailModel.Delete(t);
    }
}