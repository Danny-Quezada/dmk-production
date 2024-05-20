export class TreeComponent{
    IdTreeComponent: string;
    IdParent: string;
    Quantity: number;
    constructor(
        IdTreeComponent: string,
        IdParent: string,
        Quantity: number,
    ){
        this.IdTreeComponent = IdTreeComponent;
        this.IdParent = IdParent;
        this.Quantity = Quantity;
    }
}