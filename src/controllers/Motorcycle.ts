import { Request, Response } from 'express';
import { IMotorcycle } from '../interfaces/IMotorcycle';
import { IService } from '../interfaces/IService';

class MotorcycleController {
  private _motorcycle: IService<IMotorcycle>;
  constructor(service: IService<IMotorcycle>) {
    this._motorcycle = service;
  }

  public async getAll(_req: Request, res: Response): Promise<void> {
    const motorcycles = await this._motorcycle.getAll();
    res.status(200).json(motorcycles);
  }

  public async getOne(req: Request, res: Response): Promise<void> {
    const { id } = req.params;
    const motorcycle = await this._motorcycle.getOne(id);
    res.status(200).json(motorcycle);
  }

  public async create(
    req: Request & { body: IMotorcycle },
    res: Response<IMotorcycle>,
  ): Promise<void> {
    const motorcycle = await this._motorcycle.create(req.body);
    res.status(201).json(motorcycle);
  }

  public async update(req: Request, res: Response): Promise<void> {
    const { id } = req.params;
    const motorcycle = await this._motorcycle.update(id, req.body);
    res.status(200).json(motorcycle);
  }

  public async delete(req: Request, res: Response): Promise<void> {
    const { id } = req.params;
    const motorcycle = await this._motorcycle.delete(id);
    res.status(204).json(motorcycle);
  }
}

export default MotorcycleController;
