import CodeError from '../errors/CodeError';
import { IMotorcycle, zMotorcycleSchema } from '../interfaces/IMotorcycle';
import { IModel } from '../interfaces/IModel';
import { IService } from '../interfaces/IService';

const notFound = 'Object not found';

class MotorcycleService implements IService<IMotorcycle> {
  protected _motorcycle: IModel<IMotorcycle>;
  constructor(model: IModel<IMotorcycle>) {
    this._motorcycle = model;
  }

  public async getAll(): Promise<IMotorcycle[]> {
    const motorcycles = await this._motorcycle.read();
    return motorcycles;
  }

  public async getOne(id: string): Promise<IMotorcycle> {
    const motorcycle = await this._motorcycle.readOne(id);
    if (!motorcycle) throw new CodeError(notFound, 404);
    return motorcycle as IMotorcycle;
  }

  public async create(obj: IMotorcycle): Promise<IMotorcycle> {
    const parsed = zMotorcycleSchema.safeParse(obj);
    if (!parsed.success) throw parsed.error;
    const motorcycle = await this._motorcycle.create(obj);
    return motorcycle;
  }

  public async update(id: string, obj: IMotorcycle): Promise<IMotorcycle> {
    const parsed = zMotorcycleSchema.safeParse(obj);
    if (!parsed.success) throw parsed.error;
    const motorcycle = await this._motorcycle.update(id, obj);
    if (!motorcycle) throw new CodeError(notFound, 404);
    return motorcycle as IMotorcycle;
  }

  public async delete(id: string): Promise<IMotorcycle | null> {
    const found = await this._motorcycle.readOne(id);
    if (!found) throw new CodeError(notFound, 404);
    const motorcycle = await this._motorcycle.delete(id);
    return motorcycle;
  }
}

export default MotorcycleService;
