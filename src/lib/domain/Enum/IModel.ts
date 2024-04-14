export default interface IModel<T> {
  Create(t: T):  Promise<string>;
  Update(t: T): Promise<boolean>;
  Read(): Promise<T[]>;
  Delete(t: T): Promise<boolean>;
}
