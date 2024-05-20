export class ProductComponents{
    IdProductComponents: string;
    IdComponents: Array<string>;
    IdProduct: string;
    constructor(
        IdProductComponents: string,
        IdComponents: Array<string>,
        IdProduct: string,
    ){
        this.IdProductComponents = IdProductComponents;
        this.IdComponents = IdComponents;
        this.IdProduct = IdProduct;
    }
}