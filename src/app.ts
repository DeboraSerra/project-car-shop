import express from 'express';
import 'express-async-errors';
import errorHandler from './middlewares/error.middleware';
import cars from './routes/Car';

const app = express();
app.use(express.json());

app.use('/cars', cars);

app.use(errorHandler);

export default app;
