import { Schema, model as MongoModel } from 'mongoose';
import Model from './Model';
import { ICar } from '../interfaces/ICar';

const CarSchema = new Schema<ICar>({
  buyValue: Number,
  color: String,
  doorsQty: Number,
  model: String,
  seatsQty: Number,
  status: Boolean,
  year: Number,
});

class CarModel extends Model<ICar> {
  constructor(model = MongoModel<ICar>('Car', CarSchema)) {
    super(model);
  }
}

export default CarModel;
