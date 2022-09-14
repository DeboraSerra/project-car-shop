export interface IModel<T> {
  read(): Promise<T[]>;
  readOne(id: string): Promise<T | null>;
  update(id: string, obj: T): Promise<T | null>;
  create(obj: T): Promise<T>;
  delete(id: string): Promise<T | null>;
}
