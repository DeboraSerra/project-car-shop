import CodeError from '../errors/CodeError';
import { ICar, zCarSchema } from '../interfaces/ICar';
import { IModel } from '../interfaces/IModel';
import { IService } from '../interfaces/IService';

const notFound = 'Object not found';

class CarService implements IService<ICar> {
  protected _car: IModel<ICar>;
  constructor(model: IModel<ICar>) {
    this._car = model;
  }

  public async getAll(): Promise<ICar[]> {
    const cars = await this._car.read();
    return cars;
  }

  public async getOne(id: string): Promise<ICar> {
    const car = await this._car.readOne(id);
    if (!car) throw new CodeError(notFound, 404);
    return car as ICar;
  }

  public async create(obj: ICar): Promise<ICar> {
    const parsed = zCarSchema.safeParse(obj);
    if (!parsed.success) throw parsed.error;
    const car = await this._car.create(obj);
    return car;
  }

  public async update(id: string, obj: ICar): Promise<ICar> {
    const parsed = zCarSchema.safeParse(obj);
    if (!parsed.success) throw parsed.error;
    const car = await this._car.update(id, obj);
    if (!car) throw new CodeError(notFound, 404);
    return car as ICar;
  }

  public async delete(id: string): Promise<ICar | null> {
    const foundCar = await this._car.readOne(id);
    if (!foundCar) throw new CodeError(notFound, 404);
    const car = await this._car.delete(id);
    return car;
  }
}

export default CarService;
