export class Component{
    IdComponent: string;
    Name: string;
    Quantity: number;
    constructor(
        IdComponent: string,
        Name: string, 
        Quantity: number,
    ){
        this.IdComponent = IdComponent;
        this.Name = Name;
        this.Quantity = Quantity;
    }
}