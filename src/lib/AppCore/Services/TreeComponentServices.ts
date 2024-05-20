import ITreeComponentModel from "../../domain/Enum/ITreeComponentModel";
import { TreeComponent } from "../../domain/Models/Inventary/TreeComponent";

export default class TreeComponentServices{
    iTreeComponentModel: ITreeComponentModel;

    constructor(
        iTreeComponentModel: ITreeComponentModel
    ){
        this.iTreeComponentModel = iTreeComponentModel;
    }

    
    async Create(t: TreeComponent):  Promise<string>{
        const Id =  await this.iTreeComponentModel.Create(t);
        return Id;
    }

    async Update(t: TreeComponent): Promise<boolean>{
        return await this.iTreeComponentModel.Update(t);
    }

    async Read(): Promise<TreeComponent[]>{
        return await this.iTreeComponentModel.Read();
    }
    async Delete(t: TreeComponent): Promise<boolean>{
        return await this.iTreeComponentModel.Delete(t);
    }
}