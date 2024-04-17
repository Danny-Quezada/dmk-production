export class ComponentDetail{
    IdComponentDetail: string;
    IdParent: string;
    IdComponent: string;
    Quantity: number;
    constructor(
        IdComponentDetail: string,
        IdParent: string,
        IdComponent: string,
        Quantity: number
    ){
        this.IdComponentDetail = IdComponentDetail;
        this.IdParent = IdParent;
        this.IdComponent = IdComponent;
        this.Quantity=Quantity;
    }
}