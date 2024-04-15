export class ComponentDetail{
    IdComponentDetail: string;
    IdParent: string;
    IdComponent: string;
    constructor(
        IdComponentDetail: string,
        IdParent: string,
        IdComponent: string,
    ){
        this.IdComponentDetail = IdComponentDetail;
        this.IdParent = IdParent;
        this.IdComponent = IdComponent;
    }
}