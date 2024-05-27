export default class Collection{
CollectionId: string;
CollectionName: string;

Select: boolean=false;
constructor(CollectionId:string, CollectionName: string){
    this.CollectionId=CollectionId;
    this.CollectionName=CollectionName;
}
}