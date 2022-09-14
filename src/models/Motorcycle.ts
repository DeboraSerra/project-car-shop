import { Schema, model as MongoModel } from 'mongoose';
import Model from './Model';
import { IMotorcycle } from '../interfaces/IMotorcycle';

const MotorcycleSchema = new Schema<IMotorcycle>({
  buyValue: Number,
  color: String,
  model: String,
  status: Boolean,
  year: Number,
  category: String,
  engineCapacity: Number,
}, { versionKey: false });

class MotorcycleModel extends Model<IMotorcycle> {
  constructor(model = MongoModel<IMotorcycle>('Motorcycle', MotorcycleSchema)) {
    super(model);
  }
}

export default MotorcycleModel;
