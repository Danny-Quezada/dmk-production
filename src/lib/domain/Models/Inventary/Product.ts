export class Product {
  IdProduct: string;
  ProductName: string;
  Date: Date;
  Quantity: number;
  Group: string;
  Price: number;
  Collection: string;
  Select: boolean;
  Tags: string[];
  Cost: number;
  Images: string[];
  constructor(
    IdProduct: string,
    ProductName: string,
    date: Date,
    Quantity: number,
    Group: string,
    Price: number,
    Collection: string,
    Select: boolean,
    Tags: string[],
    Cost: number,
    Images: string[]
  ) {
    this.IdProduct = IdProduct;
    this.ProductName = ProductName;
    this.Date = date;
    this.Quantity = Quantity;
    this.Group = Group;
    this.Price = Price;
    this.Collection = Collection;
    this.Select=Select;

    this.Cost=Cost;
    this.Tags=Tags;
    this.Images=Images
  }
}
