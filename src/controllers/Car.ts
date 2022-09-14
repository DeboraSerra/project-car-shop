import { Request, Response } from 'express';
import { ICar } from '../interfaces/ICar';
import { IService } from '../interfaces/IService';

class CarController {
  private _car: IService<ICar>;
  constructor(service: IService<ICar>) {
    this._car = service;
  }

  public async getAll(_req: Request, res: Response): Promise<void> {
    const cars = await this._car.getAll();
    res.status(200).json(cars);
  }

  public async getOne(req: Request, res: Response): Promise<void> {
    const { id } = req.params;
    const car = await this._car.getOne(id);
    res.status(200).json(car);
  }

  public async create(req: Request & { body: ICar }, res: Response<ICar>): Promise<void> {
    const car = await this._car.create(req.body);
    res.status(201).json(car);
  }

  public async update(req: Request, res: Response): Promise<void> {
    const { id } = req.params;
    const car = await this._car.update(id, req.body);
    res.status(200).json(car);
  }

  public async delete(req: Request, res: Response): Promise<void> {
    const { id } = req.params;
    const car = await this._car.delete(id);
    res.status(204).json(car);
  }
}

export default CarController;
