import express from 'express';
import 'express-async-errors';
import errorHandler from './middlewares/error.middleware';
import cars from './routes/Car';
import motorcycles from './routes/Motorcycle';

const app = express();
app.use(express.json());

app.use('/cars', cars);
app.use('/motorcycles', motorcycles);

app.use(errorHandler);

export default app;
