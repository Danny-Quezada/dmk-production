import IComponentModel from '../../domain/Enum/IComponentModel';
import {Component} from '../../domain/Models/Inventary/Component';

export default class ComponentServices {
    iComponentModel: IComponentModel;

    constructor( 
        IComponentModel: IComponentModel
    ) { 
        this.iComponentModel = IComponentModel;
    }

    async Create(t: Component):  Promise<string>{
        const Id =  await this.iComponentModel.Create(t);
        return Id;
    }

    async Update(t: Component): Promise<boolean>{
        return await this.iComponentModel.Update(t);
    }

    async Read(): Promise<Component[]>{
        return await this.iComponentModel.Read();
    }
    async Delete(t: Component): Promise<boolean>{
        return await this.iComponentModel.Delete(t);
    }
}
