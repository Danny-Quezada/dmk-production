export class TreeComponentDetail{
    IdTreeComponentDetail: string;
    IdComponent: string;
    IdTreeComponent: string;
    Quantity: number;
    constructor(
        IdTreeComponentDetail: string,
        IdComponent: string,
        IdTreeComponent: string,
        Quantity: number,
    ){
        this.IdTreeComponentDetail = IdTreeComponentDetail;
        this.IdComponent = IdComponent;
        this.IdTreeComponent = IdTreeComponent;
        this.Quantity = Quantity;
    }
}