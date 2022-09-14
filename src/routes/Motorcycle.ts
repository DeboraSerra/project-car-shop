import { Router } from 'express';
import MotorcycleController from '../controllers/Motorcycle';
import MotorcycleService from '../services/Motorcycle';
import MotorcycleModel from '../models/Motorcycle';

const router = Router();
const model = new MotorcycleModel();
const service = new MotorcycleService(model);
const controller = new MotorcycleController(service);

router.route('/')
  .get((req, res) => controller.getAll(req, res))
  .post((req, res) => controller.create(req, res));

router.route('/:id')
  .get((req, res) => controller.getOne(req, res))
  .put((req, res) => controller.update(req, res))
  .delete((req, res) => controller.delete(req, res));

export default router;
