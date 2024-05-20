import ITreeComponentDetailModel from "../../domain/Enum/ITreeComponentDetailModel";
import { TreeComponentDetail } from "../../domain/Models/Inventary/TreeComponentDetail";

export default class TreeComponentDetailServices{
    iTreeComponentDetailModel: ITreeComponentDetailModel;
    
    constructor(
        iTreeComponentDetailModel: ITreeComponentDetailModel,
    ){
        this.iTreeComponentDetailModel = iTreeComponentDetailModel;
    }

    async Create(t: TreeComponentDetail):  Promise<string>{
        const Id =  await this.iTreeComponentDetailModel.Create(t);
        return Id;
    }

    async Update(t: TreeComponentDetail): Promise<boolean>{
        return await this.iTreeComponentDetailModel.Update(t);
    }

    async Read(): Promise<TreeComponentDetail[]>{
        return await this.iTreeComponentDetailModel.Read();
    }
    async Delete(t: TreeComponentDetail): Promise<boolean>{
        return await this.iTreeComponentDetailModel.Delete(t);
    }
}