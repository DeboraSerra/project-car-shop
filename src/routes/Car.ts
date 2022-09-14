import { Router } from 'express';
import CarController from '../controllers/Car';
import CarService from '../services/Car';
import CarModel from '../models/Cars';

const router = Router();
const model = new CarModel();
const service = new CarService(model);
const controller = new CarController(service);

router.route('/')
  .get((req, res) => controller.getAll(req, res))
  .post((req, res) => controller.create(req, res));

router.route('/:id')
  .get((req, res) => controller.getOne(req, res))
  .put((req, res) => controller.update(req, res))
  .delete((req, res) => controller.delete(req, res));

export default router;
