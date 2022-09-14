import { Model as MongoModel, isValidObjectId, UpdateQuery } from 'mongoose';
import CodeError from '../errors/CodeError';
import { IModel } from '../interfaces/IModel';

const invalidId = 'Id must have 24 hexadecimal characters';
export default class Model<T> implements IModel<T> {
  protected _model: MongoModel<T>;
  constructor(model: MongoModel<T>) {
    this._model = model;
  }

  public async read(): Promise<T[]> {
    const cars = await this._model.find();
    return cars;
  }

  public async readOne(id: string): Promise<T | null> {
    if (!isValidObjectId(id)) throw new CodeError(invalidId, 400);
    return this._model.findOne({ _id: id });
  }

  public async create(obj: T): Promise<T> {
    return this._model.create(obj);
  }

  public async update(id: string, obj: Partial<T>): Promise<T | null> {
    if (!isValidObjectId(id)) throw new CodeError(invalidId, 400);
    const result = await this._model.findByIdAndUpdate(
      { _id: id },
      { ...obj } as UpdateQuery<T>,
      { new: true },
    );
    return result as T;
  }

  public async delete(id: string): Promise<T | null> {
    if (!isValidObjectId(id)) throw new CodeError(invalidId, 400);
    const result = await this._model.deleteOne({ _id: id });
    return result as unknown as T;
  }
}
